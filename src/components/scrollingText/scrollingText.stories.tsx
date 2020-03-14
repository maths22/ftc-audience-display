import * as React from "react";

import {storiesOf} from "@storybook/react";
import Text from "./index";

storiesOf('components/ScrollingText', module)
  .add('Small', () => <Text width='70px' text='small' />)
  .add('Big', () => <div>
    <Text width='70px' text='very very very very very very very very very long' /><br />
    <Text width='90px' text='very very very very very very very very very long' />
  </div>);
