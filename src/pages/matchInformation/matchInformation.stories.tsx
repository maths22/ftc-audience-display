import * as React from "react";

import {storiesOf} from "@storybook/react";
import MatchInformation from "./index";
import storyBaseProps from "../../stories/storyBaseProps";

storiesOf('pages/MatchInformation', module)
  .add('Elim match', () => <MatchInformation
    {...storyBaseProps}
    eventName='Illinois State Championship'
    matchName='Semi-final 1 Match 2'
    blueRecord={2}
    redRecord={1}
    blueSeed={4}
    redSeed={1}
    blueAlliance={[
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false,
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false,
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false,
      }
    ]}
    redAlliance={[
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false,
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false,
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false,
      }
    ]} />)
  .add('Qual match', () => <MatchInformation
    {...storyBaseProps}
    eventName='Illinois State Championship'
    matchName='Qualification Match 2'
    blueAlliance={[
      {
        number: 5140,
        name: 'N.Y.A.N. Robotics - Not Your Average Nerds',
        ranking: 5,
        cardCarries: false,
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 3,
        cardCarries: true,
      }
    ]}
    redAlliance={[
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 10,
        cardCarries: false,
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 11,
        cardCarries: false,
      }
    ]} />);
