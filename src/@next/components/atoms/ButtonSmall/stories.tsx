import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ButtonSmall } from ".";

storiesOf("@components/atoms/Button", module)
  .addParameters({ component: ButtonSmall })
  .add("Primary", () => (
    <ButtonSmall
      fullWidth={boolean("FullWidth", false)}
      testingContext="testButton"
    >
      Primary Button
    </ButtonSmall>
  ))
  .add("Secondary", () => (
    <ButtonSmall
      color="secondary"
      fullWidth={boolean("FullWidth", false)}
      testingContext="testButton"
    >
      Secondary Button
    </ButtonSmall>
  ))
  .add("Size sm", () => (
    <ButtonSmall
      size="sm"
      fullWidth={boolean("FullWidth", false)}
      testingContext="testButton"
    >
      Small Button
    </ButtonSmall>
  ));
