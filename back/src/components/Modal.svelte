<script>
    export let showModal = false;

    let movies = [1, 2, 3, 4, 5, 6, 7, 9, 10 , 11, 12];
  </script>
  
{#if showModal}
  <div class="backdrop">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal" on:click|self>
      <div class="title"><h1>Movies</h1></div>
      <div class="movie grid">
        {#each movies as movie}
          <!-- svelte-ignore a11y-missing-attribute -->
          <div class="image-title">
              <img class="poster" src="">
              <span class="title-name"><h3>Movie Title</h3></span>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}



  <style>

  .backdrop{
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.8);
  }
  .modal{
    padding: 10px;
    height: 100%;
    text-align: center;
    background: white;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
  }

  .grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
    height: 250px;
    border: 10px solid;
    width: 170px;
  }

  .title-name{
    display: block;
    padding: 10px;
    margin-top: -16px;

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