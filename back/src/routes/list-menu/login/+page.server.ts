import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from "zod";
// import type { PageServerLoad, Actions } from './$types';
export const prerender = false;

//put a load function and export it as data to the frontend 
// create a global variable to save the error or user to update the login and header functionality

let api_key = ""
let user_email : FormDataEntryValue | null;

export const actions ={
    login: async({request}) =>
    {
       
        // get data from forms
        const form_data = await request.formData();

        user_email = form_data.get('email')
        const email = user_email;

        //zod form validaiton 
        const loginSchema = zfd.formData({
            email: z.string({required_error:"Email is required"})
            .min(1, {message:'Email is required'})
            .max(64,{message:"Email must be less than 64 characters"})
            .email({message:"Must be a valid email"})
            }    
        )

        const result = loginSchema.safeParse(form_data)

        if (!result.success){
            return {
                data: Object.fromEntries(form_data),
                errors: result.error.flatten().fieldErrors
            }
        }



        let url = `${env.server_url}/login`
      
            let res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({email:email}),
            headers:{
                "Content-type":"application/json;"
            }
            }).catch((error) => {
                console.log(error)
            })

         //get back the error messages if any

        //if no auth errors get the generated key from the user 
        const user_data = await res?.json();

        //store the api key for authentication

        api_key = user_data.api_key
        throw redirect(303, "/list-menu");
    }

}