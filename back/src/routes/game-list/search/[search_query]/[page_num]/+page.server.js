// @ts-nocheck

import { env } from '$env/dynamic/private';

export const prerender = false;

let totalPages
let gameArray


export async function load({locals  , params }) {

    const { search_query, page_num } = params;

    const url = `${env.server_url}/gameSearch/${search_query}/${page_num}`
    const resp = await fetch(url)
    const data = await resp.json()

    gameArray = data
    totalPages = data.total_pages

    let userData;

    if (locals.user){
        userData = locals?.user.apiKey;
    }
    else{
        userData = env.guest_api_key;
    } 
   
     


    if (gameArray != null) {
        return { gameArray, totalPages, search_query, page_num, userData };
    }

}










