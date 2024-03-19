import {preprocessMeltUI, sequence} from "@melt-ui/pp";
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// import adapter from '@sveltejs/adapter-static';
// //const dev = "production" === "development";
// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// kit: {
// adapter: adapter({
// pages: "docs",
// assets: "docs"
// }),
// paths: {
// // change below to your repo name
// base: "" ,
// },
// // hydrate the <div id="svelte"> element in src/app.html
// //target: "#svelte"
// }
// };
import adapter from '@sveltejs/adapter-auto';
/*@type {import('@sveltejs/kit').Config}*/
const config = {
  kit: {
    adapter: adapter()
  },
  preprocess: sequence([vitePreprocess(), preprocessMeltUI()])
};
export default config;
