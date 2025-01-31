<script lang="ts">
  import { onMount } from 'svelte';
  import LanguageToggle from '@App/components/views/LanguageToggle.svelte';
  import { i18nStores } from '@App/components/stores/i18n-data.ts';
  const { nav } = i18nStores;
  
  $: navItems = [
    { title: $nav.about, href: '#about' },
    { title: $nav.projects, href: '#projects' },
    { title: $nav.experience, href: '#experience' },
    { title: $nav.contact, href: '#contact' },
  ];

  let activeSection = '';
  onMount(() => {
    const sections = navItems.map(item => document.querySelector(item.href));
    const observer = new IntersectionObserver((entries) => {
      let currentActiveSection = '';
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentActiveSection = entry.target.id;
        }
      });
      if (currentActiveSection) {
        activeSection = currentActiveSection;
      }
    }, { threshold: 0.6 });
    sections.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  });
</script>

<header class="navigation max-w-[100vw]">
  <nav class="mx-auto px-4 bg-ocean">
    <div class="flex items-center h-12 text-base md:text-lg justify-between md:justify-center">
      <img src="images/logo.png" alt="Personal Logo" class="hidden md:block rounded-full overflow-hidden w-10 h-10 absolute left-5">
      <div class="flex space-x-2 md:space-x-6">
        {#each navItems as item}
          <a 
            href={item.href}
            class={`
              text-[0.9rem] md:text-base hover:text-gold
              ${activeSection === item.href.substring(1) ? 'text-caramel' : 'text-white'}
            `}
          >
            &lt;{item.title}/&gt;
          </a>
        {/each}
      </div>
      <aside class="right-4 absolute">
        <LanguageToggle />
      </aside>
    </div>
  </nav>
</header>

<style>
  nav {
    font-family: 'Readex Pro';
    src: url('/fonts/ReadexPro-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
</style>