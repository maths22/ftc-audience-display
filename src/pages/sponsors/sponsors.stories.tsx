import * as React from "react";

import {storiesOf} from "@storybook/react";
import Sponsors from "./index";
import storyBaseProps from "../../stories/storyBaseProps";

storiesOf('pages/Sponsors', module)
  .add('Full', () => <Sponsors
    {...storyBaseProps}
    eventName='Illinois State Championship'
    sponsors={[
      {
        number: 1,
        name: 'Baxter',
        level: 'GLOBAL' as const,
        logoPath: 'https://www.mds-foundation.org/wp-content/uploads/2011/05/Baxter-logo.png'
      },
      {
        number: 2,
        level: 'REGIONAL' as const,
        name: 'Highland Park High School'
      },
      {
        number: 3,
        level: 'EVENT' as const,
        logoPath: 'https://www.nisod.org/wp-content/uploads/2019/01/Elgin-Community-College-Logo.png'
      }
    ]}
  />);
