import * as React from "react";

import {storiesOf} from "@storybook/react";
import ColorPicker from "./index";
import { action } from '@storybook/addon-actions';

storiesOf('settings/ColorPicker', module)
  .add('ColorPicker', () => <ColorPicker value={'#FFFF00'} onChange={action('colorPicked')}/>);
