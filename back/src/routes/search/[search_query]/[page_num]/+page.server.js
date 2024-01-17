// @ts-nocheck

import { env } from '$env/dynamic/private';
import { stringify } from 'querystring';
import Movie from "../../../../models/Movie";
import { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const prerender = false;
let queryValue = ""
let totalPages 
let movieArray 
let userList 

// on load we can probably show popular movies for easy access 


export async function load({params}) {
    
    const {search_query, page_num}  = params;
    
    const url = `${env.server_url}/movieSearch/${search_query}/${page_num}`
    const resp = await fetch(url)
    const data = await resp.json()

    movieArray = data.results
    totalPages = data.total_pages
    

    if (movieArray != null){
        return {movieArray, totalPages, search_query, page_num};
    }
	
}










