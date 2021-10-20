import { Formik } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ErrorMessage } from "@components/atoms";
import { checkoutMessages } from "@temp/intl";

import { TakeShape } from "@temp/components";
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
              <TakeShape
                position="shippingMethods"
                idMap={shippingMethods}
                selected={values.shippingMethod}
                setFieldValue={setFieldValue}
              />
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
