<script>
  // @ts-nocheck
  import { browser } from "$app/environment";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import { gameList, guestGameList } from "../GameStore";
  import UserDataStore from "../UserDataStore";
  import { addToast } from "../../components/Toaster.svelte";
  import Icon from "@iconify/svelte";
  import {CompletedStore, guestCompletedStore} from "../CompletedTitleStore";
  import { page } from "$app/stores";
  import Title from "../../components/Title.svelte";
  import ModalTwo from "../../components/ModalTwo.svelte";
  import { createContextMenu, melt, createTooltip } from "@melt-ui/svelte";
  import { fade, blur } from "svelte/transition";

  export let data;

  $: userData = $UserDataStore;
  $: gameListItems = $gameList;
  $: guestGameListItems = $guestGameList;
  $: currentGame = {};
  $: showModal = false;

  let gameStrLength;

  // if the user is a guest we neeed to load the appropriate lists
  if (data.api_key == "00000000-0000-0000-0000-000000000000" && !data.games) {
    guestGameList.update(() => {
      if (browser) {
        // takes the saved local storage and updates the guest list to that
        let savedGames = JSON.parse(
          window.localStorage.getItem("guestGames")
        );
        return savedGames;
      }
    });
    gameListItems = $guestGameList;
    console.log($guestGameList);
  } 
  else if (data.games) {
    gameListItems = data.games;
  }

  // context menu
  const {
    elements: { menu, item, trigger },
  } = createContextMenu();

  let toggleModal = (game) => {
    currentGame = game;
    gameStrLength = currentGame.title.length;
    showModal = !showModal;
  };

  // adds list to localstorage for backup
  gameList.update(() => {
    if (browser) {
      window.localStorage.setItem("savedGames", JSON.stringify(data.games));
    }
    return data.games;
  });

  function selectGame(game) {
    currentGame = game;
  }

  async function guestRemoveTitle(id, showToast) {
    try {
      let updatedGameList = guestGameListItems.filter((obj) => obj.id !== id);
      guestGameList.update(() => {
        if (browser) {
          window.localStorage.setItem(
            "guestGames",
            JSON.stringify(updatedGameList),
          );
        }
        return updatedGameList;
      });

      if(showToast){
        addToast({
          data: {
            title: "Success",
            description: "The title was removed!",
            color: "green",
          },
          closeDelay: 5000,
          type: "foreground",
        });
      }

    } catch (error) {
      addToast({
        data: {
          title: "Error",
          description: 'The title was not removed!',
          color: "red",
        },
        closeDelay: 5000,
        type: "foreground",
      });
    }
  }

  async function guestCompletedTitle(title) {

    try{
      // add the title to the completed list
      guestCompletedStore.update((data) => {
        if (browser) {
          window.localStorage.setItem(
            "guestCompletedTitles",
            JSON.stringify([title, ...data]),
          );
        }
        return [title, ...data];
      });
      //remove it from the ongoing list
      guestRemoveTitle(title.id, false);

      addToast({
        data: {
          title: "Success",
          description: "The title was marked as complete",
          color: "green",
        },
        closeDelay: 5000,
        type: "foreground",
      });
    }
    catch(error){
      addToast({
          data: {
            title: "Error",
            description: error,
            color: "red",
          },
          closeDelay: 5000,
          type: "foreground",
      });
    }
  }


  let modalRemove = (event) => {
    showModal = false;
    removeTitle(event.detail, false);
  };

  async function removeTitle(id, showToast) {
    let updatedGameList = gameListItems.filter((obj) => obj.id !== id);

    gameList.update(() => {
      if (browser) {
        window.localStorage.setItem(
          "savedGames",
          JSON.stringify(updatedGameList),
        );
      }
      return updatedGameList;
    });

    const server_endpoint = "http://localhost:8200/games";
    let res = await fetch(server_endpoint, {
      method: "POST",
      body: JSON.stringify(updatedGameList),
      headers: {
        "Content-type": "applicaiton/json",
        Authorization: "ApiKey " + $page.data.user.apiKey,
      },
    });

    const list_data = await res.json();
    if (showToast) {
      if (res.status >= 400 && res.status < 500) {
        let update_errors = response?.error;

        addToast({
          data: {
            title: "Error",
            description: "The title was not removed",
            color: "red",
          },
          closeDelay: 5000,
          type: "foreground",
        });
      }

      addToast({
        data: {
          title: "Success",
          description: "The title was removed!",
          color: "green",
        },
        closeDelay: 5000,
        type: "foreground",
      });
    }
  }

  let modalComplete = (event) => {
    console.log("this is the event in the gamelist", event.detail);
    completedTitle(event.detail);
  };

  async function completedTitle(title) {

    if(browser){
      if(!window.localStorage.getItem('completedTitles')){
          window.localStorage.setItem('completedTitles', JSON.stringify(title))
      }
    }
    // add the title to the completed list
    CompletedStore.update((data) => {
      return [title, ...data];
    });

    window.localStorage.setItem('completedTitles', JSON.stringify($CompletedStore))
    
    //remove it from the ongoing list
    removeTitle(title.id, false);

    const updateUrl = "http://localhost:8200/completed";
    let res = await fetch(updateUrl, {
      method: "POST",
      body: JSON.stringify(title),
      headers: {
        "content-type": "application/json",
        Authorization: "ApiKey " + $page.data.user.apiKey,
      },
    });

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
        description: "Your title has been added to a completed list",
        color: "green",
      },
      closeDelay: 5000,
      type: "foreground",
    });
  }

  let width;
</script>

<svelte:window bind:innerWidth={width} />
<div class="ovr-container">
  <div class="genre-container">
    <h1 class="genre">My</h1>
    <h1 class="genre">Games</h1>
  </div>
  {#if browser}
    {#if data.api_key == "00000000-0000-0000-0000-000000000000"}
      {#if guestGameListItems && guestGameListItems.length > 0 && guestGameListItems[0] != null}
        <div class="movie-grid">
          {#each guestGameListItems as game}
            <div
              out:blur
              in:fade
              on:click={toggleModal(game)}
              on:contextmenu={selectGame(game)}
              {...$trigger}
              use:trigger
            >
              <Title title={game} titleGenre={"game"}/>
            </div>
          {/each}
        </div>
      {/if}

      <div class="context-menu" {...$menu} use:menu>
        <div
          {...$item}
          use:item
          style="color:springgreen; padding-bottom:10px; cursor:pointer;"
          on:click={guestCompletedTitle(currentGame)}
        >
          Mark as Complete
        </div>
        <div
          {...$item}
          use:item
          style="color:red; cursor:pointer;"
          on:click={guestRemoveTitle(currentGame.id, true)}
        >
          Remove Title
        </div>
      </div>
    {/if}
    <!-- && $page.data.user.apiKey -->
    {#if gameListItems && gameListItems.length > 0 && gameListItems[0] != null}
      <div class="movie-grid">
        {#each gameListItems as game}
          <div
            out:blur
            in:fade
            on:click={toggleModal(game)}
            on:contextmenu={selectGame(game)}
            {...$trigger}
            use:trigger
          >
            <Title title={game} titleGenre={"game"}/>
          </div>
        {/each}
      </div>

      <div class="context-menu" {...$menu} use:menu>
        <div
          {...$item}
          use:item
          style="color:springgreen; padding-bottom:10px; cursor:pointer;"
          on:click={completedTitle(currentGame)}
        >
          Mark as Complete
        </div>
        <div
          {...$item}
          use:item
          style="color:red; cursor:pointer;"
          on:click={removeTitle(currentGame.id, true)}
        >
          Remove Title
        </div>
      </div>
    {/if}

    <ModalTwo
      movie={currentGame}
      windowWidth={width}
      titleLength={gameStrLength}
      on:completeTitle={modalComplete}
      on:removeTitle={modalRemove}
      bind:showModal
    />

    <!-- {#if !gameListItems || gameListItems.length <= 0 || gameListItems[0] == null}
      <div class="empty-container">
        <p class="message">nothing you want to watch?</p>
        <a class="search-link" href="/search">Try adding some titles here => </a>
      </div>
    {/if} -->
  {/if}
  <a href="/game-list/search/"
    ><button class="add-movie"><Icon icon="mdi:plus" /></button></a
  >
</div>

<style lang="postcss">
  @import url("https://fonts.googleapis.com/css2?family=DotGothic16&display=swap");
  @font-face {
    src: url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,600;0,900;1,400;1,600;1,800;1,900&display=swap");
    font-family: "Rubik-Regular", sans-serif;
  }

  @font-face {
    font-family: "header-font";
    src: url("../../assets/fonts/PublicPixel.ttf");
  }

  .add-movie {
    color: #181818;
    font-size: 2rem;
    background-color: springgreen;
    border-radius: 36px;
    position: fixed;
    bottom: 1rem;
    right: 2rem;
    z-index: 10;
    box-shadow:
      0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .empty-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(2, 1fr);
    justify-items: center;
    color: springgreen;
    font-family: "DotGothic16", sans-serif;
    margin-top: 9rem;
  }

  .message {
    grid-column: 1/-1;
    grid-row: 1;
  }
  .search-link {
    grid-column: 1 / -1;
    grid-row: 2;
    margin-top: 4rem;
    padding: 10px;
    color: red;
    border-radius: 9px;
    background: midnightblue;
  }

  .movie-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(10, 1fr);
    justify-items: center;
    padding: 10px;
    height: calc(100vh - 134px)
  }

  .genre {
    grid-column: 5 / 10;
    grid-row: 3;
    font-size: 2rem;
    font-family: "header-font";
    color: springgreen;
  }

  .ovr-container {
    background: #181818;
    padding: 0.7rem;
    overflow: auto;
  }

  .genre-container {
    padding: 1rem 0 2rem 0rem;
    line-height: normal;
  }

  .context-menu {
    font-family: "DotGothic16", sans-serif;
    background-color: #181818;
    padding: 10px;
    border-radius: 5px;
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
    .ovr-container {
      background: #181818;
      padding: 2rem 6.7rem;
      overflow: auto;
      height: 100vh;
    }

    .movie-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-auto-rows: auto;
      justify-items: center;
    }

    .genre {
      font-size: 3rem;
      font-family: "header-font";
      color: springgreen;
    }

    .genre-container {
      padding: 2rem 0 3rem 1rem;
      line-height: normal;
    }

    .add-movie:hover {
      box-shadow:
        0 12px 16px 0 rgba(0, 0, 0, 0.24),
        0 17px 50px 0 rgba(0, 0, 0, 0.19);
    }
  }
</style>
