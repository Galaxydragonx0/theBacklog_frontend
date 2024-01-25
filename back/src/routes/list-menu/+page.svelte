<script>

	import Header from '../../components/Header.svelte';
	import {fade, slide} from 'svelte/transition';

	let topActive = false;

</script>

<Header/>
<nav class="grid" id="menu">
	<a class="menu-item selected" id="title-1" href="/movie-list">
		<span class="menu-item-title1">Movies</span>
	{#if topActive}
		<span in:fade={{delay:300, duration:500}} class="menu-deco">/</span>
		<span in:fade={{delay:300, duration:500}} class="menu-cta"><span>explore</span></span>
	{/if}
	</a>
	<a class="menu-item selected" id="title-2" href="#content-2">
		<span class="menu__item-title">Shows</span>
		<!-- <span class="menu-deco">|</span>
		<span class="menu-cta"><span>explore</span> -->
	</a>
	<a class="menu-item selected" id="title-3" href="#content-3">
		<span class="menu__item-title">Games</span>
		<!-- <span class="menu-deco">|</span>
		<span class="menu-cta"><span>explore</span> -->
	</a>
	<a class="menu-item selected" id="title-4" href="#content-4">
		<span class="menu__item-title">Books</span>
		<!-- <span class="menu-deco">|</span>
		<span class="menu-cta"><span>explore</span></span> -->
	</a>
</nav>


<style>
    
	@import '../../../styles.css';
	
	@font-face{
		src: url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,600;0,900;1,400;1,600;1,800;1,900&display=swap');
		font-family: 'Rubik-Regular', sans-serif;
	}

	@font-face{
		font-family: 'header-font';
		src: url('../../assets/fonts/PublicPixel.ttf')
	}


	.grid{
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(30, 1fr);
		width: 100%;
		position: fixed;
		background-color: #181818;
	}

	a{
		text-decoration: none;
		font-family: 'Rubik-Regular', sans-serif;
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

	.menu-item{
		color: wheat;
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
		grid-column: 8/13;
		grid-row:14;
	}
	.menu-item#title-2{
		grid-column: 8/13;
		grid-row:17;
	}
	.menu-item#title-3{
		grid-column: 8/13;
		grid-row:20;
	}
	.menu-item#title-4{
		grid-column: 8/13;
		grid-row:23;
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
		font-size: 3.25em;
	}

	.menu-item#title-1{
		grid-column: 6/13;
		grid-row:8;
	}
	.menu-item#title-2{
		grid-column: 6/13;
		grid-row:10;
	}
	.menu-item#title-3{
		grid-column: 6/13;
		grid-row:12;
	}
	.menu-item#title-4{
		grid-column: 6/13;
		grid-row:14;
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

	.menu-item#title-1{
		grid-column: 9/13;
		grid-row:8;
	}
	.menu-item#title-2{
		grid-column: 9/13;
		grid-row:11;
	}
	.menu-item#title-3{
		grid-column: 9/13;
		grid-row:14;
	}
	.menu-item#title-4{
		grid-column: 9/13;
		grid-row:17;
	}

	.menu-item{
		margin-top: 20px;
	}

	a:after {
		content: '»';
		text-shadow: 10px 2px #7b1f1f;
		grid-row:inherit;
		grid-column: 10/12;
		position: absolute;
		opacity: 0;  
		top: 14px;
		right: -20px;
		transition: 0.5s;
		padding-right:2.5rem
	}

	a:hover{
		padding-right: 24px;
		padding-left:8px;
		text-shadow: 10px 2px #7b1f1f;
	}

	a:hover:after {
		opacity: 1;
		right: 10px;
	}

}
</style>
