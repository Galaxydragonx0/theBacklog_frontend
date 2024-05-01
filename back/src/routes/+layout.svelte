<script lang="ts">
    import { fly } from 'svelte/transition'
    import { onNavigate } from '$app/navigation';
	import Header from '../components/Header.svelte';

    onNavigate((navigation) => {
		if (!(document as any).startViewTransition) return;

		return new Promise((resolve) => {
			(document as any).startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
  
  </script>



<slot/>