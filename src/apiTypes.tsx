type ApiMatch = {
  played: boolean,
  match: string
  red: number,
  blue: number,
}

type ApiRanking = {
  ranking: number
  team: number,
  teamName: string,
  RP: number,
  TBP: number,
  plays: number
}

interface ApiEvent {
  type: string,
  ts: number,
  params: {
    field?: number,
    matchName?: number
  }
}

type RoverRuckusScoreDetails = {
  backLeftSampleFieldState: number,
  backRightSampleFieldState: number,
  frontLeftSampleFieldState: number,
  frontRightSampleFieldState: number,
  depot: number,
  depotPlatinum: number,
  frontGold: number,
  backGold: number,
  any: number,
  silver: number,
  ownAnyPlatinum: number,
  theirAnyPlatinum: number,
  ownSilverPlatinum: number,
  theirSilverPlatinum: number,
  ownFrontGoldPlatinum: number,
  theirFrontGoldPlatinum: number,
  ownBackGoldPlatinum: number,
  theirBackGoldPlatinum: number,
}

type RoverRuckusScoreBreakdown = {
  autoParking: number,
  claimedDepot: number,
  landed: number,
  mineralSample: number,
  depotMinerals: number,
  depotPlatinumMinerals: number,
  landerAny: number,
  landerGold: number,
  landerPlatinum: number,
  landerSilver: number,
  endParking: number,
  latchedLander: number,
  totalPenaltyPoints: number
}
