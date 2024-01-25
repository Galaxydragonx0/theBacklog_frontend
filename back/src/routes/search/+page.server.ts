
import { env } from '$env/dynamic/private';
import { stringify } from 'querystring';
import type Movie from "../../models/Movie";

export const prerender = false;
let query = ""
let movieArray : Movie[];
let userList : Movie[];

// on load we can probably show popular movies for easy access 

/** @type {import('./$types').PageServerLoad} */
/** @type {import('./$types').PageLoad} */
export async function load({parent}) {
    
    if (movieArray != null){
        return {movieArray};
    }


    /*
        userList = await parent();
    */
	
}


// get this data from 
function addToList(movieData : Movie){
    // add data to current list gotten from backend
    
}


/** @type {import('./$types').Actions} */
export const actions = {

    search: async ({request}) => {
        const values = await request.formData();
        const searchQuery = values.get("searchQuery")

        //santise string
        if (searchQuery != null){
            query = searchQuery.toString()
            query = query.replace(" ", "%20")
        }
        else{
            return {Falied :"There was no string in search bar"}
        }

        // call the request with the search query and send it to backend url
        const url = `${env.server_url}/movieSearch/${query}`
        
        
        // collect the response from the post request and then display results
        const res = await fetch(url)
        const data = await res.json()
       
        movieArray = data.results

        return {success: true}

    }

}





