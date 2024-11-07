<script lang="ts">
  import { locale } from 'svelte-i18n';
  
  function toggleLanguage() {
    locale.set($locale === 'en' ? 'es' : 'en');
  }
</script>

<button
  onclick={toggleLanguage}
  class="btn rounded-full hover:text-blue-50 dark:hover:text-orange-950 font-bold"
  aria-label="Toggle language"
>
  {$locale === 'en' ? 'EN' : 'ES'}
</button>