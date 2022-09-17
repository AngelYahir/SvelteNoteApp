<script>
    import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
    import {auth} from '../firebase'
    import { isAuthenticated, user } from '../stores'
    import { goto } from '$app/navigation';

    const login = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const res = await signInWithPopup(auth, provider)
            $user = res.user
            $isAuthenticated = true
            goto('/profile')
        } catch (error) {
            console.error(error)
        }
    }

</script>

<h1>Login</h1>

<button on:click={login}>
    Login
</button>