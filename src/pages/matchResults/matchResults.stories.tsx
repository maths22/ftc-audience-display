import * as React from "react";

import {storiesOf} from "@storybook/react"
import MatchResults from "./index"
import MatchResultsAnimation from './animation'
import storyBaseProps from "../../stories/storyBaseProps";


storiesOf('pages/MatchResultsAnimation', module)
  .add('Blue Winner', () => <MatchResultsAnimation winner={'blue'} />)
  .add('Red Winner', () => <MatchResultsAnimation winner={'red'} />)
  .add('Tie', () => <MatchResultsAnimation winner={'tie'} />);

const exampleBreakdown = {
  autoParking: 1,
  claimedDepot: 1,
  landed: 1,
  mineralSample: 1,
  depotMinerals: 1,
  depotPlatinumMinerals: 2,
  landerAny: 3,
  landerGold: 1,
  landerPlatinum: 2,
  landerSilver: 3,
  endParking: 1,
  latchedLander: 1,
  totalPenaltyPoints: 10
};

storiesOf('pages/MatchResults', module)
  .add('Elim match', () => <MatchResults
    {...storyBaseProps}
    disableAnimation
    eventName='Illinois State Championship'
    matchName='Semi-final 1 Match 2'
    blueRecord={2}
    redRecord={1}
    blueSeed={4}
    redSeed={1}
    winner={'red'}
    blueAlliance={[
      {
        number: 5140,
        name: 'A robotics team name',
        card: 0
      },
      {
        number: 5140,
        name: 'A robotics team name',
        card: 0
      },
      {
        number: 5140,
        name: 'A robotics team name',
        card: 1
      }
    ]}
    redAlliance={[
      {
        number: 5140,
        name: 'A robotics team name',
        card: 0
      },
      {
        number: 5140,
        name: 'A robotics team name',
        card: 2
      },
      {
        number: 5140,
        name: 'A robotics team name',
        card: 0
      }
    ]}
    blueWonSeries
    redHighScore
    redScore={123}
    blueScore={12}
    redScoreBreakdown={exampleBreakdown}
    blueScoreBreakdown={exampleBreakdown} />)
  .add('Qual match', () => <MatchResults
    {...storyBaseProps}
    disableAnimation
    eventName='Illinois State Championship'
    matchName='Qualification Match 2'
    winner={'blue'}
    blueAlliance={[
      {
        number: 5140,
        name: 'N.Y.A.N. Robotics - Not Your Average Nerds',
        ranking: 5,
        rankMove: 'up',
        card: 0
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 3,
        card: 0
      }
    ]}
    redAlliance={[
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 10,
        card: 0
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 11,
        rankMove: 'down',
        card: 0
      }
    ]}
    redHighScore
    redScore={123}
    blueScore={12}
    redScoreBreakdown={exampleBreakdown}
    blueScoreBreakdown={exampleBreakdown}
  />);
