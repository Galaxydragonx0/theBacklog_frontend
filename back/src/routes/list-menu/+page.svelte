<script>


	import Header from '../../components/Header.svelte';
	import Modal from '../../components/Modal.svelte';
	import {fade, slide} from 'svelte/transition';
	import { quintOut, sineIn } from 'svelte/easing';


		let bottomActive = true;
		let topActive = false;
		let navigating = false;

		let showModal = false;

		let toggleModal = () => {
		    showModal = !showModal;
		};

		export let data
		//const {movies, userMovies} = data
</script>


<Header />
<nav class="grid" id="menu">
	<!-- <div class="menu__headline">
		<span class="menu__headline-deco"></span>
		<span class="menu__headline-text"><span>Choose a project</span></span>
	</div> -->
	<a class="menu-item selected" id="title-1" href="#content-1" on:click={toggleModal}>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span class="menu-item-title1"on:mouseenter={() => {
			if(!navigating)
			{
				topActive = true;
			}
				
		}}

		on:mouseleave={() => {
			if(!navigating)
			{
				topActive = false;
			}
				
		}}>Movies</span>
	{#if topActive}
		<span in:fade={{delay:300, duration:500}} out:fade={{delay:300, duration:500}}  class="menu-deco">/</span>
		<span in:fade={{delay:300, duration:500}} out:fade={{delay:300, duration:500}}  class="menu-cta"><span>explore</span></span>
	{/if}
	</a>
	<a class="menu-item selected" id="title-2" href="#content-2">
		<span class="menu__item-title">361 KM</span>
		<span class="menu-deco">|</span>
		<span class="menu-cta"><span>explore</span></span>
	</a>
	<a class="menu-item selected" id="title-3" href="#content-3">
		<span class="menu__item-title">Moonbox</span>
		<span class="menu-deco">|</span>
		<span class="menu-cta"><span>explore</span></span>
	</a>
	<a class="menu-item selected" id="title-4" href="#content-4">
		<span class="menu__item-title">Beta Z</span>
		<span class="menu-deco">|</span>
		<span class="menu-cta"><span>explore</span></span>
	</a>
	<!-- <a class="menu-item selected" id="title-5" href="#content-5">
		<span class="menu__item-title">Pink Dream</span>
		<span class="menu__item-deco">|</span>
		<span class="menu__item-cta"><span>explore</span></span>
	</a> -->
	

	<!-- <button on:click={toggleModal}>Open Modal</button> -->
	<Modal {showModal} data={data} on:click={toggleModal} />
</nav>





<style>
    @import '../../../styles.css';
	@font-face{
		src: url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,600;0,900;1,400;1,600;1,800;1,900&display=swap');
		font-family: 'Rubik-Regular', sans-serif;
	}

   


	.grid{
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(30, 1fr);
		width: 100%;
		position: fixed;
	}

	a{
		text-decoration: none;
		font-family: 'Rubik', sans-serif;
		font-style: italic;
		font-weight: 700;
		font-size:  clamp(4rem, 7vw, 10rem);

	}


	.menu-cta{
		font-style: normal;
		font-weight: 400;
    	font-size: 1.65rem;
	}


	/* mobile styles */

	a{
		font-size: 2em;
	}

	.menu-item#title-1{
		grid-column: 3/-1;
		grid-row:3;
	}
	.menu-item#title-2{
		grid-column: 3/-1;
		grid-row:5;
	}
	.menu-item#title-3{
		grid-column: 3/-1;
		grid-row:7;
	}
	.menu-item#title-4{
		grid-column: 3/-1;
		grid-row:9;
	}

	/* .menu-cta{
		font-size: 0.75em;
	} */

	/* .menu-item#title-5{
		grid-column: 3/9;
		grid-row:11;
	} */

/* short ahhhh phone */
@media screen and (min-height:600px )
{
	.grid{
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(30, 20px);
	}

	a{
		font-size: 2em;
	}

	.menu-item#title-1{
		grid-column: 3/8;
		grid-row:4;
	}
	.menu-item#title-2{
		/* grid-column: 3/8; */
		grid-row:10;
	}
	.menu-item#title-3{
		/* grid-column: 3/8; */
		grid-row:16;
	}
	.menu-item#title-4{
		/* grid-column: 3/8; */
		grid-row:22;
	}

	.menu-item{
		margin-top: 20px;
	}
}


/* long ahhhh phone */
@media screen and (min-height:750px )
{
	.grid{
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(30, 40px);
	}

	a{
		font-size: 2.25em;
	}

	.menu-item#title-1{
		grid-column: 3/8;
		grid-row:4;
	}
	.menu-item#title-2{
		grid-column: 3/8;
		grid-row:8;
	}
	.menu-item#title-3{
		grid-column: 3/8;
		grid-row:12;
	}
	.menu-item#title-4{
		grid-column: 3/8;
		grid-row:16;
	}

	.menu-item{
		margin-top: 20px;
	}
}

	/* small tablet styles */
@media screen and (min-width: 620px){
  	a{
		font-size: 3em;
	}
}

/* large tablet & laptop styles */
@media screen and (min-width: 960px){



}

/* desktop styles */
@media screen and (min-width: 1200px){


	a{
		font-size: 6.5em;
	}

	/* .menu-cta{
		font-size: 0.3em;
	} */
}
</style>
