import {BaseProps} from "../../baseProps";

export type Alliance = Array<{
  number: number,
  name: string,
  cardCarries: boolean
}>

export type Props = BaseProps & {
  matchName: string,
  blueSeed?: number,
  redSeed?: number,
  blueAlliance: Alliance
  redAlliance: Alliance,
  redScore: number,
  blueScore: number,
  random: number,
  redScoreDetails: RoverRuckusScoreDetails,
  blueScoreDetails: RoverRuckusScoreDetails,
  time?: string,
  period?: string,
  percentComplete?: number
}

export type ChildProps = Props & {
  time: string,
  period: string,
  showComplete: boolean,
  // in the range 0-1
  percentComplete: number
}
