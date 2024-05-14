// @ts-ignore
import { json, text } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';


// @ts-ignore
export async function POST({ request, url }) {
    let {pageNum, searchValue} = request.json()

    
    //sanitise string
    if (searchValue != null){
        let query = searchValue.toString()
        searchValue = query.replace(" ", "%20")
    }
    else{
        return {Falied :"There was no string in search bar"}
    }

    // call the request with the search query and send it to backend url
    const api_url = `${env.server_url}/movieSearch/${searchValue}-${pageNum}`
    
    
    // collect the response from the post request and then display results
    const res = await fetch(url)
    const data = await res.json()
   
    return data.results;
}