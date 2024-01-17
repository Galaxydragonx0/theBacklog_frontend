<script>
// @ts-nocheck
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";
    export let title

    const dispatch = createEventDispatcher();
    function getData(){
        console.log("this is triggered")
        dispatch('getData', title)
    }

    
</script>

    
<div class="poster-container">
        <button class="add-button" on:click={getData}><Icon icon="simple-line-icons:plus" /></button>  
        <img alt="movie-poster" class="poster-image" src="https://image.tmdb.org/t/p/original/{title.poster_path}" />
        <!-- <div class="image-overlay overlay-primary"> -->
        <!-- <span class="title-name"><h3>{title.title}</h3></span> -->
        <!-- </div> -->
</div>


<style>
    
    @font-face {
        src: url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,600;0,900;1,400;1,600;1,800;1,900&display=swap");
        font-family: "Rubik-Regular", sans-serif;
    }

    .poster-container {
        position: relative;
        margin-bottom: 0.4rem;

    }

    .poster-image {
        display: block;
        height: 228px;
        border: 4px solid;
        border-radius: 10px;
        width: 159px;
    }


    .poster-image {
        display: block;
        height: 228px;
        border: 4px solid;
        width: 159px;
    }

    .add-button{
        border-radius: 8px;
        z-index: 1000;
        position: absolute;
        left: 4;   
    }

    .title-name {
        display: block;
        margin-top: -8px;
        max-width: 10.3rem;
        min-height: 6rem;
        font-family: "Rubik-Regular", sans-serif;
        font-size: 0.9rem;
    }


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

        .poster-image {
            display: block;
            height: 14rem;
            border: 4px solid;
            width: 10rem;
        }

}
</style>