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
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<h2>
            <img alt="movie poster" class="poster" src="https://image.tmdb.org/t/p/original/{movie.backdrop_path}">
        </h2>
		
		<h2 class="name">Title</h2>
		<div class="information">
			<p>Year of Release</p>
			<p>runtime</p>
		</div>
		<h3 class="desc">Description</h3>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>

<style>
	.poster{
		height:260px;
		width: 350px;
	}
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
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