import { writable } from "svelte/store";


const UserDataStore = writable({
    user_email:'',
    api_key:''
})


export default UserDataStore;