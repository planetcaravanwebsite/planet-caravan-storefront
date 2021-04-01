import { defaultTheme } from "@styles";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ButtonSmall } from ".";
import * as S from "./styles";

describe("<Button />", () => {
  it("renders children", () => {
    const text = "test";
    const wrapper = shallow(
      <ButtonSmall testingContext="testButton">{text}</ButtonSmall>
    );

    expect(wrapper.text()).toEqual(text);
  });

  it("simulates click events", () => {
    const onButtonClick = jest.fn();
    const wrapper = shallow(
      <ButtonSmall onClick={onButtonClick} testingContext="testButton" />
    );

    wrapper.simulate("click");
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });

  it("uses correct theme based on color prop", () => {
    const PrimaryButton = mount(<ButtonSmall testingContext="testButton" />);
    const SecondaryButton = mount(
      <ButtonSmall color="secondary" testingContext="testButton" />
    );

    expect(PrimaryButton).toHaveStyleRule(
      "background-color",
      defaultTheme.button.colors.primary.background
    );

    expect(SecondaryButton).toHaveStyleRule(
      "background-color",
      defaultTheme.button.colors.secondary.background
    );
  });

  it("uses correct theme based on size prop", () => {
    const NormalButtonText = mount(
      <ButtonSmall size="md" testingContext="testButton" />
    ).find(S.Text);
    const SmallButtonText = mount(
      <ButtonSmall size="sm" testingContext="testButton" />
    ).find(S.Text);

    expect(NormalButtonText).toHaveStyleRule(
      "font-size",
      defaultTheme.button.typography.fontSize
    );

    expect(SmallButtonText).toHaveStyleRule(
      "font-size",
      defaultTheme.button.typography.smallFontSize
    );
  });
});
