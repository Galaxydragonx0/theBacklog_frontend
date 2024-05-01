import type { LayoutServerLoad } from './$types'
import { env } from '$env/dynamic/private';
import { fail, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from "zod";


let api_key = ""
let user_email = ""
let formErrors = {}
let auth_errors = {status : -1, error: ''};
let viewPassthrough = {login: true, register: false}

export const load: LayoutServerLoad = async ({ locals}) => {
    return {
      user: locals.user,

    }
  }


