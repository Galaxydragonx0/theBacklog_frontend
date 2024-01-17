<script>
    import EmptyList from "../../components/EmptyList.svelte";
    import Title from "../../components/Title.svelte";
    import UserListTitle from "../../components/UserListTitle.svelte";
    import { onMount } from 'svelte';
    import emblaCarouselSvelte from 'embla-carousel-svelte'

    let emblaApi
    let options = { loop: false }

     // @ts-ignore
     function onInit(event) {
      emblaApi = event.detail
      console.log(emblaApi.slideNodes()) // Access API
    }

    // let movies = [1, 2, 3, 4, 5, 6, 7, 9, 10 , 11, 12];
    /**
     * @type {any}
     */
     export let data
     const movies = data.data.movies
     const error = data.data.error
     const rcode = data.data.code



  </script>
  
  <div   class="embla" use:emblaCarouselSvelte on:emblaInit="{onInit}">
    <div class="embla__container">
      <div class="embla__slide"><img alt="movie-poster" class="image" src="https://placehold.co/160x250" /></div>
      <div class="embla__slide"><img alt="movie-poster" class="image" src="https://placehold.co/160x250" /> <h1>If i was here where would i be</h1></div>
      <div class="embla__slide"><img alt="movie-poster" class="image" src="https://placehold.co/160x250" /></div>
      <div class="embla__slide"><img alt="movie-poster" class="image" src="https://placehold.co/160x250" /> <h1>If i was here where would i be</h1></div>
    </div>
  </div>

  <div class="backdrop">
    <div class="modal">
      <div class="title">
        <h1>Movies</h1>
      </div>
      {#if !error}
        {#if movies && movies.length > 0}
        <div class="movie grid">
            {#each movies as movie}
            <!-- svelte-ignore a11y-missing-attribute -->
            <div class="image-title">
                <img class="poster" src="https://image.tmdb.org/t/p/original/{movie.poster_path}">
                <span class="title-name"><h3>movie</h3></span> 
            </div>

              
            {/each}
        </div>
        {/if}
        <div>
        <EmptyList message="nothing in the box office ???" />
        <a href="/search">Try adding some titles here => </a>
        </div>
      {/if}
      {#if error}
    <h1>
        You might want to signup, its easier to track your titles this way. Its only an email I promise.
    </h1>
{/if}
    </div>
  </div>




  <style>

.embla {
    overflow: hidden;
  }
  .embla__container {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%; /* Each slide covers 100% of the viewport */
  }
  .embla__slide {
    height: 100vh;
    justify-content: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(5, 1fr);
  }

  .image{
    margin: auto;
    grid-column: 1/-1;
    grid-row: 1;
  }

  a:visited{
    text-decoration: none;
  }

  .backdrop{
    width: 100%;
    height: 100%;
    /* position: fixed; */
    background: rgba(0,0,0,0.8);
  }
  .modal{
    padding: 10px;
    height: 100%;
    text-align: center;
    background: white;
    /* max-height: calc(100vh - 100px); */
    overflow-y: auto;
  }

  .grid{
    display: grid;
    grid-template-columns: repeat(2, 180px);
    grid-auto-rows: auto;
    justify-content: space-evenly;
    justify-items: center;
    align-content: space-evenly;
    align-items: center;
  }



/* mobile styles */
  .title{
    height: 10%;
    width: 100%;
  }

  /* .poster{
    min-height: 14.25rem;
    border: 10px solid;
    max-width: 9.938rem;
  }

  .title-name{
    display: block;
    padding: 10px;
    margin-top: -16px;
    min-width: 11.25rem;
    min-height: 5rem;

  } */

  .modal{
    overflow-x: hidden;
  }
  /* .image-title{
    grid-row: 4;
  } */


  /* short ahhhh phone */
@media screen and (min-height:600px )
{
  /* .poster{
    height: 228px;
    border: 4px solid;
    width: 159px;
  } */
}

/* long ahhhh phone */
@media screen and (min-height:750px )
{

}


/* small tablet styles */
@media screen and (min-width: 620px){

}

/* large tablet & laptop styles */
@media screen and (min-width: 960px){



}

/* desktop styles */
@media screen and (min-width: 1200px){

  .grid{
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: auto;
  }

}
  </style>


