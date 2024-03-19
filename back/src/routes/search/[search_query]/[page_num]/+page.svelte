<script>
    // @ts-nocheck

    import Icon from "@iconify/svelte";
    import Header from "../../../../components/Header.svelte";
    import Title from "../../../../components/Title.svelte";
    import Search from "../../../../components/Search.svelte";
    import movieList from "../../../MovieStore";
    import UserDataStore from "../../../UserDataStore";
    import ModalTwo from "../../../../components/ModalTwo.svelte";
    import { onDestroy } from "svelte";
    import { addToast } from "../../../../components/Toaster.svelte";
    import { createToaster } from "@melt-ui/svelte";

    export let data;

    let totalPages = data.totalPages;
    $: currentPage = parseInt(data.page_num);
    $: query = data.search_query;

    // TODO
    // BUG -> the list is reset and updated if the user refershes the page on the search and then just joins here even with login

    // we use the update function to let the store be updated
    function addToList(event) {

        movieList.update((data) => {
            if ($movieList.length == 0) {
                let currentMovies = localStorage.getItem("savedMovies");
                return [event.detail, ... JSON.parse(currentMovies)]
            }
            return [event.detail, ...data];
        });
        console.log($movieList);

        //get api key for the user to send request for auth
        let api_key = "";
        UserDataStore.subscribe((storeData) => {
            // check if this exists if not tell the user to login
            if (storeData.api_key) {
                api_key = storeData.api_key;
            } else {
                addToast({
                    data: {
                        title: "Warning",
                        description: "Please login to add titles!",
                        color: "yellow",
                    },
                    closeDelay: 5000,
                    type: "foreground",
                });
            }
        });

        // send request to backend
        const movieListUnsub = movieList.subscribe(async (newTitle) => {
            const server_endpoint = "http://localhost:8200/movies";
            let res = await fetch(server_endpoint, {
                method: "POST",
                body: JSON.stringify(newTitle),
                headers: {
                    "Content-type": "applicaiton/json",
                    Authorization:
                        "ApiKey " +
                        "5bce80b794bc568ac2189e28a8a340b08e3c5e02b3d18f82e4d46d12750a3735",
                },
            });

            const list_data = await res.json();

            if (res.status >= 400 && res.status < 500) {
                let update_errors = response?.error;

                addToast({
                    data: {
                        title: "Error",
                        description: update_errors,
                        color: "red",
                    },
                    closeDelay: 5000,
                    type: "foreground",
                });
            }
            // this is needs to be error handled and displayed to the user
            // gets the correct errors already
            // console.log(list_data);
        });

        onDestroy(movieListUnsub);
    }

    $: currentMovie = {};
    $: showModal = false;

    let toggleModal = (movie) => {
        currentMovie = movie;
        showModal = !showModal;
    };
</script>

<Header />

<!-- search bar -->
<div class="search-container" style="padding-top: 1.5rem;">
    <Search />
</div>
<div class="grid">
    {#if data.movieArray}
        {#each data.movieArray as movie}
            {#if movie.poster_path}
                <!-- <button class="add-button" on:click={addToList(movie)}><Icon icon="simple-line-icons:plus" /></button>   -->
                <div class="title-container" on:click={toggleModal(movie)}>
                    <Title title={movie} on:getData={addToList} />
                </div>
            {/if}
        {/each}
    {/if}

    <ModalTwo movie={currentMovie} bind:showModal />
</div>

<div class="pagination">
    <!-- {#each Array(totalPages) as _, idx} -->
    {#if currentPage > 1}
        <a
            class="previous-page block"
            href="/search/{query}/{currentPage - parseInt('1')}"
            ><Icon
                style="font-size:2rem;"
                icon="emojione-monotone:left-arrow"
            /></a
        >
    {/if}
    <p class="page-num block">{currentPage}</p>
    <a
        class="next-page block"
        href="/search/{query}/{currentPage + parseInt('1')}"
        ><Icon
            style="font-size:2rem;"
            icon="emojione-monotone:right-arrow"
        /></a
    >

    <!-- {/each} -->
</div>

<style>
    @import "../../../../../styles.css";
    @font-face {
        src: url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,600;0,900;1,400;1,600;1,800;1,900&display=swap");
        font-family: "Rubik-Regular", sans-serif;
    }

    .title-container {
        position: relative;
    }

    .add-button {
        border-radius: 8px;
        z-index: 1000;
        position: absolute;
        left: 4;
    }

    .page-num {
        padding: 0 20px 0 20px;
        font-size: 1.6rem;
        padding-top: 5px;
        color: wheat;
    }

    .previous-page {
        padding-top: 9px;
    }

    .next-page {
        padding-top: 9px;
    }

    .block {
        display: inline-block;
    }

    .pagination {
        text-align: center;
        background-color: #181818;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 125px);
        grid-auto-rows: auto;
        justify-content: space-evenly;
        justify-items: center;
        padding-top: 2rem;
        background-color: #181818;
    }

    /* mobile styles */

    .search-container {
        display: grid;
        grid-auto-columns: auto;
        justify-content: space-evenly;
        background-color: #181818;
    }

    /* short ahhhh phone */
    @media screen and (min-height: 600px) {
    }

    /* long ahhhh phone */
    @media screen and (min-height: 750px) {
    }

    /* small tablet styles */
    @media screen and (min-width: 620px) {
    }

    /* large tablet & laptop styles */
    @media screen and (min-width: 960px) {
    }

    /* desktop styles */
    @media screen and (min-width: 1200px) {
        .grid {
            grid-template-columns: repeat(9, 1fr);
            grid-auto-rows: auto;
        }
    }
</style>
