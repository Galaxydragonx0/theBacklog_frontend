import { writable } from "svelte/store";
import UserDataStore from "./UserDataStore";
import { onDestroy } from "svelte";


let api_key = '';
UserDataStore.subscribe((storeData) =>
{
    // check if this exists if not tell the user to login
    api_key = storeData.api_key;
});


const movieList = writable([]);


// const movieListUnsub = movieList.subscribe(async (list) => {
//     const server_endpoint = 'http://localhost:8200/movies'
//     let res = await fetch(server_endpoint, {
//         method: 'POST',
//         body: JSON.stringify(list),
//         headers:{
//             'Content-type':"applicaiton/json",
//             'Authorization': 'ApiKey ' + '5bce80b794bc568ac2189e28a8a340b08e3c5e02b3d18f82e4d46d12750a3735'
//         }
//     })

//     const list_data = await res.json()

//     if (res.status >= 400 && res.status<500){
//         console.log('error occured here')
//         // let update_errors = response?.error;

//         // addToast({
//         //     data: {
//         //         title: 'Error',
//         //         description: update_errors,
//         //         color: 'red',
//         //     },
//         //     closeDelay:5000,
//         //     type:"foreground",
//         //     })

//     }
//     // this is needs to be error handled and displayed to the user 
//     // gets the correct errors already
//     console.log(list_data);

// })

// onDestroy(movieListUnsub);


// movie model
/*
    BASICALLY EVERYTHING FOR THE DESC MODAL 
    poster img link
    bg img link
    title name 
    description
*/ 


export default movieList;