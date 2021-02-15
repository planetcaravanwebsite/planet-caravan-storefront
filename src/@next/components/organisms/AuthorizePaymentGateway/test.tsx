import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AuthorizePaymentGateway } from ".";

const config = [{ field: "client_token", value: "token_test_1234567890" }];

describe("<AuthorizePaymentGateway />", () => {
  it("exists", () => {
    const processPayment = jest.fn();
    const onError = jest.fn();
    const wrapper = shallow(
      <AuthorizePaymentGateway
        config={config}
        processPayment={processPayment}
        onError={onError}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
