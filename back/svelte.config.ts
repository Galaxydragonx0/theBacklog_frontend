import {preprocessMeltUI, sequence} from "@melt-ui/pp";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';
import { prerendered } from "$service-worker";

const config = {
    kit: {
      adapter: adapter(),
      prerendered: {
        handleHttpError: 'warn',
        entries : Array<'*' | `/${string}`>
      }
    },
    preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
}

export default config;
// 