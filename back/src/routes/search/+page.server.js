// on load we can probably show popular movies for easy access 



/** @type {import('./$types').Actions} */
export const actions = {
    search: async ({request}) => {
        const values = await request.formData();
        const searchQuery = values.get("searchQuery")

        // call the request with the search query and send it to backend url



        // collect the response from the post request and then display results
    }
}