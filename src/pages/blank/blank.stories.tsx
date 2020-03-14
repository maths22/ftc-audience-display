import * as React from "react";

import {storiesOf} from "@storybook/react";
import Blank from "./index";
import storyBaseProps from "../../stories/storyBaseProps";

storiesOf('pages/Blank', module)
  .add('Full', () => <Blank {...storyBaseProps} />)
  .add('Overlay', () => <Blank  {...storyBaseProps} overlayEnabled />);
