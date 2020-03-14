import * as React from "react";

import {storiesOf} from "@storybook/react";
import Panel from "./index";

storiesOf('layout/Panel', module)
  .add('Small', () => <div><Panel height={20} width={20} >Hello Button</Panel></div>)
  .add('Full width', () => <Panel height={20} width={100} >Hello Button</Panel>)
  .add('Full page', () => <Panel height={100} width={100} >Hello Button</Panel>);
