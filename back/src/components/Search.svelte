<script>
    // @ts-nocheck
    import { goto } from "$app/navigation";
    import Icon from "@iconify/svelte";

    let searchValue = "";
    let pageNum = "1";
    const handleSearch = () => {
        goto(`/search/${searchValue}/${pageNum}`);
    };
</script>

<!-- search bar -->
<form class="search-bar" on:submit|preventDefault={() => handleSearch}>
    <input class="bar" type="text" bind:value={searchValue} />
    <button class="search-button" type="submit" on:click={() => handleSearch()}>
        <Icon icon="pixelarticons:search" />
    </button>
</form>

<style>
    .search-bar {
        grid-column: 1/-1;
        grid-row: 4;
        padding-left: 0.85rem;
        position: relative;
        /* width: 18rem; */
    }

    .search-button {
        all: unset;
        min-height: 1.84rem;
        position: absolute;
        font-size: 2.3rem;
        padding-left: 0.5rem;
        right: -3rem;
        color: springgreen;
    }

    .bar {
        min-width: 30rem;
        min-height: 2.5rem;
        border-radius: 10px;
        background-color: black;
        color: springgreen;
        font-family: "DotGothic16";
        letter-spacing: 0.1rem;
        padding: 0 5px 0 5px;
    }
</style>
