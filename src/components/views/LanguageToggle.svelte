<script lang="ts">
  import { locale } from 'svelte-i18n';
  
  function toggleLanguage() {
    locale.set($locale === 'en' ? 'es' : 'en');
  }
</script>

<button
  onclick={toggleLanguage}
  class="btn rounded-full font-bold border-elegant border-4 hover:text-white hover:border-gold"
  aria-label="Toggle language"
>
  {$locale === 'en' ? 'EN' : 'ES'}
</button>