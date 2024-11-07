<script lang="ts">
    import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { createEventDispatcher } from 'svelte';
    
    export let darkMode: boolean;
    
    const dispatch = createEventDispatcher();
    
    function toggleTheme() {
      dispatch('themeChange', !darkMode);
    }
</script>

<button
  onclick={toggleTheme}
  class="btn rounded-full hover:text-blue-50 dark:hover:text-orange-950"
  aria-label="Toggle theme"
>
  {#if darkMode}
    <FontAwesomeIcon icon={faMoon} />
  {:else}
    <FontAwesomeIcon icon={faSun} />
  {/if}
</button>