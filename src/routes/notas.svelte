<script>
    import { collection, addDoc, onSnapshot, deleteDoc, updateDoc, doc, where, query } from 'firebase/firestore'
    import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
    import {auth} from '../firebase'
    import { db } from '../firebase'
    import { goto } from '$app/navigation';
    import { isAuthenticated, user} from '../stores'
    import { onDestroy } from 'svelte';
    import Toastify from 'toastify-js'

    let note = {
        title: '',
        desc: '',
        user: ''
    }
    let notes = []
    let notesl
    let updStatus = false
    let cId = ''
    let uId = ''

    if($isAuthenticated == true){
         note.user = $user.uid
         uId = $user.uid
    }


    const unSub = onSnapshot(query(collection(db, 'notes'), where('user', '==', uId)), (querySnapshot) => {
        
        notes = querySnapshot.docs.map(doc => {
            return {...doc.data(), id: doc.id}
        })
        
        notesl = notes.length
    }, (err) => {
        console.log(err)
    })


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

    const addNote = async () => {
        if(!updStatus) {
            await addDoc(collection(db, 'notes'), note)
            Toastify({
                text: 'Nota añadida',
                style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
            }).showToast();
        } else {
            await updateDoc(doc(db, 'notes', cId), note)
            Toastify({
                text: 'Nota actualizada',
                className: 'info'
            }).showToast();
        }
        note = {
            title: '',
            desc: '',
            user: ''
        }
        updStatus = false
        cId = ''
    }

    const dltNote = async (id) => {
        await deleteDoc(doc(db, 'notes', id))
        Toastify({
            text: 'Nota Eliminada',
            style: {
                background: "linear-gradient(to right, #ED213A, #93291E)",
            }
        }).showToast();
    }

    const updNote = async (cNote) => {
        note.title = cNote.title
        note.desc = cNote.desc
        updStatus = true
        cId = cNote.id
    }


    onDestroy(unSub)

</script>

<div class="min-h-screen flex items-center">

    <div class="px-10 container m-auto py-4">
        {#if $isAuthenticated}
            <div class="py-10 h-full justify-center">
                <form on:submit|preventDefault={addNote} class="px-10 py-10 flex flex-col items-center gap-y-4">
                    <label for="title">Titulo</label>
                    <input class="w-full" bind:value={note.title} name="title" type="text" placeholder="Titulo">
            
                    <label for="desc">Descripcion</label>
                    <textarea class="w-full" bind:value={note.desc} name="desc" id="" cols="30" rows="5" placeholder="Crea una nota..."></textarea>

                    <button type="submit" class="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Agregar Nota
                        </span>
                    </button>
                </form>
            </div>
            {#if notesl === 0}
                <div class="px-10 py-10 flex flex-col items-center gap-y-4">
                    <h1>Oops! Aun no tienes notas ¡Comencemos! 😁</h1>
                </div>
            {:else}
                <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {#each notes as note}
                    <div class="rounded-md shadow-md shadow-black hover:cursor-pointer" on:click={updNote(note)}>
                        <div class="px-4 py-7">
                            <div class="flex justify-between items-center">
                                <h3>{note.title}</h3>
                                <button class="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" on:click={dltNote(note.id)}>
                                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Eliminar Nota
                                    </span>
                                </button>
                            </div>
                            <p>{note.desc}</p>
                        </div>
                    </div>
                {/each}
                </div>
            {/if}
        {:else}

        <div class="px-10 py-10 flex flex-col items-center gap-y-4">
            <h1>Aun no has iniciado sesión 😞</h1>
            <button class="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" on:click={login}>
                <div class="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg" class="mr-2" alt="google">
                    <span>
                        Iniciar Sesión
                    </span>
                </div>
            </button>
        </div>
        {/if}
    </div>

</div>