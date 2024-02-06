<script>
    import Icon from "@iconify/svelte";
    import Login from "../components/Login.svelte"

        $: showModal = false;
		
        let toggleModal = () => {
            // console.log(movie)
            // currentMovie = movie;
            showModal = !showModal;
        };
</script>

<header>
    <h1 class="the">the</h1>
    <h1 class="backlog">Backlog</h1>

    <button on:click={toggleModal} class="login">
        <span >
            <Icon class="avatar" icon="carbon:user-avatar-filled-alt" />
        </span>
        <Login showModal={showModal} />
    </button>

</header>


<style>

    @font-face{
		font-family: 'header-font';
		src: url('../../assets/fonts/PublicPixel.ttf')
	}



    header
    {
        background: #181818;
        padding: 1rem;
        padding-top: 2rem;
    }

    h1
    {
        color: red;
        font-family: 'header-font';
        margin: 0;
        text-align: start;
        font-size: 2.2rem;
    }

    /* short ahhhh phone */
    @media screen and (min-height:600px )
    {
        h1
        {
            font-size: 1.4rem;
        }
    }

    /* long ahhhh phone */
    @media screen and (min-height:750px )
    {
        h1
        {
            font-size: 2em;
        }

        .login{
        color: wheat;
        position: absolute;
        top: 2rem;
        right: 1rem;
        height: 4rem;
        width: 4rem;
        border: none;
        border-radius: 25px;
        font-family: "header-font";
        font-size: 2rem;
        font-weight: 550;
        text-align: center;
        overflow: hidden;
        background-color: #181818;
        }

    }


    /* small tablet styles */
    @media screen and (min-width: 620px){

    }

    /* large tablet & laptop styles */
    @media screen and (min-width: 960px){



    }

    /* desktop styles */
    @media screen and (min-width: 1200px){

        h1
        {
            font-size: 3.5rem;
        }

        .login{
        color: wheat;
        position: absolute;
        top: 5rem;
        right: 7rem;
        height: 4rem;
        width: 4rem;
        border: none;
        border-radius: 25px;
        font-family: "header-font";
        font-size: 3rem;
        font-weight: 550;
        text-align: center;
        overflow: hidden;
        background-color: #181818;
        }

        .login:hover span {
            display: none;
        }

        .login:hover {
            width: 20rem;
            transition: width 800ms;
        }

        .login::after {
            content: "";
            width: 160px;
            display: none;
        }

        .login:hover::before {
            content: "Login/Sign-Up";
            display: inline-block;
            font-size: 1rem;
        }

        .login:hover,
        .login:focus {
            animation: raise 2s;
            box-shadow: 0 0 0 2em transparent;
        }

    }


</style>
