import * as React from 'react'
import * as timesync from 'timesync'
import {PersistentWebsocket} from 'persistent-websocket'

import {defaultSettings, DisplaySettings} from './settings/settings'
import SettingsDialog from './settings/settingsDialog'

import AllianceSelection from './pages/allianceSelection'
import Awards from './pages/awards'
import Blank from './pages/blank'
import EliminationLadder from './pages/eliminationLadder'
import MatchInformation from './pages/matchInformation'
import MatchResults from './pages/matchResults'
import MatchTimer from './pages/matchTimer'
import Message from './pages/message'
import Randomization from './pages/randomization'
import Rankings from './pages/rankings'
import Sponsors from './pages/sponsors'
import Timeout from './pages/timeout'
import {generalSettings} from "./baseProps";

const FIELD_TYPES = ['RANDOMIZE', 'SHOW_RANDOM', 'SHOW_MATCH', 'START_MATCH', 'ABORT_MATCH',
  'SHOW_SELECTION', 'SHOW_BRACKET', 'SHOW_AWARD', 'SHOW_THIRD', 'SHOW_SECOND', 'SHOW_WINNER',
  'REDIRECT', 'SHOW_TIMEOUT', 'FIELD_TIMEOUT', 'ALLIANCE_TIMEOUT', 'END_TIMEOUT'];

const LIVE_PERIODS = ['SHOW_MATCH', 'START_MATCH', 'ABORT_MATCH'];

type EmptyProps = {}
type Updates = {[key:string]: ApiEvent}
type State = {
  settings: DisplaySettings,
  updates: Updates
}

export default class AudienceDisplay extends React.Component<EmptyProps, State> {
  private pws: PersistentWebSocket;
  private timesync: Timesync;

  constructor(props : EmptyProps) {
    super(props);
    const settingsString = window.sessionStorage.getItem('displaySettings');
    this.state = {
      settings: settingsString ? JSON.parse(settingsString) : null,
      updates: {}
    }
  }

  // TODO ensure always most recent
  mergeUpdates = (newUpdates : Updates) => {
    return Object.assign({}, this.state.updates, newUpdates)
  };

  componentDidMount() {
    this.listenSse()
  }

  componentWillUnmount() {
    this.unlistenSse()
  }

  listenSse() {
    this.timesync = timesync.create({
      server: generalSettings.timesyncUrl,
      interval: 30000
    });

    this.pws = new PersistentWebsocket(generalSettings.liveUpdateUrl);

    const mergeUpdates = this.mergeUpdates;

    this.pws.onmessage = (e) => {
      const obj = JSON.parse(e.data);
      this.setState({updates: mergeUpdates(obj)})
    };
    this.pws.open()
  }

  unlistenSse() {
    if (this.pws) {
      this.pws.close()
    }
    if (this.timesync) {
      this.timesync.destroy()
    }
  }

  setSettings = (settings : DisplaySettings) => {
    window.sessionStorage.setItem('displaySettings', JSON.stringify(settings));
    this.setState({settings})
  };

  fieldFilter(n : number | 'all') {
    return (evt : ApiEvent) => FIELD_TYPES.includes(evt.type) && (!evt.params.field || n === 'all' || n === evt.params.field)
  }

  static audienceFilter() {
    return (evt : ApiEvent) => evt.type !== 'RANDOMIZE' && evt.type !== 'SCORE_UPDATE' && evt.type !== 'FIELD_TIMEOUT' && evt.type !== 'ALLIANCE_TIMEOUT'
  }

  getLastRelevantUpdate() {
    const effectiveSettings = this.state.settings || defaultSettings;

    const allUpdates = Object.values(this.state.updates);

    allUpdates.sort((a, b) => b.ts - a.ts);
    let filter = AudienceDisplay.audienceFilter();
    if (effectiveSettings.type === 'field') {
      filter = this.fieldFilter(effectiveSettings.field)
    }
    if (effectiveSettings.type === 'sponsor') {
      filter = (evt) => evt.type === 'SHOW_SPONSORS'
    }
    if (effectiveSettings.type === 'pit') {
      // TODO make more complex-show sponsors during elims
      filter = (evt) => evt.type === 'SHOW_RANKINGS'
    }
    const updates = allUpdates.filter(filter);
    return updates.length > 0 ? updates[0] : null
  }

  getLastRelevantTimeout() {
    const allUpdates = Object.values(this.state.updates);

    allUpdates.sort((a, b) => b.ts - a.ts);
    const updates = allUpdates.filter((u) => ['SHOW_TIMEOUT', 'FIELD_TIMEOUT', 'ALLIANCE_TIMEOUT', 'END_TIMEOUT'].includes(u.type));
    return updates.length > 0 ? updates[0] : null
  }

  getLastRelevantScore(lastUpdate : ApiEvent | null) {
    if (!lastUpdate || !LIVE_PERIODS.includes(lastUpdate.type)) return null;

    const allUpdates = Object.values(this.state.updates);

    allUpdates.sort((a, b) => b.ts - a.ts);
    const updates = allUpdates.filter((u) => u.type === 'SCORE_UPDATE' && u.params.matchName === lastUpdate.params.matchName);
    return updates.length > 0 ? updates[0] : null
  }

  render() {
    const effectiveSettings = this.state.settings || defaultSettings;
    const displayProps = {
      overlayEnabled: effectiveSettings.overlay,
      keyColor: effectiveSettings.overlayColor,
      flip: effectiveSettings.overlayFlip,
      showLiveScoring: effectiveSettings.liveScoring,
      mute: effectiveSettings.mute,
      now: this.timesync ? () => this.timesync.now() : () => new Date().getTime()
    };

    /*
    // All of these are controller-based
    type: 'audience', // Options: audience, field, pit, sponsor?
  field: 1,
  mute: false,
     */
    // TODO handle redirect
    const lastTimeout = this.getLastRelevantTimeout();
    const lastUpdate = this.getLastRelevantUpdate();
    const lastRelevantScore = this.getLastRelevantScore(lastUpdate);
    const DesiredComponent = {
      SHOW_PREVIEW: MatchInformation,
      RANDOMIZE: Randomization,
      SHOW_RANDOM: Randomization,
      SHOW_MATCH: MatchTimer,
      START_MATCH: MatchTimer,
      ABORT_MATCH: MatchTimer,
      SHOW_RESULTS: MatchResults,
      SHOW_SPONSORS: Sponsors,
      FIELD_TIMEOUT: Timeout,
      ALLIANCE_TIMEOUT: Timeout,
      SHOW_TIMEOUT: Timeout,
      END_TIMEOUT: Timeout,
      SHOW_SELECTION: AllianceSelection,
      SHOW_AWARD: Awards,
      SHOW_THIRD: Awards,
      SHOW_SECOND: Awards,
      SHOW_WINNER: Awards,
      SHOW_BRACKET: EliminationLadder,
      SHOW_MESSAGE: Message,
      SHOW_RANKINGS: Rankings,
      SHOW_BLANK: Blank,
      SHOW_VIDEO: Blank
    }[lastUpdate ? lastUpdate.type : 'SHOW_BLANK'] || Blank;

    return [
      <SettingsDialog key={'settings'} settings={this.state.settings} updateSettings={(settings) => this.setSettings(settings)} />,
      <DesiredComponent key={'blank'} {...generalSettings}
        {...(lastUpdate ? lastUpdate.params : {})}
        {...(lastTimeout ? lastTimeout.params : {})}
        {...(lastRelevantScore ? lastRelevantScore.params : {})}
        {...displayProps}
        actionType={lastUpdate ? lastUpdate.type : 'SHOW_BLANK'}
        actionTime={lastUpdate ? new Date(lastUpdate.ts) : new Date()} />
    ]
  }
}
