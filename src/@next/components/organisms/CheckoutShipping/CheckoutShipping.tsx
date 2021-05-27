import { Formik } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ErrorMessage, Radio } from "@components/atoms";
import { Money } from "@components/containers";
import { checkoutMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Shipping method selector used in checkout.
 */

const CheckoutShipping: React.FC<IProps> = ({
  shippingMethods,
  selectedShippingMethodId,
  selectShippingMethod,
  errors,
  formId,
  formRef,
}: IProps) => {
  const fedExDomestic = (
    <ul>
      <li style={{ marginTop: "10px" }}>
        FedEx 2Day shipping should get your package there by the end of the
        second second second second second second business day. Packages will
        arrive by p.m. to areas and p.m. to residences
      </li>
      <li style={{ marginTop: "10px" }}>
        Any package over 645 cubic inches will ship via FedEx Home Delivery.
        Please see your tracking number for specifications
      </li>
    </ul>
  );
  const fedExDomesticOvernight = (
    <ul>
      <li style={{ marginTop: "10px" }}>
        Choose FedEx Priority Overnight® for a delivery in 1 or 2 days,
        depending on the area of delivery
      </li>
    </ul>
  );
  const signature = (
    <ul>
      <li style={{ marginTop: "10px" }}>
        Someone at the recipient’s address may sign for the delivery. Direct
        signature deliveries are made to the address on the mailing label, not
        to an individual recipient. If no one is at the address, FedEx may
        reattempt the delivery
      </li>
      <li style={{ marginTop: "10px" }}>
        For more information about FedEx Direct Signature option please visit
        <a
          href="https://www.fedex.com/en-us/delivery-options/signature-services.html"
          rel="noreferrer"
          target="_blank"
        >
          https://www.fedex.com/en-us/delivery-options/signature-services.html
        </a>
      </li>
    </ul>
  );

  console.log(shippingMethods);

  return (
    <section>
      <S.Title data-test="checkoutPageSubtitle">
        <FormattedMessage {...checkoutMessages.shippingMethod} />
      </S.Title>
      <Formik
        initialValues={{
          shippingMethod: selectedShippingMethodId,
        }}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          if (selectShippingMethod && values.shippingMethod) {
            selectShippingMethod(values.shippingMethod);
          }
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <S.ShippingMethodForm
              id={formId}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              {shippingMethods.map(({ id, name, price }, index) => {
                const checked =
                  !!values.shippingMethod && values.shippingMethod === id;

                let shippingDisclaimer;

                switch (id) {
                  case "U2hpcHBpbmdNZXRob2Q6OA==":
                    shippingDisclaimer = fedExDomesticOvernight;
                    break;
                  case "U2hpcHBpbmdNZXRob2Q6MTA=":
                    shippingDisclaimer = (
                      <>
                        {fedExDomesticOvernight}
                        {signature}
                      </>
                    );
                    break;
                  case "U2hpcHBpbmdNZXRob2Q6Nw==":
                    shippingDisclaimer = fedExDomestic;
                    break;
                  case "U2hpcHBpbmdNZXRob2Q6MTE=":
                    shippingDisclaimer = (
                      <>
                        {fedExDomestic}
                        {signature}
                      </>
                    );
                    break;
                  default:
                    shippingDisclaimer = <></>;
                }

                return (
                  <S.Tile
                    checked={checked}
                    key={id}
                    data-test="shippingMethodTile"
                    data-test-id={id}
                  >
                    <Radio
                      absolute
                      name="shippingMethod"
                      value={id}
                      checked={checked}
                      customLabel
                      onChange={() => setFieldValue("shippingMethod", id)}
                    >
                      <S.TileTitle>
                        <span
                          data-test="checkoutShippingMethodOptionName"
                          style={{ fontWeight: "bold" }}
                        >
                          {name}
                        </span>
                        <S.Price>
                          {" "}
                          | +
                          <Money
                            data-test="checkoutShippingMethodOptionPrice"
                            money={price}
                          />
                        </S.Price>
                        {shippingDisclaimer}
                      </S.TileTitle>
                    </Radio>
                  </S.Tile>
                );
              })}
              <ErrorMessage errors={errors} />
            </S.ShippingMethodForm>
          );
        }}
      </Formik>
      <div style={{ marginTop: "40px", fontSize: ".85rem" }}>
        <ul>
          <li style={{ marginTop: "10px" }}>
            All packages will come with tracking from FedEx. Please refer to
            your tracking number for your personal shipping specifications
          </li>
          <li style={{ marginTop: "10px" }}>
            Please DM us via instagram{" "}
            <a
              href="https://www.instagram.com/planetcaravansmokeshop/"
              rel="noreferrer"
              target="_blank"
            >
              @planetcaravansmokeshop
            </a>{" "}
            /{" "}
            <a
              href="https://www.instagram.com/planetcaravandrops/"
              rel="noreferrer"
              target="_blank"
            >
              @planetcaravandrops
            </a>{" "}
            for any shipping questions
          </li>
        </ul>
      </div>
    </section>
  );
};

export { CheckoutShipping };
