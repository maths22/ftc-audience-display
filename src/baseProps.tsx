type GeneralSettings = {
  baseApiUrl: string,
  timesyncUrl: string,
  liveUpdateUrl: string,
  pitUpdateUrl: string,
  sponsorImageBase: string,
  eventName: string,
  eventKey: string,
  teamsPerAlliance: number
}

const sampleEventKey = 'test2';
export const generalSettings : GeneralSettings = window['generalSettings'] || {
  baseApiUrl: `http://${window.location.hostname}:8081/apiv1/`,
  timesyncUrl: `http://${window.location.hostname}:8081/display/timesync/`,
  liveUpdateUrl: `ws://${window.location.hostname}:8081/stream/display/command/?code=${sampleEventKey}`,
  pitUpdateUrl: `ws://${window.location.hostname}:8081/stream/display/pit/?code=${sampleEventKey}`,
  sponsorImageBase: `http://${window.location.hostname}:8081/img/sponsors/`,
  eventName: 'Test Event',
  eventKey: sampleEventKey,
  teamsPerAlliance: 2
};

type DisplayConfig = {
  overlayEnabled: boolean,
  keyColor: string,
  flip: boolean,
  showLiveScoring: boolean,
  mute: boolean,
  now: () => number
}

type ActionProps = {
  actionType: string,
  actionTime: Date
}

export type BaseProps = GeneralSettings & DisplayConfig & ActionProps;
