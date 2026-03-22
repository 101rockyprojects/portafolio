<script lang="ts">
  import { locale } from 'svelte-i18n';
</script>

<button
  on:click={() => locale.set($locale === 'en' ? 'es' : 'en')}
  class="lang-toggle"
  aria-label={$locale === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
  title={$locale === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
>
  <span class="lang-text">{$locale === 'en' ? 'EN' : 'ES'}</span>
</button>

<style lang="postcss">
  .lang-toggle {
    @apply relative inline-flex items-center justify-center;
    @apply w-10 h-10 rounded-full font-bold text-sm;
    @apply border-2 border-gold/60 bg-ocean/40 text-gold;
    @apply transition-all duration-300;
    @apply hover:border-gold/80 hover:bg-gold/30 hover:text-gold hover:scale-110;
    @apply focus:outline-none focus:ring-2 focus:ring-gold/50;
  }

  .lang-text {
    @apply font-mono font-bold tracking-widest;
  }
</style>
