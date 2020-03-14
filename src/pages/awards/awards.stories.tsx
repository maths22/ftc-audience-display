import * as React from "react";

import {storiesOf} from "@storybook/react";
import Awards from "./index";
import storyBaseProps from "../../stories/storyBaseProps";

storiesOf('pages/Awards', module)
  .add('Award', () => <Awards
    {...storyBaseProps}
    eventName='Illinois State Championship'
    actionType='SHOW_SECOND'
    isRobotGameAward={false}
    award={{
      teamAward: true,
      name: 'Example Award',
      type: 0,
      assignments: [
        {
          team: {
            data: {
              number: '4321',
              name: 'Team Robot'
            }
          }
        },
        {
          team: {
            data: {
              number: '1234',
              name: 'Robot Team'
            }
          }
        },
        {
          team: {
            data: {
              number: '1234',
              name: 'FTC Team'
            }
          }
        }
      ]
    }}
  />)
  .add('Award (overlay)', () => <Awards
    {...storyBaseProps}
    overlayEnabled
    eventName='Illinois State Championship'
    actionType='SHOW_SECOND'
    isRobotGameAward={false}
    award={{
      teamAward: true,
      name: 'Example Award',
      type: 0,
      assignments: [
        {
          team: {
            data: {
              number: '4321',
              name: 'Team Robot'
            }
          }
        },
        {
          team: {
            data: {
              number: '1234',
              name: 'Robot Team'
            }
          }
        },
        {
          team: {
            data: {
              number: '1234',
              name: 'FTC Team'
            }
          }
        }
      ]
    }} />);
