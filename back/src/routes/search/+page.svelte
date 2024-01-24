<script >
// @ts-nocheck

    import Header from "../../components/Header.svelte";
    import Search from "../../components/Search.svelte";

</script>

<Header />

<!-- search bar -->
<div class="search-container" style="padding-top: 1.5rem;">
    <Search />
</div>




<style>
    @import "../../../styles.css";
    @font-face {
        src: url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,600;0,900;1,400;1,600;1,800;1,900&display=swap");
        font-family: "Rubik-Regular", sans-serif;
    }



    /* mobile styles */

    .search-container {
        display: grid;
        grid-auto-columns: auto;
        justify-content: space-evenly;

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

    }
</style>
