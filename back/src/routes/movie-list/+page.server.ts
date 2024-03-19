import { env } from "$env/dynamic/private";
import { error, type HttpError } from '@sveltejs/kit';
import movieList from "../MovieStore";


type loadError = {
    status : number,
    message : string
}

export const load = async () => {

    
// const fetchUserMovies = async () => {

    const url = `${env.server_url}/getMovies`
    const hard_code_key = "5bce80b794bc568ac2189e28a8a340b08e3c5e02b3d18f82e4d46d12750a3735"


    // ToDo: remove hard coded - api-key used for authentication
    let movies = await fetch(url, {
    method: 'GET',
    headers:{
        "Content-Type": "application/json",
        "Authorization": `ApiKey ${hard_code_key}`
    }
    })
    .then((requestResponse) => {
        if (requestResponse.status == 401 || requestResponse.status == 403)
        {
            throw error(requestResponse.status, "You are not allowed to do this ngl");
        }
        if(requestResponse.status >= 500)
        {
            throw error(500,"The server went to touch some grass, bro is better than us fr")
        }
        if (requestResponse.status == 200){
            return requestResponse.json();
        }
        
    })

    // console.log(movies);

// };

return {movies};
}
