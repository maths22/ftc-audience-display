import * as React from "react";

import {storiesOf} from "@storybook/react";
import Rankings from "./index";
import storyBaseProps from "../../stories/storyBaseProps";

storiesOf('pages/Rankings', module)
  .add('Full', () => <Rankings
    {...storyBaseProps}
    eventName='Illinois State Championship'
    queueList={[12, 13, 14]}
    matchesPerTeam={5}
    matchCount={20}
    matchesPlayed={4}
    rankings={[
      { rank: 1, number: 123, rp: 2, tbp: 123, matchesPlayed: 1 },
      { rank: 2, number: 124, rp: 2, tbp: 123, matchesPlayed: 1 },
      { rank: 3, number: 125, rp: 2, tbp: 123, matchesPlayed: 1 },
      { rank: 4, number: 126, rp: 2, tbp: 123, matchesPlayed: 1 },
      { rank: 5, number: 127, rp: 2, tbp: 123, matchesPlayed: 1 },
      { rank: 6, number: 128, rp: 2, tbp: 123, matchesPlayed: 1 },
      { rank: 7, number: 129, rp: 2, tbp: 123, matchesPlayed: 1 },
      { rank: 8, number: 130, rp: 2, tbp: 123, matchesPlayed: 1 },
      { rank: 9, number: 131, rp: 2, tbp: 123, matchesPlayed: 1 },
      { rank: 10, number: 132, rp: 2, tbp: 123, matchesPlayed: 1 },
      { rank: 11, number: 133, rp: 2, tbp: 123, matchesPlayed: 1 },
      { rank: 12, number: 134, rp: 2, tbp: 123, matchesPlayed: 1 },
      { rank: 13, number: 135, rp: 2, tbp: 123, matchesPlayed: 1 }
    ]}
    matchList={[
      { number: 'Q-1', redScore: 12, blueScore: 234 },
      { number: 'Q-2', redScore: 122, blueScore: 23 },
      { number: 'Q-3', redScore: 12, blueScore: 12 },
      { number: 'Q-4', redScore: 12, blueScore: 234 },
      { number: 'Q-5', redScore: 122, blueScore: 23 },
      { number: 'Q-6', redScore: 12, blueScore: 234 },
      { number: 'Q-7', redScore: 122, blueScore: 23 },
      { number: 'Q-8', redScore: 12, blueScore: 234 },
      { number: 'Q-9', redScore: 122, blueScore: 23 },
      { number: 'Q-10', redScore: 12, blueScore: 234 },
      { number: 'Q-11', redScore: 122, blueScore: 23 }
    ]}
  />);
