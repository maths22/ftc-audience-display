import * as React from "react";

import {storiesOf} from "@storybook/react";
import ScrollingTable from "./index";

storiesOf('components/ScrollingTable', module)
  .add('still', () => <ScrollingTable
    width='30vw'
    height='80vh'
    keyCol={'number'}
    columns={[
      {
        name: 'Name',
        field: 'name'
      },
      {
        name: 'Number',
        field: 'number'
      }
    ]}
    data={[
      { name: 'A great name', number: 123 },
      { name: 'A great name', number: 124 },
      { name: 'A great name', number: 125 },
      { name: 'A great name', number: 126 },
      { name: 'A great name', number: 127 },
      { name: 'A great name', number: 128 },
      { name: 'A great name', number: 129 },
      { name: 'A great name', number: 130 },
      { name: 'A great name', number: 131 }
    ]} />
  )
  .add('scrolling', () => <ScrollingTable
    width='30vw'
    height='80vh'
    keyCol={'number'}
    columns={[
      {
        name: 'Name',
        field: 'name'
      },
      {
        name: 'Number',
        field: 'number'
      }
    ]}
    data={[
      { name: 'A great name', number: 123 },
      { name: 'A great name', number: 124 },
      { name: 'A great name', number: 125 },
      { name: 'A great name', number: 126 },
      { name: 'A great name', number: 127 },
      { name: 'A great name', number: 128 },
      { name: 'A great name', number: 129 },
      { name: 'A great name', number: 130 },
      { name: 'A great name', number: 131 },
      { name: 'A great name', number: 132 },
      { name: 'A great name', number: 133 },
      { name: 'A great name', number: 134 },
      { name: 'A great name', number: 135 },
      { name: 'A great name', number: 136 },
      { name: 'A great name', number: 137 },
      { name: 'A great name', number: 138 },
      { name: 'A great name', number: 139 },
      { name: 'A great name', number: 140 },
      { name: 'A great name', number: 141 },
      { name: 'A great name', number: 142 },
      { name: 'A great name', number: 143 },
      { name: 'A great name', number: 144 },
      { name: 'A great name', number: 145 }
    ]} />
  );
