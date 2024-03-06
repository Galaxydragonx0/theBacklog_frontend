
// @ts-nocheck
import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from "zod";
export const prerender = false;

//put a load function and export it as data to the frontend 
// create a global variable to save the error or user to update the login and header functionality

let api_key = ""
let user_email = ""
let formErrors = {}
let auth_errors = ""
let viewPassthrough = {login : true, register: false}

export async function load() {
    let modalPassthrough = true;
    if(Object.keys(formErrors)!=0 || auth_errors){
        return {user_email, api_key, formErrors, modalPassthrough, auth_errors, viewPassthrough}
    }

    modalPassthrough = false;
    return {user_email, api_key, formErrors, modalPassthrough, auth_errors, viewPassthrough}
    
}

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
            formErrors = {
                data: Object.fromEntries(form_data),
                errors: result.error.flatten().fieldErrors
            };
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

        const response = await res.json();

        //get back the error messages if any
        if (res.status >= 400 && res.status<500){
            auth_errors = response?.error;
        }

        //if no auth errors get the generated key from the user
        //store the api key for authentication
        api_key = response.api_key
        throw redirect(303, "/list-menu");
    },


    register: async ({request}) =>
    {
        viewPassthrough = {login:false, register:true}
        const form_data = await request.formData();
        user_email = form_data.get('email');
        const email = user_email;

        //zod form validaiton 
        const registerSchema = zfd.formData({
            email: z.string({required_error:"Email is required"})
            .min(1, {message:'Email is required'})
            .max(64,{message:"Email must be less than 64 characters"})
            .email({message:"Must be a valid email"})
            }    
        )

        const result = registerSchema.safeParse(form_data)

        if (!result.success){
            formErrors = {
                data: Object.fromEntries(form_data),
                errors: result.error.flatten().fieldErrors
            };
            return {
                data: Object.fromEntries(form_data),
                errors: result.error.flatten().fieldErrors
            }
        }

        let url = `${env.server_url}/register`
        
        //call the server register endpoint 
        let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({email:email}),
        headers:{
            "Content-type":"application/json;"
        }
        })
        .catch( (error) => {
            console.log(error)
        })

        const response = await res.json();

        //get back the error messages if any
        if (res.status >= 400 && res.status<500){
            auth_errors = response?.error;
        }

        //if no auth errors get the generated key from the user 
        // store the api key for authentication
        api_key = response.api_key;
        throw redirect(303, "list-menu");
    }
}