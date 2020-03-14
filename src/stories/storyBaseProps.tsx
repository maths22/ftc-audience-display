import {BaseProps, generalSettings} from "../baseProps";

const storyBaseProps : BaseProps = Object.assign({}, generalSettings, {
  sponsorImageBase: '',
  overlayEnabled: false,
  keyColor: "#00FF00",
  flip: false,
  showLiveScoring: true,
  mute: false,
  now: () => new Date().getTime(),
  actionType: 'DUMMY_ACTION',
  actionTime: new Date()
});
export default storyBaseProps;
