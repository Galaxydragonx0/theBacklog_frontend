<script>
// @ts-nocheck

  import EmptyList from "../../components/EmptyList.svelte";
  // @ts-ignore
  import Title from "../../components/Title.svelte";
  // @ts-ignore
  import UserListTitle from "../../components/UserListTitle.svelte";
  // @ts-ignore
  import { onMount } from "svelte";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import movieList from "../Store";

  $: movieListItems = $movieList;

  let emblaApi;
  let options = { loop: true };
  // @ts-ignore
  let plugins = [];
  // @ts-ignore
  function onInit(event) {
    emblaApi = event.detail;
    console.log(emblaApi.slideNodes()); // Access API
  }

  // let movies = [1, 2, 3, 4, 5, 6, 7, 9, 10 , 11, 12];
  /**
   * @type {any}
   */
  export let data;
  // @ts-ignore
  const movies = data.data.movies;
  const error = data.data.error;
  // @ts-ignore
  const rcode = data.data.code;
</script>

<div class="ovr-container">
  {#if movieListItems && movieListItems.length > 0}
    <div class="embla" use:emblaCarouselSvelte={ options, plugins } on:emblaInit={onInit}>
      <div class="embla__container">
        {#each movieListItems as movie}
          <div class="embla__slide" style="">
            <div class="bg-img">
              <img
              class="bg-poster-img"
              alt="movie-poster"
              src="https://image.tmdb.org/t/p/original/{movie.poster_path}"
            />
            </div>
            <!-- <img
              alt="movie-poster"
              class="image"
              src="https://image.tmdb.org/t/p/w185/{movie.backdrop_path}"
            /> -->
            <div class="info">
              <h2 class="title-name">{movie.title}</h2>
              <p class="title-overview">{movie.overview}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
  <!-- {#if !movieListItems || movieListItems.length <= 0}
    <div>
      <EmptyList message="nothing in the box office ???" />
      <a href="/search">Try adding some titles here => </a>
    </div>
  {/if} -->
</div>

<div class="backdrop">
  <div class="modal">
    <div class="title">
      <h1>Movies</h1>
    </div>
    <!-- {#if !error}
        {#if movieListItems && movieListItems.length > 0}
        <div class="movie grid">
            {#each movieListItems as movie}
            svelte-ignore a11y-missing-attribute
            <div class="image-title">
                <img class="poster" src="https://image.tmdb.org/t/p/original/{movie.poster_path}">
                <span class="title-name"><h3>movie</h3></span> 
            </div> 
            {/each}
        </div>
        {/if}-->

    <div>
      {#if !movieListItems || movieListItems.length <= 0}
        <EmptyList message="nothing in the box office ???" />
      {/if}
      <a href="/search">Try adding some titles here => </a>
    </div>

    {#if error}
      <h1>
        You might want to signup, its easier to track your titles this way. Its
        only an email I promise.
      </h1>
    {/if}
  </div>
</div>

<style>
  @font-face {
    src: url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,600;0,900;1,400;1,600;1,800;1,900&display=swap");
    font-family: "Rubik-Regular", sans-serif;
  }

  .bg-img{
    grid-column: 1/-1;
    grid-row: 1;
    opacity: 0.3;
    z-index: 0;
  }

  .bg-poster-img{
    width: 100vw;
  }

  body {
    margin: 0;
  }

  .ovr-container {
    background: #181818;
  }
  .avatar {
    vertical-align: middle;
    border-radius: 50%;
    border: 2px solid black;
  }

  .title-name {
    grid-column: 1/-1;
    grid-row: 3;
    text-align: center;
    font-style: oblique;
    font-family: 'Rubik-Regular', sans-serif;
    z-index: 2;
    padding:0.4rem;
  }

  .title-overview {
    grid-column: 1/-1;
    grid-row: 5;
    padding: 1rem;
    font-family:  Arial, Helvetica, sans-serif;
    z-index: 2;
  }

  .embla {
    overflow: hidden;
    background: #181818;
  }
  .embla__container {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%; /* Each slide covers 100% of the viewport */
  }

  .info{
    position: absolute;
    bottom: 0rem;
    border-radius: 10px;
    background-size: 100%;
    grid-column: 4;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(10, 1fr);
    display: grid;
    grid-column: 1/-1;
    grid-row: 1/-1;
    height: 50vh;
    backdrop-filter: blur(35px) saturate(1);
    background: linear-gradient( 351deg, transparent, black);
  }

  .embla__slide {
    height: 100vh;
    justify-content: center;
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(5, 1fr);
    color: wheat;
    background-size: 100%;
    /* -webkit-backdrop-filter: blur(10px) saturate(180%); */
    backdrop-filter: blur(10px) saturate(1);
    /* background-color: rgba(255,255,255,.5);
    border-radius: 1rem;
    box-shadow: 0 1rem 2rem rgba(0,0,0,.3); */
    
  }

  .image {
    margin: 1rem;
    border-radius: 10px;
    grid-column: 1/-1;
    grid-row: 1;
    width: 95vw;
    z-index: 2;
  }

  a:visited {
    text-decoration: none;
  }

  .backdrop {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
  .modal {
    padding: 10px;
    height: 100%;
    text-align: center;
    background: white;
    overflow-y: auto;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 180px);
    grid-auto-rows: auto;
    justify-content: space-evenly;
    justify-items: center;
    align-content: space-evenly;
    align-items: center;
  }

  /* mobile styles */
  .title {
    height: 10%;
    width: 100%;
  }

  .modal {
    overflow-x: hidden;
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
      grid-template-columns: repeat(5, 1fr);
      grid-auto-rows: auto;
    }
  }
</style>
