import * as React from "react";

import {storiesOf} from "@storybook/react";
import PrimaryLayout from "./index";
import Heading from "../../components/heading";

storiesOf('layout/Primary', module)
  .add('Empty', () => <PrimaryLayout bodyFlex="content" heading={''} footer={''} />)
  .add('Heading', () => <PrimaryLayout bodyFlex="content" heading={<Heading align={'center'} size={70}>Test heading</Heading>} footer={<Heading align={'center'} size={70}>Test footer</Heading>} />)
  .add('Scrolling heading', () => <PrimaryLayout bodyFlex="content"  heading={<Heading align={'center'} size={70}>Test heading Test heading Test heading Test heading Test heading Test heading Test heading Test heading Test heading</Heading>} footer={<Heading align={'center'} size={70}>Test footer</Heading>} />);
