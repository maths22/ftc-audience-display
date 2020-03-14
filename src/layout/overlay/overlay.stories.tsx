import * as React from "react";

import {storiesOf} from "@storybook/react";
import OverlayLayout from "./index";
import Heading from "../../components/heading";

storiesOf('layout/Overlay', module)
  .add('Empty', () => <OverlayLayout heading={''} footer={''}/>)
  .add('Heading', () => <OverlayLayout heading={<Heading align={'center'} size={40}>Test heading</Heading>} footer={<Heading align={'center'} size={40}>Test footer</Heading>} />)
  .add('Fipped Heading', () => <OverlayLayout heading={<Heading align={'center'} size={40}>Test heading</Heading>} flip footer={<Heading align={'center'} size={40}>Test footer</Heading>} />)
  .add('Scrolling heading', () => <OverlayLayout heading={<Heading align={'center'} size={40}>Test heading Test heading Test heading Test heading Test heading Test heading Test heading Test heading Test heading</Heading>} footer={<Heading align={'center'} size={40}>Test footer</Heading>} />);
