import * as React from "react";

import {storiesOf} from "@storybook/react";
import Heading from "./index";

storiesOf('components/Heading', module)
  .add('Small', () => <Heading size={20} align={'center'}>small</Heading>)
  .add('Big', () => <Heading size={70} align={'center'}>large</Heading>);
