import {preprocessMeltUI, sequence} from "@melt-ui/pp";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static'


const config = {
  kit: {
    adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '' : '',
  }
  },
  preprocess: sequence([vitePreprocess(), preprocessMeltUI()])
};
export default config;
