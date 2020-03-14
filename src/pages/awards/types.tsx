import {BaseProps} from "../../baseProps";

export type Props = BaseProps & {
  position?: number,
  isRobotGameAward: boolean,
  award: {
    name: string,
    teamAward: boolean,
    type: number,
    assignments: Array<{
      name?: string,
      team: {
        data: {
          number: string,
          name: string
        }
      }
    }>
  }
}
