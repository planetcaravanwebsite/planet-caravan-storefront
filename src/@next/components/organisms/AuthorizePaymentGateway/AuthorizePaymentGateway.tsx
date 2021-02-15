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
  const [submitErrors] = useState<IFormError[]>([]);

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

    return Accept.dispatchData(secureData)
      .then(response => {
        processPayment(response.opaqueData?.dataValue, {
          brand: "",
          firstDigits: null,
          lastDigits: "",
          expMonth: null,
          expYear: null,
        });

        return response;
      })
      .catch(response => {
        console.log(response);
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
          ccExp: "ExpiryDate",
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
