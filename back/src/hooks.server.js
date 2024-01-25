

/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({error, event}) {
	
	return {
		// @ts-ignore
		message: error.message,
	};
}