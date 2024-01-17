<script >
// @ts-nocheck

    import Icon from "@iconify/svelte";
    import Header from "../../../../components/Header.svelte";
    import Title from "../../../../components/Title.svelte";
    import Search from "../../../../components/Search.svelte";
    import movieList from "../../../Store";
    import ModalTwo from "../../../../components/ModalTwo.svelte";
    import { onDestroy } from "svelte";
    export let data

    // const unsub = movieList.subscribe((data) => {
    //     // testing 
    //     console.log(data)
    // })

    // onDestroy(unsub)

    let totalPages = data.totalPages
    let currentPage = parseInt(data.page_num)
    let query = data.search_query

    $: movieListItems = $movieList

    function addToList(event){
        console.log("the parent is triggered", event)
        movieListItems.push(event.detail)
        console.log(movieListItems)
    }
    
    $: currentMovie = {}
    $: showModal = false;
		
    let toggleModal = (movie) => {
        console.log(movie)
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

                <div on:click={toggleModal(movie)}>
                    <Title title={movie} on:getData={addToList}/>
                    </div>

                
            {/if}
        {/each}
    {/if}

    <ModalTwo movie={currentMovie} bind:showModal />

    
</div>




<div class="pagination">
    <!-- {#each Array(totalPages) as _, idx} -->
    {#if currentPage > 1}
        <a class="previous-page block" href="/search/{query}/{currentPage-1}"><Icon style="font-size:2rem;" icon="emojione-monotone:left-arrow" /></a>
    {/if}
    <p class="page-num block">{currentPage}</p> 
    <a class="next-page block" href="/search/{query}/{currentPage+1}"><Icon style="font-size:2rem;" icon="emojione-monotone:right-arrow" /></a>

    <!-- {/each} -->
</div>

<style>
    @import "../../../../../styles.css";
    @font-face {
        src: url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,600;0,900;1,400;1,600;1,800;1,900&display=swap");
        font-family: "Rubik-Regular", sans-serif;
    }

    .page-num{
        /* position: relative; */
        /* margin: 0; */
        padding: 0 20px 0 20px;
        font-size: 1.6rem;
        padding-top: 5px;
    }

    .previous-page{
        /* position: absolute; */
        padding-top: 9px;
        /* padding-right: 10px; */
    }

    .next-page{
        /* position: absolute; */
        padding-top: 9px;
        /* padding-left: 10px; */
    }    

    .block{
        display: inline-block;
    }

    .pagination{
        text-align: center;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 150px);
        grid-auto-rows: auto;
        justify-content: space-evenly;
        justify-items: center;

        padding-top: 2rem;
    }


    /* mobile styles */

    .search-container {
        display: grid;
        grid-auto-columns: auto;
        justify-content: space-evenly;

    }

    /* .poster-container {
        position: relative;
        margin-bottom: 43px;
    } */

    /* 
    .poster-image {
        display: block;
        height: 228px;
        border: 4px solid;
        width: 159px;
    } */

    /* .title-name {
        display: block;
        padding: 10px;
        margin-top: -16px;
        min-width: 11.25rem;
        min-height: 5rem;
    } */

    /* short ahhhh phone */
    /* @media screen and (min-height: 600px) {
        .grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: repeat(30, 20px);
        }
    } */

    /* long ahhhh phone */
    /* @media screen and (min-height: 750px) {
        .grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: repeat(30, 40px);
        }
    } */

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

        /* .poster-image {
            display: block;
            height: 14rem;
            border: 4px solid;
            width: 10rem;
        } */
    }
</style>
