// @ts-nocheck

import { env } from '$env/dynamic/private';

export const prerender = false;

let totalPages
let bookArray


export async function load({locals  , params }) {

    const { search_query, page_num } = params;

    const url = `${env.server_url}/bookSearch/${search_query}/${page_num}`
    const resp = await fetch(url)
    const data = await resp.json()

    bookArray = data
    totalPages = data.total_items

    let userData;

    if (locals.user){
        userData = locals?.user.apiKey;
    }
    else{
        userData = env.guest_api_key;
    } 
   
    // let books = bookArray.items

    if (bookArray != null) {
        return { bookArray, totalPages, search_query, page_num, userData };
    }

}










