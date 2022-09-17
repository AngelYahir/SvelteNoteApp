<script>
    import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
    import {auth} from '../firebase'
    import { goto } from '$app/navigation';
    import {user, isAuthenticated} from '../stores'

    const login = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const res = await signInWithPopup(auth, provider)
            $user = res.user
            $isAuthenticated = true
            goto('/notas')
        } catch (error) {
            console.error(error)
        }
    }
</script>


<div class="relative bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
  
        <div>
          <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
          </div>
        </div>
  
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div class="sm:text-center lg:text-left">
            <h1 class="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
              <span class="block xl:inline">Note 2 Note</span>
              <span class="block text-red-500 xl:inline ">Guarda tus pensamientos, estés donde estés</span>
            </h1>
            <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">Todo lo que agregue a Note 2 Note sincronizado en todos sus dispositivos mediante su cuenta de google para que sus cosas importantes estén siempre con usted.</p>
            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                {#if !$isAuthenticated}
                <button class="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" on:click={login}>
                    <div class="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg" class="mr-2" alt="google">
                        <span>
                            Acceder con Google
                        </span>
                    </div>
                </button>
                {:else}
                <a href="/notas" class="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <div class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <span>
                            ¡Comencemos!
                        </span>
                    </div>
                </a>
                {/if}
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="./images/hero-banner.jpg" alt="">
    </div>
</div>

<section class="bg-white dark:bg-gray-900">
    <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <img src="./images/hero-2.jpg" alt="">
        <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Un lugar seguro</h2>
            <p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Esta aplicación web esta hecha con la tecnologia de Google Firebase, por lo que toda te información esta segura y no tienes que preocuparte por un registro siempre que tengas una cuenta Google.</p>
        </div>
    </div>
</section>



  
  
