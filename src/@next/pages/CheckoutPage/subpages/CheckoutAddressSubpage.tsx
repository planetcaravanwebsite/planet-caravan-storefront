import React, {
  forwardRef,
  RefForwardingComponent,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router";

import { CheckoutAddress } from "@components/organisms";
import { useAuth, useCheckout, useCart } from "@saleor/sdk";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { commonMessages } from "@temp/intl";
import { IAddress, IFormError } from "@types";
import { filterNotEmptyArrayItems } from "@utils/misc";

export interface ICheckoutAddressSubpageHandles {
  submitAddress: () => void;
}

interface IProps extends RouteComponentProps<any> {
  changeSubmitProgress: (submitInProgress: boolean) => void;
  onSubmitSuccess: () => void;
}

const CheckoutAddressSubpageWithRef: RefForwardingComponent<
  ICheckoutAddressSubpageHandles,
  IProps
> = ({ changeSubmitProgress, onSubmitSuccess, ...props }: IProps, ref) => {
  const checkoutShippingAddressFormId = "shipping-address-form";
  const checkoutShippingAddressFormRef = useRef<HTMLFormElement>(null);
  const checkoutBillingAddressFormId = "billing-address-form";
  const checkoutBillingAddressFormRef = useRef<HTMLFormElement>(null);
  const checkoutNewAddressFormId = "new-address-form";

  const { user } = useAuth();
  const {
    checkout,
    selectedShippingAddressId,
    selectedBillingAddressId,
    billingAsShipping,
    setShippingAddress,
    setBillingAddress,
    setBillingAsShippingAddress,
  } = useCheckout();
  const { items } = useCart();
  const { countries } = useContext(ShopContext);

  // Add "United States" option on top.
  const indexOfUSA = countries.indexOf(
    countries.filter(option => option.code === "US")[0]
  );
  const USA = countries[indexOfUSA];
  countries.splice(indexOfUSA, 1);
  countries.unshift(USA);

  const [shippingErrors, setShippingErrors] = useState<IFormError[]>([]);
  const [billingErrors, setBillingErrors] = useState<IFormError[]>([]);
  const [errors, setErrors] = useState<IFormError[]>([]);

  const intl = useIntl();

  const isShippingRequiredForProducts =
    items &&
    items.some(
      ({ variant }) => variant.product?.productType.isShippingRequired
    );
  const checkoutShippingAddress = checkout?.shippingAddress
    ? {
        ...checkout?.shippingAddress,
        email: checkout?.email || user?.email,
      }
    : undefined;
  const checkoutBillingAddress = checkout?.billingAddress
    ? {
        ...checkout?.billingAddress,
        email: checkout?.email || user?.email,
      }
    : undefined;

  useImperativeHandle(ref, () => ({
    submitAddress: () => {
      if (isShippingRequiredForProducts) {
        checkoutShippingAddressFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
        if (!billingAsShippingState) {
          checkoutBillingAddressFormRef.current?.dispatchEvent(
            new Event("submit", { cancelable: true })
          );
        }
      } else {
        checkoutBillingAddressFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      }
    },
  }));

  const [billingAsShippingState, setBillingAsShippingState] = useState(
    billingAsShipping
  );
  useEffect(() => {
    setBillingAsShippingState(billingAsShipping);
  }, [billingAsShipping]);

  const handleSetShippingAddress = async (
    address?: IAddress,
    email?: string,
    userAddressId?: string
  ) => {
    // fix: all postal codes with letters need to have them uppercase
    if (address?.country?.code) {
      address.postalCode = address.postalCode?.toUpperCase();
    }

    // fix: If no zip code, then we don't want whitespace either, just a blank field
    if (address?.countryArea) {
      if (!address?.countryArea.trim()) {
        address.countryArea = "";
      }
    }

    if (!address && !billingAsShippingState) {
      setShippingErrors([
        {
          message: intl.formatMessage({
            defaultMessage: "Please provide shipping address.",
          }),
        },
      ]);
      return;
    }
    const patternPOBox = new RegExp(/[Pp]\.?\s?[Oo]\.?\s*[Bb][Oo][Xx]/);
    // @ts-ignore
    if (address.streetAddress1 && address.streetAddress1.match(patternPOBox)) {
      setShippingErrors([
        {
          field: "streetAddress1",
          message:
            "We do not ship to PO Boxes. If you put a PO Box in and we cannot contact you to resolve within 24 hrs we will cancel your order.",
        },
      ]);
      return;
    }
    // @ts-ignore
    if (address.streetAddress2 && address.streetAddress2.match(patternPOBox)) {
      setShippingErrors([
        {
          field: "streetAddress2",
          message:
            "We do not ship to PO Boxes. If you put a PO Box in and we cannot contact you to resolve within 24 hrs we will cancel your order.",
        },
      ]);
      return;
    }

    // fix: no trailing and leading whitespaces in email
    if (email) {
      email = email.trim();
    }
    if (user?.email) {
      user.email = user.email.trim();
    }

    const shippingEmail = user?.email || email || "";

    if (!shippingEmail) {
      setShippingErrors([
        {
          field: "email",
          message: intl.formatMessage(commonMessages.provideEmailAddress),
        },
      ]);
      return;
    }

    changeSubmitProgress(true);
    const { dataError } = await setShippingAddress(
      {
        ...address,
        id: userAddressId,
      },
      shippingEmail
    );
    const errors = dataError?.error;
    if (errors) {
      setShippingErrors(errors);

      if (errors[0].code === "INSUFFICIENT_STOCK") {
        setErrors(errors);
      }

      changeSubmitProgress(false);
    } else {
      setShippingErrors([]);
      changeSubmitProgress(false);
      if (billingAsShippingState) {
        handleSetBillingAddress();
      } else {
        checkoutBillingAddressFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      }
    }
  };

  const handleSetBillingAddress = async (
    address?: IAddress,
    email?: string,
    userAddressId?: string
  ) => {
    if (!address && !billingAsShippingState) {
      changeSubmitProgress(false);
      setBillingErrors([
        {
          message: intl.formatMessage({
            defaultMessage: "Please provide billing address.",
          }),
        },
      ]);
      return;
    }

    const billingEmail = user?.email || email;

    if (
      !billingEmail &&
      !billingAsShippingState &&
      !isShippingRequiredForProducts
    ) {
      setBillingErrors([
        {
          field: "email",
          message: intl.formatMessage(commonMessages.provideEmailAddress),
        },
      ]);
      return;
    }

    let errors;
    changeSubmitProgress(true);
    if (billingAsShippingState && isShippingRequiredForProducts) {
      const { dataError } = await setBillingAsShippingAddress();
      errors = dataError?.error;
    } else {
      const { dataError } = await setBillingAddress(
        {
          ...address,
          id: userAddressId,
        },
        billingEmail
      );
      errors = dataError?.error;
    }
    changeSubmitProgress(false);
    if (errors) {
      setBillingErrors(errors);
      setErrors(errors);
    } else {
      setBillingErrors([]);
      onSubmitSuccess();
    }
  };

  const userAdresses = user?.addresses
    ?.filter(filterNotEmptyArrayItems)
    .map(address => ({
      address: {
        ...address,
        isDefaultBillingAddress: address.isDefaultBillingAddress || false,
        isDefaultShippingAddress: address.isDefaultShippingAddress || false,
        phone: address.phone || undefined,
      },
      id: address?.id || "",
      onSelect: () => null,
    }));

  return (
    <CheckoutAddress
      {...props}
      shippingErrors={shippingErrors}
      billingErrors={billingErrors}
      shippingFormId={checkoutShippingAddressFormId}
      shippingFormRef={checkoutShippingAddressFormRef}
      billingFormId={checkoutBillingAddressFormId}
      billingFormRef={checkoutBillingAddressFormRef}
      checkoutShippingAddress={checkoutShippingAddress}
      checkoutBillingAddress={checkoutBillingAddress}
      billingAsShippingAddress={billingAsShippingState}
      email={checkout?.email}
      userAddresses={userAdresses}
      selectedUserShippingAddressId={selectedShippingAddressId}
      selectedUserBillingAddressId={selectedBillingAddressId}
      countries={countries}
      userId={user?.id}
      newAddressFormId={checkoutNewAddressFormId}
      shippingAddressRequired={!!isShippingRequiredForProducts}
      setShippingAddress={handleSetShippingAddress}
      setBillingAddress={handleSetBillingAddress}
      setBillingAsShippingAddress={setBillingAsShippingState}
      errors={errors}
    />
  );
};

const CheckoutAddressSubpage = forwardRef(CheckoutAddressSubpageWithRef);

export { CheckoutAddressSubpage };
