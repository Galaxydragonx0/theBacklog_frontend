import {preprocessMeltUI, sequence} from "@melt-ui/pp";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static'


const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: process.argv.includes('dev') ?  '' : process.env.BASE_PATH,
    },
    prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore deliberate link to shiny 404 page
				if (path === '/not-found' && referrer === '/blog/how-we-built-our-404-page') {
					return;
				}

				// otherwise fail the build
				throw new Error(message);
			}}
  },
  preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
  
};
export default config;
