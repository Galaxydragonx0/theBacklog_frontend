<script>
    import Icon from "@iconify/svelte";
    import Header from "../../components/Header.svelte";

    export let data;

    function showText() {}
</script>

<Header />

<!-- search bar -->
<div class="search-container" style="padding-top: 1.5rem;">
    <form class="search-bar" method="post">
        <input class="bar" type="text" name="searchQuery" />
        <button formaction="?/search" class="search-button" type="submit"
            ><Icon icon="pixelarticons:search" /></button
        >
    </form>
</div>
<div on:touchstart class="grid">
    {#if data.movieArray}
        {#each data.movieArray as movie}
            {#if movie.poster_path}
                <!-- on:click={(movie) => {addToList(movie)}} -->
            <div  class="poster-container">
                    <img
                        alt="movie-poster"
                        class="poster-image"
                        src="https://image.tmdb.org/t/p/original/{movie.poster_path}"
                    />
                    <!-- <span class="title-name"><h3>{movie.title}</h3></span> -->
                    <div class="image-overlay overlay-primary">
                        <div class="image-title">{movie.title}</div>
                    </div>
                </div>
            {/if}
        {/each}
    {/if}
</div>

<style>
    @import "../../../styles.css";
    @font-face {
        src: url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,600;0,900;1,400;1,600;1,800;1,900&display=swap");
        font-family: "Rubik-Regular", sans-serif;
    }

    .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        color: #ffffff;
        font-family: "Quicksand", sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.25s;
        text-align: center;
    }

    .overlay-primary {
        backdrop-filter: blur(1px);
    }

    .image-overlay > * {
        transform: translateY(13px);
        transition: transform 0.25s;
    }

    .image-overlay:active {
        opacity: 1;
    }

    .image-overlay:active > * {
        transform: translateY(0);
    }

    .image-overlay:hover {
        opacity: 1;
    }

    .image-overlay:hover > * {
        transform: translateY(0);
    }

    .image-title {
        /* font-size: 2em; */
        font-weight: bold;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 180px);
        grid-auto-rows: auto;
        justify-content: space-evenly;
        justify-items: center;
        align-content: space-evenly;
        align-items: center;
        text-align: center;
        padding-top: 2rem;
    }

    .bar {
        grid-row: 2;
        grid-column: 1/13;
        min-width: 15rem;
        min-height: 1.5rem;
        border: 2px solid black;
        border-radius: 10px;
    }

    .search-button {
        all: unset;
        min-height: 1.84rem;
        position: absolute;
        font-size: 1.7rem;
        padding-left: 0.5rem;
        right: 0.6rem;
    }

    /* mobile styles */

    .search-container {
        display: grid;
        grid-auto-columns: auto;
        justify-content: space-evenly;

    }
    .search-bar {
        padding-left: 0.85rem;
        position: relative;
        width: 18rem;
    }

    .poster-container {
        position: relative;
        margin-bottom: 43px;
    }

    .poster-image {
        display: block;
        height: 228px;
        border: 4px solid;
        width: 159px;
    }

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

        .poster-image {
            display: block;
            height: 14rem;
            border: 4px solid;
            width: 10rem;
        }
    }
</style>
