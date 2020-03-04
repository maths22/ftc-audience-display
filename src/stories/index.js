import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Welcome } from '@storybook/react/demo'

import Panel from '../layout/panel'
import Background from '../layout/background'
import PrimaryLayout from '../layout/primary'
import OverlayLayout from '../layout/overlay'
import Heading from '../components/heading'
import Text from '../components/scrollingText'
import MatchInformation from '../pages/matchInformation'
import MatchResults from '../pages/matchResults'
import MatchTimer from '../pages/matchTimer'
import Blank from '../pages/blank'
import Sponsors from '../pages/sponsors'
import SoundTest from '../settings/soundTest'
import ColorPicker from '../settings/colorPicker'
import Settings from '../settings/settings'
import AudienceDisplay from '../audience_display'
import ScrollingTable from '../components/scrollingTable'
import Rankings from '../pages/rankings'
import Die from '../components/die'
import MatchResultsAnimation from '../pages/matchResults/animation'
import Awards from '../pages/awards'

storiesOf('AudienceDisplay', module).add('display', () => <AudienceDisplay />)

storiesOf('components/Background', module).add('display', () => <Background />)

storiesOf('components/Panel', module)
  .add('Small', () => <div><Panel height={20} width={20} >Hello Button</Panel></div>)
  .add('Full width', () => <Panel height={20} width={100} >Hello Button</Panel>)
  .add('Full page', () => <Panel height={100} width={100} >Hello Button</Panel>)

storiesOf('components/Heading', module)
  .add('Small', () => <Heading size={20}>small</Heading>)
  .add('Big', () => <Heading size={70}>small</Heading>)

storiesOf('components/Text', module)
  .add('Small', () => <Text width='70px' text='small' />)
  .add('Big', () => <div>
    <Text width='70px' text='very very very very very very very very very long' /><br />
    <Text width='90px' text='very very very very very very very very very long' />
  </div>)

storiesOf('components/Die')
  .add('1', () => <Die number={1} />)
  .add('2', () => <Die number={2} />)
  .add('3', () => <Die number={3} />)
  .add('4', () => <Die number={4} />)
  .add('5', () => <Die number={5} />)
  .add('6', () => <Die number={6} />)

storiesOf('components/ScrollingTable', module)
  .add('display', () => <ScrollingTable
    width='30vw'
    height='50vh'
    keyCol={'number'}
    columns={[
      {
        name: 'Name',
        field: 'name'
      },
      {
        name: 'Number',
        field: 'number'
      }
    ]}
    data={[
      { name: 'A great name', number: 123 },
      { name: 'A great name', number: 124 },
      { name: 'A great name', number: 125 },
      { name: 'A great name', number: 126 },
      { name: 'A great name', number: 127 },
      { name: 'A great name', number: 128 },
      { name: 'A great name', number: 129 },
      { name: 'A great name', number: 130 },
      { name: 'A great name', number: 131 },
      // { name: 'A great name', number: 132 },
      // { name: 'A great name', number: 133 },
      // { name: 'A great name', number: 134 },
      // { name: 'A great name', number: 135 },
      // { name: 'A great name', number: 136 },
      // { name: 'A great name', number: 137 },
      // { name: 'A great name', number: 138 },
      // { name: 'A great name', number: 139 },
      // { name: 'A great name', number: 140 },
      // { name: 'A great name', number: 141 },
      // { name: 'A great name', number: 142 },
      // { name: 'A great name', number: 143 },
      // { name: 'A great name', number: 144 },
      // { name: 'A great name', number: 145 },
    ]}/>
  )

storiesOf('layout/Primary', module)
  .add('Empty', () => <PrimaryLayout />)
  .add('Heading', () => <PrimaryLayout heading={<Heading align={'center'} size={70}>Test heading</Heading>} />)
  .add('Scrolling heading', () => <PrimaryLayout heading={<Heading align={'center'} size={70}>Test heading Test heading Test heading Test heading Test heading Test heading Test heading Test heading Test heading</Heading>} />)

storiesOf('layout/Overlay', module)
  .add('Empty', () => <OverlayLayout />)
  .add('Heading', () => <OverlayLayout heading={<Heading align={'center'} size={40}>Test heading</Heading>} />)
  .add('Fipped Heading', () => <OverlayLayout heading={<Heading align={'center'} size={40}>Test heading</Heading>} flip />)
  .add('Scrolling heading', () => <OverlayLayout heading={<Heading align={'center'} size={40}>Test heading Test heading Test heading Test heading Test heading Test heading Test heading Test heading Test heading</Heading>} />)

storiesOf('settings/components', module)
  .add('SoundTest', () => <SoundTest />)

storiesOf('settings/components', module)
  .add('ColorPicker', () => <ColorPicker />)

storiesOf('settings/components', module)
  .add('Settings', () => <Settings />)

storiesOf('pages/MatchInformation', module)
  .add('Elim match', () => <MatchInformation
    eventName='Illinois State Championship'
    matchName='Semi-final 1 Match 2'
    blueRecord={2}
    redRecord={1}
    blueSeed={4}
    redSeed={1}
    blueAlliance={[
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      }
    ]}
    redAlliance={[
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      }
    ]} />)
  .add('Qual match', () => <MatchInformation
    eventName='Illinois State Championship'
    matchName='Qualification Match 2'
    blueAlliance={[
      {
        number: 5140,
        name: 'N.Y.A.N. Robotics - Not Your Average Nerds',
        ranking: 5
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 3
      }
    ]}
    redAlliance={[
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 10
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 11
      }
    ]} />)

storiesOf('pages/Award', module)
  .add('Award', () => <Awards
    eventName='Illinois State Championship'
    actionType='SHOW_SECOND'
    isRobotGameAward={false}
    award={{
      teamAward: true,
      name: 'Example Award',
      firstTeam: { data: {
          number: '4321',
          name: 'Team Robot'
        } },
      secondTeam: { data: {
          number: '1234',
          name: 'Robot Team'
        } },
      thirdTeam: { data: {
          number: '1234',
          name: 'FTC Team'
        } }
    }}
  />)
  .add('Award (overlay)', () => <Awards
    overlayEnabled
    eventName='Illinois State Championship'
    actionType='SHOW_SECOND'
    isRobotGameAward={false}
    award={{
      teamAward: true,
      name: 'Example Award',
      firstTeam: { data: {
          number: '4321',
          name: 'Team Robot'
        } },
      secondTeam: { data: {
          number: '1234',
          name: 'Robot Team'
        } },
      thirdTeam: { data: {
          number: '1234',
          name: 'FTC Team'
        } }
    }} />)

storiesOf('pages/MatchResultsAnimation', module)
  .add('Elim match', () => <MatchResultsAnimation
    eventName='Illinois State Championship'
    matchName='Semi-final 1 Match 2'
    blueRecord={2}
    redRecord={1}
    blueSeed={4}
    redSeed={1}
    winner={"blue"}
    blueAlliance={[
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      }
    ]}
    redAlliance={[
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      }
    ]}
    blueWonSeries
    redHighScore
    redScore={123}
    blueScore={12}
    redScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]}
    blueScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]} />)

storiesOf('pages/MatchResults', module)
  .add('Elim match', () => <MatchResults
    eventName='Illinois State Championship'
    matchName='Semi-final 1 Match 2'
    blueRecord={2}
    redRecord={1}
    blueSeed={4}
    redSeed={1}
    blueAlliance={[
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      }
    ]}
    redAlliance={[
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      }
    ]}
    blueWonSeries
    redHighScore
    redScore={123}
    blueScore={12}
    redScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]}
    blueScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]} />)
  .add('Qual match', () => <MatchResults
    eventName='Illinois State Championship'
    matchName='Qualification Match 2'
    blueAlliance={[
      {
        number: 5140,
        name: 'N.Y.A.N. Robotics - Not Your Average Nerds',
        ranking: 5,
        rankMove: 'up'
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 3
      }
    ]}
    redAlliance={[
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 10
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 11,
        rankMove: 'down'
      }
    ]}
    redHighScore
    redScore={123}
    blueScore={12}
    redScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]}
    blueScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]}
  />)

storiesOf('pages/MatchTimer', module)
  .add('Elim match', () => <MatchTimer
    eventName='Illinois State Championship'
    matchName='Semi-final 1 Match 2'
    blueSeed={4}
    redSeed={1}
    blueAlliance={[
      {
        number: 15140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      }
    ]}
    redAlliance={[
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      }
    ]}
    time={'0:30'}
    period={'Endgame'}
    redScore={123}
    blueScore={12}
    redScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]}
    blueScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]} />)
  .add('Qual match', () => <MatchTimer
    eventName='Illinois State Championship'
    matchName='Qualification Match 2'
    blueAlliance={[
      {
        number: 5140,
        name: 'N.Y.A.N. Robotics - Not Your Average Nerds',
        ranking: 5,
        rankMove: 'up'
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 3
      }
    ]}
    redAlliance={[
      {
        number: 15140,
        name: 'A robotics team name',
        ranking: 10
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 11,
        rankMove: 'down'
      }
    ]}
    time={'2:11'}
    period={'Autonomous'}
    redScore={123}
    blueScore={12}
    redScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]}
    blueScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]}
  />)
  .add('Elim match (overlay)', () => <MatchTimer
    overlayEnabled
    eventName='Illinois State Championship'
    matchName='Semi-final 1 Match 2'
    blueSeed={4}
    redSeed={1}
    blueAlliance={[
      {
        number: 15140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      }
    ]}
    redAlliance={[
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      },
      {
        number: 5140,
        name: 'A robotics team name'
      }
    ]}
    percentComplete={0.8}
    time={'0:30'}
    period={'Endgame'}
    redScore={123}
    blueScore={12}
    redScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]}
    blueScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]} />)
  .add('Qual match (overlay)', () => <MatchTimer
    overlayEnabled
    eventName='Illinois State Championship'
    matchName='Qualification Match 2'
    blueAlliance={[
      {
        number: 5140,
        name: 'N.Y.A.N. Robotics - Not Your Average Nerds',
        ranking: 5,
        rankMove: 'up'
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 3
      }
    ]}
    redAlliance={[
      {
        number: 15140,
        name: 'A robotics team name',
        ranking: 10
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 11,
        rankMove: 'down'
      }
    ]}
    percentComplete={0.05}
    time={'2:11'}
    period={'Autonomous'}
    redScore={123}
    blueScore={12}
    redScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]}
    blueScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]}
  />)
  .add('Qual match (overlay flip)', () => <MatchTimer
    overlayEnabled
    overlayFlip
    eventName='Illinois State Championship'
    matchName='Qualification Match 2'
    blueAlliance={[
      {
        number: 5140,
        name: 'N.Y.A.N. Robotics - Not Your Average Nerds',
        ranking: 5,
        rankMove: 'up'
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 3
      }
    ]}
    redAlliance={[
      {
        number: 15140,
        name: 'A robotics team name',
        ranking: 10
      },
      {
        number: 5140,
        name: 'A robotics team name',
        ranking: 11,
        rankMove: 'down'
      }
    ]}
    percentComplete={0.05}
    time={'2:11'}
    period={'Autonomous'}
    redScore={123}
    blueScore={12}
    redScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]}
    blueScoreBreakdown={[
      ['Autonomous', 10],
      ['Mineral', 0],
      ['End game', 102],
      ['Red Penalty', 0]
    ]}
  />)

storiesOf('pages/Blank')
  .add('Full', () => <Blank />)
  .add('Overlay', () => <Blank overlayEnabled />)

storiesOf('pages/Sponsor')
  .add('Full', () => <Sponsors
    eventName='Illinois State Championship'
    sponsors={[
      {
        name: 'Baxter',
        level: 'global',
        logoUrl: 'https://www.mds-foundation.org/wp-content/uploads/2011/05/Baxter-logo.png'
      },
      {
        level: 'regional',
        name: 'Highland Park High School'
      },
      {
        level: 'event',
        logoUrl: 'https://www.nisod.org/wp-content/uploads/2019/01/Elgin-Community-College-Logo.png'
      }
    ]}
  />)

storiesOf('pages/Ranking')
  .add('Full', () => <Rankings
    eventName='Illinois State Championship'
    queueList={[12,13,14]}
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
      { rank: 13, number: 135, rp: 2, tbp: 123, matchesPlayed: 1 },
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
      { number: 'Q-11', redScore: 122, blueScore: 23 },
    ]}
  />)
