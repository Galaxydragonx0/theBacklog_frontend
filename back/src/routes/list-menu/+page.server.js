import { env } from '$env/dynamic/private';

export const load = async () => {

    const fetchMovies = async () =>{
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${env.tmdb_api_key}`)
        const data = await res.json()
        return data.results

    }
      

    return {
        movies: fetchMovies()
    }

}


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


