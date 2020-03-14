import * as React from "react";

import {storiesOf} from "@storybook/react"
import MatchTimer from "./index"
import storyBaseProps from "../../stories/storyBaseProps";

const exampleDetails = {
  backLeftSampleFieldState: 0,
  backRightSampleFieldState: 0,
  frontLeftSampleFieldState: 0,
  frontRightSampleFieldState: 0,
  depot: 1,
  depotPlatinum: 1,
  frontGold: 1,
  backGold: 1,
  any: 1,
  silver: 1,
  ownAnyPlatinum: 1,
  theirAnyPlatinum: 1,
  ownSilverPlatinum: 1,
  theirSilverPlatinum: 1,
  ownFrontGoldPlatinum: 1,
  theirFrontGoldPlatinum: 1,
  ownBackGoldPlatinum: 1,
  theirBackGoldPlatinum: 1,
};

storiesOf('pages/MatchTimer', module)
  .add('Elim match', () => <MatchTimer
    {...storyBaseProps}
    eventName='Illinois State Championship'
    matchName='Semi-final 1 Match 2'
    blueSeed={4}
    redSeed={1}
    random={2}
    blueAlliance={[
      {
        number: 15140,
        name: 'A robotics team name',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: true
      }
    ]}
    redAlliance={[
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      }
    ]}
    time={'0:30'}
    period={'endgame'}
    redScore={123}
    blueScore={12}
    redScoreDetails={exampleDetails}
    blueScoreDetails={exampleDetails} />)
  .add('Qual match', () => <MatchTimer
    {...storyBaseProps}
    eventName='Illinois State Championship'
    matchName='Qualification Match 2'
    random={2}
    blueAlliance={[
      {
        number: 5140,
        name: 'N.Y.A.N. Robotics - Not Your Average Nerds',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      }
    ]}
    redAlliance={[
      {
        number: 15140,
        name: 'A robotics team name',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      }
    ]}
    time={'2:11'}
    period={'auto'}
    redScore={123}
    blueScore={12}
    redScoreDetails={exampleDetails}
    blueScoreDetails={exampleDetails}
  />)
  .add('Elim match (overlay)', () => <MatchTimer
    {...storyBaseProps}
    overlayEnabled
    eventName='Illinois State Championship'
    matchName='Semi-final 1 Match 2'
    blueSeed={4}
    redSeed={1}
    random={2}
    blueAlliance={[
      {
        number: 15140,
        name: 'A robotics team name',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: true
      }
    ]}
    redAlliance={[
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      }
    ]}
    percentComplete={0.8}
    time={'0:30'}
    period={'endgame'}
    redScore={123}
    blueScore={12}
    redScoreDetails={exampleDetails}
    blueScoreDetails={exampleDetails}
  />)
  .add('Qual match (overlay)', () => <MatchTimer
    {...storyBaseProps}
    overlayEnabled
    eventName='Illinois State Championship'
    matchName='Qualification Match 2'
    random={2}
    blueAlliance={[
      {
        number: 5140,
        name: 'N.Y.A.N. Robotics - Not Your Average Nerds',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      }
    ]}
    redAlliance={[
      {
        number: 15140,
        name: 'A robotics team name',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      }
    ]}
    percentComplete={0.05}
    time={'2:11'}
    period={'auto'}
    redScore={123}
    blueScore={12}
    redScoreDetails={exampleDetails}
    blueScoreDetails={exampleDetails}
  />)
  .add('Qual match (overlay flip)', () => <MatchTimer
    {...storyBaseProps}
    overlayEnabled
    flip
    eventName='Illinois State Championship'
    matchName='Qualification Match 2'
    random={2}
    blueAlliance={[
      {
        number: 5140,
        name: 'N.Y.A.N. Robotics - Not Your Average Nerds',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      }
    ]}
    redAlliance={[
      {
        number: 15140,
        name: 'A robotics team name',
        cardCarries: false
      },
      {
        number: 5140,
        name: 'A robotics team name',
        cardCarries: false
      }
    ]}
    percentComplete={0.05}
    time={'2:11'}
    period={'auto'}
    redScore={123}
    blueScore={12}
    redScoreDetails={exampleDetails}
    blueScoreDetails={exampleDetails}
  />);
