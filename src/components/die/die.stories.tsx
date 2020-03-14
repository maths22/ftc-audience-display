import * as React from "react";

import {storiesOf} from "@storybook/react";
import Die from "./index";

storiesOf('components/Die', module)
  .add('1', () => <Die number={1} />)
  .add('2', () => <Die number={2} />)
  .add('3', () => <Die number={3} />)
  .add('4', () => <Die number={4} />)
  .add('5', () => <Die number={5} />)
  .add('6', () => <Die number={6} />);
