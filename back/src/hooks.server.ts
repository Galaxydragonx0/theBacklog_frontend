import type {Handle} from '@sveltejs/kit';


export const handle:Handle = async ({ event, resolve }) => {
    // get cookies from browser
    const session = event.cookies.get('session')

  
    if (!session) {
      // if there is no session load page as normal
      return await resolve(event)
    }

    event.locals.user = {
      apiKey : session
    }

    return await resolve(event)
}