import { storiesOf } from "@storybook/react";
import React from "react";

import { LoadingImage } from ".";

storiesOf("@components/atoms/LoadingImage", module)
  .addParameters({ component: LoadingImage })
  .add("default", () => <LoadingImage />);
