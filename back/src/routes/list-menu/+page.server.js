import { env } from "$env/dynamic/private";

export const load = async () => {
  // const fetchMovies = async () => {
  //   const res = await fetch(
  //     `https://api.themoviedb.org/3/movie/popular?api_key=${env.tmdb_api_key}`,
  //   );
  //   const data = await res.json();
  //   return data.results;
  // };

  const fetchUserMovies = async () => {
    const url = `${env.server_url}/movies`
    const hard_code_key = "393ffddf567de88b56534a144558ff59af5c417109b9035ab8641d98f9bd27a5"

    // ToDo: remove hard coded - api-key used for authentication
    const userData = await fetch(url, {
      headers:{
        "Content-Type": "application/json",
        "Authorization": `ApiKey ${hard_code_key}`
    }
    });
    const data = await userData.json();
    console.log(data)
    return data;
  };

  return {
    // movies: fetchMovies(),
    userMovies: fetchUserMovies(),
  };
};

// here we receive lists of movies from the GO backend
// if the list is empty we put an add button => goes to the movies page with a search OR
// just a search that finds the movie
// on select we get the form data and send it to the backend
// backend saves the data and returns the new list to the user

// get data from the clicked movie which should be stored in a movies array
// not sure how to get data from click

// send sved_list array to the search_component and add the movie clicked on to saved_list array
// send list back to backend
// the models for the backend and frontend need to be the same

// INLINE EVENT HANDLER => allows me to add the id and other data to the array that is need to update the saved_list
