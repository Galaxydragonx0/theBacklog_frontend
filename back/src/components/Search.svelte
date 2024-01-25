<script >
    // @ts-nocheck
        import { goto } from '$app/navigation';
        import Icon from "@iconify/svelte";

        let searchValue = '';
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
        padding-left: 0.85rem;
        position: relative;
        width: 18rem;
    }

    .search-button {
        all: unset;
        min-height: 1.84rem;
        position: absolute;
        font-size: 1.7rem;
        padding-left: 0.5rem;
        right: 0.6rem;
    }

    
    .bar {
        grid-row: 2;
        grid-column: 1/13;
        min-width: 15rem;
        min-height: 1.5rem;
        border: 2px solid black;
        border-radius: 10px;
    }
</style>