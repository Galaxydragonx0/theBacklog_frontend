<script>
	// @ts-ignore
	export let showModal; // boolean


	// @ts-ignore
	/**
     * @type {HTMLDialogElement}
     */
	let dialog;
    
    // @ts-ignore
    $: loginView=true
    $: signupView = false;

    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher()

    function login(){
        console.log("this is triggered")
        dispatch('login')
    }

    // @ts-ignore
    $: if (dialog && showModal) dialog.showModal();
</script>


<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="dialog-pop"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => {loginView=true; signupView=false; dialog.close();}}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->

    <div class="form-container" on:click|stopPropagation>

        <div class="header" style="display: flex; justify-content: space-between;">
            <p class="login-view" on:click={() => {loginView = true; signupView = false;}}>Login</p><p class="signup-view" on:click={() => {signupView = true; loginView=false;}}>/SignUp</p>
        </div>
        {#if loginView}
            <label for="email">Email</label>
            <input type="text" id="email">
            
            <label for="pwd">Password</label>
            <input type="text" id="pwd">
        {/if}
        {#if signupView}
            <label for="email">Email</label>
            <input type="text" id="email">
            
            <label for="pwd">Password</label>
            <input type="text" id="pwd">

            <label for="confirm-pwd">Confirm Password</label>
            <input type="text" id="confirm-pwd">
        {/if}
    </div>
</dialog>

<style>

.login-view:hover, .signup-view:hover{
    text-decoration: underline;
} 

.header{
    padding-bottom: 7rem;
}

input, label, .form-container{
    display: block;
}

p{
    font-size: 1.5rem;
}

input{
    width: 16rem;
    height: 1.5rem;
    margin-bottom: 1.5rem;
}

label{
    font-size: 1.2rem;
    text-align: left;
    padding-bottom: 0.5rem;
}
.dialog-pop{
		backdrop-filter: blur(10px) saturate(4);
		background-color: #181818;
		background: rgb(0 0 0 / 69%);
		border-radius: 10px;
		color: wheat;
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


     /* short ahhhh phone */
     @media screen and (min-height:600px )
    {

    }

    /* long ahhhh phone */
    @media screen and (min-height:750px )
    {

    }


    /* small tablet styles */
    @media screen and (min-width: 620px){

    }

    /* large tablet & laptop styles */
    @media screen and (min-width: 960px){



    }

    /* desktop styles */
    @media screen and (min-width: 1200px){
        p{
            font-size: 2rem;
        }

    }
</style>