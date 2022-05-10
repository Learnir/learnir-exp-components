import { Config } from '@stencil/core';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  namespace: 'learnir-exp-module',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [inlineSvg()],
};
