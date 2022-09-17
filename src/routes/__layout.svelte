<script>
    import '../app.css'
    import "flowbite/dist/flowbite.css"
    import "toastify-js/src/toastify.css"
    import {signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
    import {auth} from '../firebase'
    import {user, isAuthenticated} from '../stores'
    import { goto } from '$app/navigation';

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

    const logout = async () => {
        await signOut(auth)
        $user = {}
        $isAuthenticated = false
        goto('/')
    }

    onAuthStateChanged(auth, authUser => {
        $user = authUser;
        $isAuthenticated = !!authUser
    })


</script>

<nav class="bg-white border-gray-200 px-1 sm:px-2 py-1 rounded dark:bg-gray-900 sticky top-0 z-30">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a href="/" class="flex items-center">
          <img src='./images/logo.png' class="mr-3 h-6 sm:h-9" alt="note2note" />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Note2Note</span>
      </a>
      <div  id="navbar-default">
        <ul class="flex items-center bg-gray-50 border border-gray-100 sm:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <a href="/" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Inicio</a>
          </li>
          <li>
            <a href="/notas" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Notas</a>
          </li>

          {#if $isAuthenticated}
            <li>
                <a href="/profile" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Perfil</a>
            </li>
            <li>
                <button class="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" on:click={logout}>
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Cerrar Sesión
                    </span>
                </button>
            </li>
          {:else}
            <li>
                <button class="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" on:click={login}>
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Iniciar Sesión
                    </span>
                </button>
            </li>
          {/if}
        </ul>
      </div>
    </div>
  </nav>


    <slot/>
