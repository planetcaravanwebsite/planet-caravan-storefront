import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { AuthorizePaymentGateway } from ".";

const config = [{ field: "client_token", value: "token_test_1234567890" }];
const processPayment = action("processPayment");
const onError = action("onError");

storiesOf("@components/organisms/AuthorizePaymentGateway", module)
  .addParameters({ component: AuthorizePaymentGateway })
  .add("default", () => (
    <AuthorizePaymentGateway
      config={config}
      processPayment={processPayment}
      onError={onError}
    />
  ));
