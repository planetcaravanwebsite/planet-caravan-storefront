import React, { useState } from "react";

import { ErrorMessage } from "@components/atoms";
import { CreditCardForm } from "@components/organisms";
import { IFormError } from "@types";

import * as S from "./styles";
import { IProps } from "./types";
import Accept from "./accept-js";
import AcceptComponent from "./AcceptComponent";

const INITIAL_CARD_ERROR_STATE = {
  fieldErrors: {
    cvv: null,
    expirationMonth: null,
    expirationYear: null,
    number: null,
  },
  nonFieldError: "",
};

interface ICardInputs {
  ccCsc: string;
  ccExp: string;
  ccNumber: string;
}

type CardError = { field?: string; message: string } | null;

interface ICardErrors {
  cvv: CardError;
  expirationMonth: CardError;
  expirationYear: CardError;
  number: CardError;
}

interface ErrorData {
  fieldErrors: ICardErrors;
  nonFieldError?: string;
}

/**
 * Dummy payment gateway.
 */
const AuthorizePaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
  formRef,
  formId,
  errors = [],
  postalCode,
  onError,
}: IProps) => {
  const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);

  const key = config.find(({ field }) => field === "client_key");
  const login = config.find(({ field }) => field === "api_login_id");

  const apiLoginId = login?.value;
  const clientKey = key?.value;

  const [cardErrors] = React.useState<ErrorData>(INITIAL_CARD_ERROR_STATE);
  const handleSubmit = async (formData: ICardInputs) => {
    const authData = {
      apiLoginID: apiLoginId,
      clientKey,
    };

    const [month, year] = formData.ccExp.split("/").map(v => v.trim());

    const cardData = {
      cardCode: formData.ccCsc,
      cardNumber: formData.ccNumber.replace(/ /g, ""),
      month,
      year,
    };

    const secureData = { authData, cardData };

    const promiseTimeout = function (time: number) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(time);
        }, time);
      });
    };

    return Accept.dispatchData(secureData)
      .then(response => {
        promiseTimeout(2750).then(function () {
          processPayment(response.opaqueData?.dataValue, {
            brand: "",
            firstDigits: null,
            lastDigits: "",
            expMonth: null,
            expYear: null,
          });

          return response;
        });
      })
      .catch(response => {
        console.info("auth.net response: ", response);

        // override most hard to understand authorize.net errors with a catch-all error
        const errorsCatchAll = [
          "I00009",
          "I00010",
          "I00011",
          "I99999",
          "E00002",
          "E00003",
          "E00003",
          "E00004",
          "E00005",
          "E00006",
          "E00007",
          "E00008",
          "E00010",
          "E00011",
          "E00013",
          "E00014",
          "E00015",
          "E00016",
          "E00044",
          "E00045",
          "E00046",
          "E00047",
          "E00048",
          "E00049",
          "E00050",
          "E00051",
          "E00052",
          "E00054",
          "E00055",
          "E00056",
          "E00057",
          "E00058",
          "E00059",
          "E00060",
          "E00061",
          "E00062",
          "E00063",
          "E00064",
          "E00065",
          "E00066",
          "E00067",
          "E00068",
          "E00071",
          "E00072",
          "E00073",
          "E00074",
          "E00075",
          "E00078",
          "E00079",
          "E00080",
          "E00081",
          "E00086",
          "E00088",
          "E00089",
          "E00090",
          "E00091",
          "E00092",
          "E00093",
          "E00094",
          "E00095",
          "E00096",
          "E00097",
          "E00108",
          "E00109",
          "E00110",
          "E00111",
          "E00119",
          "E00120",
          "E00122",
          "E00125",
          "E00126",
          "E00128",
          "E00132",
          "E00135",
          "E00136",
          "E00138",
          "E00139",
          "E00140",
          "E00141",
          "E00142",
          "E00143",
          "0",
          "12",
          "15",
          "13",
          "14",
          "32",
          "33",
          "40",
          "43",
          "67",
          "68",
          "69",
          "70",
          "82",
          "83",
          "84",
          "85",
          "86",
          "87",
          "88",
          "89",
          "91",
          "92",
          "116",
          "117",
          "123",
          "130",
          "156",
          "174",
          "182",
          "183",
          "184",
          "186",
          "187",
          "195",
          "229",
          "270",
          "271",
          "280",
          "281",
          "282",
          "283",
          "284",
          "285",
          "286",
          "287",
          "290",
          "296",
          "297",
          "300",
          "301",
          "302",
          "303",
          "304",
          "305",
          "306",
          "308",
          "309",
          "320",
          "325",
          "326",
          "328",
          "331",
          "332",
          "334",
          "339",
          "341",
          "342",
          "343",
          "344",
          "351",
          "355",
          "356",
          "357",
          "358",
          "359",
          "360",
          "361",
          "362",
          "363",
          "370",
          "371",
          "375",
          "380",
          "2004",
          "2005",
          "2006",
        ];

        let errors = [
          {
            message: response.messages.message[0].text || "",
          },
        ];

        if (errorsCatchAll.includes(response.messages.message[0].code)) {
          errors = [
            {
              message:
                "There has been an error with your intended action.  Please refresh the page and try again.  If the problem persists please message us on Instagram @planetcaravansmokeshop or send an email to planetcaravanwebsite@gmail.com",
            },
          ];
        }

        // rest of the error overrides
        // eslint-disable-next-line default-case
        switch (response.messages.message[0].code) {
          case "E00020":
          case "E00021":
            errors[0].message =
              "The payment gateway is not set up to accept this form of payment.  Please try another payment method.";
            break;
          case "E00039":
            errors[0].message =
              "A duplicate of the customer profile, customer payment profile, or customer address has already been submitted.";
            break;
          case "E00040":
            errors[0].message =
              "There has been an error with your intended action.  Please refresh the page and try again.  If the problem persists please message us on Instagram @planetcaravansmokeshop or send an email to planetcaravanwebsite@gmail.com";
            break;
          case "E00041":
            errors[0].message =
              "Please fill out all required fields to continue the transaction. If the problem persists please message us on Instagram @planetcaravansmokeshop or send an email to planetcaravanwebsite@gmail.com";
            break;
          case "E00042":
            errors[0].message =
              "The maximum number of payment profiles for the customer profile has been reached.";
            break;
          case "E00043":
            errors[0].message =
              "The maximum number of shipping addresses for the customer profile has been reached.";
            break;
          case "E00053":
            errors[0].message =
              "The server is currently too busy. Please try again later or message us on Instagram @planetcaravansmokeshop or send an email to planetcaravanwebsite@gmail.com";
            break;
          case "E00069":
          case "E00070":
            errors[0].message =
              "There has been an error with your intended action.  Please refresh the page and try again.  If the problem persists please message us on Instagram @planetcaravansmokeshop or send an email to planetcaravanwebsite@gmail.com";
            break;
          case "E00077":
            errors[0].message = "The value entered is too long.";
            break;
          case "E00082":
            errors[0].message =
              "The information you entered is not valid. Please try again.  If the If the problem persists please message us on Instagram @planetcaravansmokeshop or send an email to planetcaravanwebsite@gmail.com";
            break;
          case "E00098":
            errors[0].message =
              "Customer Profile ID or Shipping Profile ID not found.";
            break;
          case "E00099":
          case "E00100":
          case "E00103":
            errors[0].message =
              "Customer profile creation failed.  If the problem persists please message us on Instagram @planetcaravansmokeshop or send an email to planetcaravanwebsite@gmail.com";
            break;
          case "E00113":
          case "E00114":
          case "E00115":
          case "E00116":
          case "E00117":
          case "E00123":
          case "E00124":
          case "E00131":
          case "E00133":
            errors[0].message =
              "There has been an error with the payment gateway.  Please start your transaction from the beginning.  If the problem persists please message us on Instagram @planetcaravansmokeshop or send an email to planetcaravanwebsite@gmail.com";
            break;
          case "16":
            errors[0].message =
              "This transaction cannot be found.  Please refresh your page. If the problem persists please message us on Instagram @planetcaravansmokeshop or send an email to planetcaravanwebsite@gmail.com";
            break;
          case "52":
          case "81":
          case "152":
            errors[0].message =
              "There has been an error with your transaction. Please refresh your page and try again.  If the problem persists please message us on Instagram @planetcaravansmokeshop or send an email to planetcaravanwebsite@gmail.com";
            break;
          case "155":
            errors[0].message =
              "There has been an error with your transaction. Please message us on Instagram @planetcaravansmokeshop or send an email to planetcaravanwebsite@gmail.com";
            break;
          case "319":
            errors[0].message =
              "This transaction cannot be found.  Please refresh your page. If the problem persists please message us on Instagram @planetcaravansmokeshop or send an email to planetcaravanwebsite@gmail.com";
            break;
          case "327":
            errors[0].message =
              "There has been an error with your intended action.  Please try again.  If the problem persists please message us on Instagram @planetcaravansmokeshop or send an email to planetcaravanwebsite@gmail.com";
            break;
        }

        setSubmitErrors(errors);
      });
    // setSubmitErrors([]);
    // const creditCard: ICardPaymentInput = {
    //   billingAddress: { postalCode },
    //   cvv: removeEmptySpaces(maybe(() => formData.ccCsc, "") || ""),
    //   expirationDate: removeEmptySpaces(maybe(() => formData.ccExp, "") || ""),
    //   number: removeEmptySpaces(maybe(() => formData.ccNumber, "") || ""),
    // };
    // const payment = await tokenizeCcCard(creditCard);
    // if (payment?.token) {
    //   processPayment(payment?.token, {
    //     brand: payment?.ccType,
    //     firstDigits: null,
    //     lastDigits: payment?.lastDigits,
    //     expMonth: null,
    //     expYear: null,
    //   });
    // } else {
    //   const braintreePayloadErrors = [
    //     {
    //       message:
    //         "Payment submission error. Braintree gateway returned no token in payload.",
    //     },
    //   ];
    //   setSubmitErrors(braintreePayloadErrors);
    //   onError(braintreePayloadErrors);
    // }
  };
  const allErrors = [...errors, ...submitErrors];

  return (
    <S.Wrapper data-test="authorizePaymentGateway">
      <AcceptComponent />
      <CreditCardForm
        formRef={formRef}
        formId={formId}
        cardErrors={cardErrors.fieldErrors}
        labelsText={{
          ccCsc: "CVC",
          ccExp: "Exp Date",
          ccNumber: "Number",
        }}
        disabled={false}
        handleSubmit={handleSubmit}
      />
      <ErrorMessage errors={allErrors} />
    </S.Wrapper>
  );
};

export { AuthorizePaymentGateway };
