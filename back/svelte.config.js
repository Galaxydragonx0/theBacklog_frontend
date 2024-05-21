import {preprocessMeltUI, sequence} from "@melt-ui/pp";
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import adapter from '@sveltejs/adapter-auto';
/*@type {import('@sveltejs/kit').Config}*/
const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '' : '',
  }
  },
  preprocess: sequence([vitePreprocess(), preprocessMeltUI()])
};
export default config;
