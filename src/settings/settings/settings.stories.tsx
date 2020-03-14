import * as React from "react";

import {storiesOf} from "@storybook/react";
import Settings, {defaultSettings} from "./index";
import {action} from "@storybook/addon-actions";

storiesOf('settings/Settings', module)
  .add('Settings', () => <Settings settings={defaultSettings} updateSettings={action('settingsUpdated')}/>);
