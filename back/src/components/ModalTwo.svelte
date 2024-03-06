<script>
// @ts-nocheck

	// @ts-ignore
	export let showModal; // boolean

	// @ts-ignore
	/**
     * @type {{ poster: any; }}
     */
	 export let movie;
	// @ts-ignore
	/**
     * @type {HTMLDialogElement}
     */
	let dialog; // HTMLDialogElement

// @ts-ignore
		$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="dialog-pop"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="movie-container" on:click|stopPropagation>

        <img alt="movie poster" class="poster" src="https://image.tmdb.org/t/p/w185{movie.poster_path}">

		<h2 class="name">{movie.title}</h2>
		<div class="information">
			<p>{movie.release_date}</p>
			<!-- <p>runtime</p> -->
		</div>
		<h3 class="desc">{movie.overview}</h3>
		<!-- svelte-ignore a11y-autofocus -->
		<button class="close-button" autofocus on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>

<style>

	.dialog-pop{
		backdrop-filter: blur(10px) saturate(4);
		background-color: #181818;
		background: rgb(0 0 0 / 69%);
		border-radius: 10px;
		color: wheat;
		height: 95vh;
		width: 95vw;
	}

	.movie-container{
		 
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: repeat(18, 30px);
		grid-template-areas: 
		"image image info info"
		"image image info info"
		"image image info info"
		"desc desc desc desc";
		max-width: 25rem;
		backdrop-filter: blur(35px) saturate(1);
	}

	.movie-container > .poster{
		grid-area: image;
		height:260px;
		width: 185px;
		border-radius: 10px;
	}

	.movie-container> .information{
		grid-area: info;
		grid-row: 4
	}

	.movie-container > .name{
		grid-area: info;
		
	}

	.movie-container > .desc{
		grid-area: desc;
		grid-row: 10;
	}

	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}

	.close-button{
		grid-row: 18;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog > div {
		padding: 1em;
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	button {
		display: block;
	}
</style>