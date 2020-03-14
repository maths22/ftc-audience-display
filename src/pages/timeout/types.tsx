import {BaseProps} from "../../baseProps";

export type Props = BaseProps & {
  time: string,
  allianceTimeout: string,
  timeoutStart: number,
  timeoutDuration: number
}
