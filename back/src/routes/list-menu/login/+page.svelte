<script lang="ts">
    // @ts-nocheck

    export let form;
        
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
        // $: if (dialog && showModal) dialog.showModal();
    </script>
    
    
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->

        <!-- svelte-ignore a11y-no-static-element-interactions -->
    
        <div class="form-container" on:click|stopPropagation>
    
            <div class="header" style="display: flex; justify-content: space-between;">
                <p class="login-view" on:click={() => {loginView = true; signupView = false;}}>Login</p><p class="signup-view" on:click={() => {signupView = true; loginView=false;}}>/SignUp</p>
            </div>
            {#if loginView}
            <!-- show validations for form fields -->
                <form method="POST" action="?/login">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email">
                    {#if form?.errors?.email}
                        <p class="error">{form?.errors?.email}</p>
                    {/if}
    
                    <button class="btn">Login</button>
                </form>
            {/if}
            {#if signupView}
                <form method="post" action="?/register">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email">

                    <button class="btn">Register</button>
                </form>
            {/if}
        </div>

    
<style>
    @import '../../../../styles.css';
    @font-face{	
        font-family: 'header-font';
		src: url('../../../assets/fonts/PublicPixel.ttf')
    }


.form-container{
    font-family: "header-font";
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: repeat(10, auto);
    grid-template-columns: repeat(5, auto);
    align-items: center;
    justify-items: center;
    background-color: #181818;
}

.header{
    display: flex;
    text-align: center;
    grid-row: 2;
    grid-column: 1 / -1;
    padding-top: 3rem;
    color: red;
}

form{
    grid-row: 3;
    grid-column: 1 / -1;
    color: red;
}

.error{
    font-size: 0.7rem;
    color: #975151;
}
.btn{
    display: block;
    color: red;
    background-color: midnightblue;
    height: 2.5rem;
    margin-top: 3rem;
    font-family: 'header-font';
    width: 17rem;
    box-shadow: none;
}

.login-view:hover, .signup-view:hover{
    text-decoration: underline;
} 

input, label{
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
/* .dialog-pop{
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
    } */


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