<script lang="ts">
  import LanguageToggle from '@App/components/views/LanguageToggle.svelte';
  import ThemeToggle from '@App/components/views/ThemeToggle.svelte';
  import { i18nStores } from '@App/components/stores/i18n-data.ts';
  
  export let darkMode: boolean;

  const { nav } = i18nStores;
  const navItems = [
    { title: $nav.about, href: '#about' },
    { title: $nav.projects, href: '#projects' },
    { title: $nav.experience, href: '#experience' },
    { title: $nav.education, href: '#education' },
    { title: $nav.hobbies, href: '#hobbies' },
    { title: $nav.achievements, href: '#achievements' },
  ];
  
  function handleThemeChange(event: CustomEvent<boolean>) {
    darkMode = event.detail;
  }
</script>

<nav class="navigation">
  <div class="mx-auto px-4">
    <div class="flex items-center h-12 text-md">
      <div class="hidden md:flex space-x-4">
        {#each navItems as item}
          <a href={item.href}>
            {item.title}
          </a>
        {/each}
      </div>
      
      <div class="flex items-end space-x-4 right-4 fixed">
        <LanguageToggle />
        <ThemeToggle {darkMode} on:themeChange={handleThemeChange} />
      </div>
    </div>
  </div>
</nav>

<style>
  nav {
    font-family: 'Readex Pro';
    src: url('/src/assets/fonts/ReadexPro-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
</style>