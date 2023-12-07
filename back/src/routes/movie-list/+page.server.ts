import { env } from "$env/dynamic/private";
import { error } from '@sveltejs/kit';

export const load = async () => {
  // const fetchMovies = async () => {
  //   const res = await fetch(
  //     `https://api.themoviedb.org/3/movie/popular?api_key=${env.tmdb_api_key}`,
  //   );
  //   const data = await res.json();
  //   return data.results;
  // };
    let statusCode: number;
 

  const fetchUserMovies = async () => {
    const url = `${env.server_url}/movies`
    const hard_code_key = ""//"393ffddf567de88b56534a144558ff59af5c417109b9035ab8641d98f9bd27a5"

    // ToDo: remove hard coded - api-key used for authentication
    const userMovies = await fetch(url, {
    headers:{
        "Content-Type": "application/json",
        "Authorization": `ApiKey ${hard_code_key}`
    }
    })
    .then((res) => {
        // if (res.status == 401 || res.status == 403)
        // {
        //     throw error(401, "You are not allowed to do this ngl")
        // }
        // if(res.status >= 500)
        // {
        //     throw new Error("The server went to touch some grass, bro is better than us fr")
        // }
        if (res.status == 200){
            return res.json();
        }
        
    })
    .catch( () => {throw new Error("The server went to touch some grass, bro is better than us fr")})

   

  

    const data =  userMovies;
    return data;
    
};




    return {
        data: await fetchUserMovies(), 
      };
}
