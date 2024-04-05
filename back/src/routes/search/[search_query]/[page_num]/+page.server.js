// @ts-nocheck

import { env } from '$env/dynamic/private';
import UserDataStore from '../../../UserDataStore';

export const prerender = false;

let totalPages
let movieArray


// on load we can probably show popular movies for easy access 


export async function load({locals  , params }) {

    const { search_query, page_num } = params;

    const url = `${env.server_url}/movieSearch/${search_query}/${page_num}`
    const resp = await fetch(url)
    const data = await resp.json()

    movieArray = data.results
    totalPages = data.total_pages

    let userData = locals.user.apiKey


    if (movieArray != null) {
        return { movieArray, totalPages, search_query, page_num, userData };
    }

}










