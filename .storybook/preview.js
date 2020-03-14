import * as React from 'react';
import {addDecorator, addParameters} from '@storybook/react'
import {useState} from 'react'

const newViewports = {
  responsive: {
    name: 'Responsive',
    styles: {
      width: '100%',
      height: '100%',
    },
    type: 'desktop',
  },
  widescreen: {
    name: '16:9 720p',
    styles: {
      width: '1280px',
      height: '720px',
    },
    type: 'desktop',
  },
  traditional: {
    name: '4:3 720p',
    styles: {
      width: '960px',
      height: '720px',
    },
    type: 'desktop',
  }
}

addParameters({ viewport: {viewports: newViewports, defaultViewport: 'widescreen'} });
