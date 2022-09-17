<script>
    
    import {isAuthenticated, user} from '../stores'

</script>

<div class="px-10 py-10 flex flex-col items-center gap-y-4">

    {#if $isAuthenticated}
        <div class="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col items-center pb-10">
                <img class="mb-3 mt-5 w-40 h-40 rounded-full shadow-lg" src={$user.photoURL} alt="">
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{$user.displayName}</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">{$user.email}</span>
            </div>
        </div>
    {/if}
    
</div>



