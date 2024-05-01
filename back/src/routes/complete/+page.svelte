<script>
    
    import Title from '../../components/Title.svelte';
    import { guestCompletedStore } from '../CompletedTitleStore';
    import { browser } from "$app/environment";
    import { guestMovieList } from '../MovieStore';
    
    // @ts-ignore
    export let data;
    $: guestCompletedTitles = $guestCompletedStore;

    if (data.api_key == "00000000-0000-0000-0000-000000000000" && !data.compTitles) {
        guestCompletedStore.update((data) => {
        if (browser) {
            let savedMovies = JSON.parse(window.localStorage.getItem("guestCompletedTitles")|| '[]');
            return savedMovies;
        }
    });
//     movieListItems = $guestMovieList;
//     console.log($guestMovieList);
//   } else if (data.movies) {
//     movieListItems = data.movies;
  }
</script>


<div class="header">
    <h1>Completed Titles</h1>
</div>
<div class="title-grid">
{#if data.api_key == '00000000-0000-0000-0000-000000000000'}
    {#if guestCompletedTitles && guestCompletedTitles.length > 0 && guestCompletedTitles[0] != null}
        {#each guestCompletedTitles as title}
            <div class="title-container">
                <Title title={title}/>
            </div>
        {/each}
    {/if}
{:else if (data.compTitles)}
    {#each data.compTitles as title}
        <div class="title-container">
            <Title title={title}/>
        </div>
    {/each} 
{/if}
</div>



<style>
    
    /* short ahhhh phone */
    @media screen and (min-height: 600px) {
        .header{
            font-family: 'header-font';
            display: flex;
            flex-direction: column;
            font-size: 12px;
            padding-left: 19px;
            height: 11rem;
            justify-content: center;
            align-items: center;
            color: #21d4d5;
            background: #181818;
        }

        .title-grid{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: auto;
        justify-items: center;
        background-color: #181818;
        height: 100vh;
        overflow-y: hidden;
        }

        .title-container{
            padding-top:20px;
        }

    }

    /* long ahhhh phone */
    @media screen and (min-height: 750px) {

        .header{
            font-family: 'header-font';
            display: flex;
            flex-direction: column;
            font-size: 13px;
            padding-left: 32px;
            height: 9rem;
            justify-content: center;
            align-items: center;
            color: #21d4d5;
            background: #181818;
        }

        .title-grid{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;
            justify-items: center;
            background-color: #181818;
            height: 100vh;
            overflow-y: hidden;
            padding: 17px;
        }
    }


    @media screen and (min-width: 1200px) {

        .header{
            font-family: 'header-font';
            display: flex;
            flex-direction: column;
            font-size: 1.5rem;
            height: 11rem;
            justify-content: center;
            align-items: center;
            color: #21d4d5;
            background: #181818;
        }

        .title-grid{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-auto-rows: auto;
        justify-items: center;
        background-color: #181818;
        height: 100vh;
        overflow-y: hidden;
        }

        .title-container{
            padding-top:20px;
        }

    }
</style>