<script>
    import EmptyList from "../../components/EmptyList.svelte";


    // let movies = [1, 2, 3, 4, 5, 6, 7, 9, 10 , 11, 12];
    /**
     * @type {any}
     */
     export let data
     const movies = data.data.movies
     const error = data.data.error
     const rcode = data.data.code
     let newVar = ""
  </script>
  

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
                <!-- <img class="poster" src="https://placehold.co/300x560"> -->
                <span class="title-name"><h3>movie</h3></span> 
            </div>
            {/each}
        </div>
        {/if}
        <div>
        <EmptyList message="nothing in the box office ???" />
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

  .poster{
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

  }

  .modal{
    overflow-x: hidden;
  }
  /* .image-title{
    grid-row: 4;
  } */


  /* short ahhhh phone */
@media screen and (min-height:600px )
{
  .poster{
    height: 228px;
    border: 4px solid;
    width: 159px;
  }
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


