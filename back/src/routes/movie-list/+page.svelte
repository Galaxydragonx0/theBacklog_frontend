<script>
  // @ts-nocheck
  import { browser } from "$app/environment";
  import EmptyList from "../../components/EmptyList.svelte";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import movieList from "../MovieStore";
  import UserDataStore from "../UserDataStore";
  import { addToast } from "../../components/Toaster.svelte";
  import Icon from "@iconify/svelte";
  import CompletedStore from "../CompletedTitleStore";
  import { page } from '$app/stores'



  $: userData = $UserDataStore;
  $: movieListItems = $movieList;

  // data gives us the user_data from the DB
  export let data;

  // adds list to localstorage for backup
  movieList.update(() => {
    if (browser) {
      window.localStorage.setItem("savedMovies", JSON.stringify(data.movies));
    }
    return data.movies;
  });

 
  // EMBLA SLIDES
  let emblaApi;
  emblaCarouselSvelte.globalOptions = { loop: true }
  let options = { loop: true };
  let plugins = [];

  //initalising carousel
  function onInit(event) {
    emblaApi = event.detail;
    emblaApi.on('scrollNext',scrollNext);
  }

  // scroll previous
  function scrollPrev(){
    if(emblaApi){
      if(emblaApi){
        emblaApi.scrollPrev()
      }
    }
  }
  // scroll next 
  function scrollNext(){
    if(emblaApi){
      emblaApi.scrollNext()
    }
  }

 async function removeTitle(id, showToast){

    let updatedMovieList = movieListItems.filter((obj) => obj.id !== id)
    
    movieList.update(() => {
        if (browser) {
          window.localStorage.setItem("savedMovies", JSON.stringify(updatedMovieList));
        }
        console.log(updatedMovieList)
        return updatedMovieList;
    });

    const server_endpoint = "http://localhost:8200/movies";
    let res = await fetch(server_endpoint, {
        method: "POST",
        body: JSON.stringify(updatedMovieList),
        headers: {
            "Content-type": "applicaiton/json",
            Authorization:
                "ApiKey " +
                $page.data.user.apiKey,
        },
    });

    const list_data = await res.json();
    if(showToast){
      if (res.status >= 400 && res.status < 500) {
          let update_errors = response?.error;

          addToast({
              data: {
                  title: "Error",
                  description: 'The title was not removed',
                  color: "red",
              },
              closeDelay: 5000,
              type: "foreground",
          });
      }

      
      addToast({
                data: {
                    title: "Success",
                    description: 'The title was removed!',
                    color: "green",
                },
                closeDelay: 5000,
                type: "foreground",
              });
    }    
  }

  async function  completedTitle(title){  
      // add the title to the completed list
      CompletedStore.update((data) => {
        return [title,... data]
      })
      //remove it from the ongoing list
      removeTitle(title.id, false);

      const updateUrl = "http://localhost:8200/completed"
      let res = await fetch(updateUrl, {
        method: 'POST',
        body: JSON.stringify($CompletedStore),
        headers : {
          'content-type': 'application/json',
          Authorization : 'ApiKey ' + $page.data.user.apiKey
        }
      })

      const completedRes = await res.json();

      if (res.status >= 400 && res.status < 500) {
          let update_errors = response?.error;

          addToast({
              data: {
                  title: "Error",
                  description: "Title was not marked as complete",
                  color: "red",
              },
              closeDelay: 5000,
              type: "foreground",
          });
      }
      addToast({
                data: {
                    title: "Success",
                    description: 'Your title has been added to a completed list',
                    color: "green",
                },
                closeDelay: 5000,
                type: "foreground",
              });
   
  }

</script>

<div class="ovr-container">
  <!-- -->
  {#if movieListItems && movieListItems.length > 0 && $page.data.user.apiKey}

  {/if}
</div>

<div class="backdrop">
  <div class="modal">
    <div class="title">
      <h1>Movies</h1>
    </div>
    <div>
      {#if !movieListItems || movieListItems.length <= 0}
        <EmptyList message="nothing in the box office ???" />
      {/if}
      <a href="/search">Try adding some titles here => </a>
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=DotGothic16&display=swap");
  @font-face {
    src: url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,600;0,900;1,400;1,600;1,800;1,900&display=swap");
    font-family: "Rubik-Regular", sans-serif;
  }

  .bg-img {
    grid-column: 1/-1;
    grid-row: 1;
    opacity: 0.3;
    z-index: 0;
  }

  .bg-poster-img {
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
    grid-column: 1 / -1;
    grid-row: 2;
    text-align: center;
    font-style: oblique;
    font-family: "DotGothic16", sans-serif;
    font-weight: 400;
    z-index: 2;
    padding: 0.4rem;
  }

  .title-overview {
    grid-column: 1 / -1;
    grid-row: 3 / 7;
    padding: 1rem;
    font-family: "DotGothic16", sans-serif;
    font-weight: 400;
    font-style: normal;
    z-index: 2;
  }

  .remove {
    grid-row: 4 / 7;
    grid-column: 1 / 2;
    position: absolute;
    left: 1.5rem;
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

  .info {
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
    background: linear-gradient(351deg, transparent, black);
    width: 100%;
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
    height: 15rem;
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
    .info {
      position: absolute;
      bottom: 0rem;
      border-radius: 10px;
      background-size: 100%;
      grid-column: 4;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: repeat(10, 1fr);
      display: grid;
      grid-column: 2 / -1;
      grid-row: 1 / -1;
      text-align: justify;
      height: 100vh;
      -webkit-backdrop-filter: blur(35px) saturate(1);
      /* backdrop-filter: blur(35px) saturate(1); */
      background: linear-gradient(351deg, transparent, black);
      width: 100%;
    }

    .title-name {
      grid-column: 1/-1;
      grid-row: 3;
      text-align: center;
      font-style: oblique;
      font-family: "DotGothic16", sans-serif;
      font-weight: 400;
      z-index: 2;
      padding: 0.4rem;
      font-size: 3rem;
    }

    .title-overview {
      grid-column: 1 / -1;
      grid-row: 4 / 7;
      padding: 3rem 10rem;
      font-family: "DotGothic16", sans-serif;
      font-weight: 400;
      font-style: normal;
      z-index: 2;
      font-size: 1.7rem;
    }

    .bg-img {
      grid-column: 1;
      grid-row: 1;
      opacity: 0.3;
      z-index: 0;
    }

    .remove {
      grid-row: 10;
      grid-column: 1 / 2;
      position: absolute;
      left: 10.1rem;
    }

    .completed {
      grid-row: 10;
      grid-column: 2 / 3;
      position: absolute;
      left: 10.1rem;
    }
  }
</style>
