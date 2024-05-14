// @ts-nocheck

import { env } from '$env/dynamic/private';

export const prerender = false;

let totalPages
let showArray


// on load we can probably show popular movies for easy access 


export async function load({locals  , params }) {

    const { search_query, page_num } = params;

    const url = `${env.server_url}/showSearch/${search_query}/${page_num}`
    const resp = await fetch(url)
    const data = await resp.json()

    showArray = data.results
    totalPages = data.total_pages

    let userData;

    if (locals.user){
        userData = locals?.user.apiKey;
    }
    else{
        userData = env.guest_api_key;
    } 
   
     


    if (showArray != null) {
        return { showArray, totalPages, search_query, page_num, userData };
    }

}










