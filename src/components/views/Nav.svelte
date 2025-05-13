<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import LanguageToggle from '@App/components/views/LanguageToggle.svelte';
  import { i18nStores } from '@App/components/stores/i18n-data.ts';
  const { nav } = i18nStores;
  
  let isMenuOpen = false;
  let scrollY = 0;
  let prevScrollY = 0;
  let showNav = true;
  let windowWidth = 0;

  $: navItems = [
    { title: $nav.about, href: '#about' },
    { title: $nav.experience, href: '#experience' },
    { title: $nav.projects, href: '#projects' },
    { title: $nav.contact, href: '#contact' },
  ];

  let activeSection = '';
  
  function closeMenu() {
    isMenuOpen = false;
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function handleScroll() {
    scrollY = window.scrollY;
    showNav = scrollY < prevScrollY || scrollY < 50;
    prevScrollY = scrollY;
  }

  function handleResize() {
    windowWidth = window.innerWidth;
    if (windowWidth >= 768 && isMenuOpen) { // 768px es el breakpoint de 'md' en Tailwind
      isMenuOpen = false;
    }
  }

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

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      sections.forEach(section => {
        if (section) {
          observer.unobserve(section);
        }
      });
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<svelte:window on:scroll={handleScroll} on:resize={handleResize} />

<header class={`fixed w-full z-50 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
  <nav class="mx-auto px-4 pb-3 bg-gradient-to-b from-ocean via-ocean to-ocean/0 shadow-lg">
    <div class="flex items-center h-14 text-base md:text-lg justify-between">
      <img src="images/logo.webp" alt="Personal Logo" class="hidden md:block rounded-full overflow-hidden w-14 h-14 pt-2">
      
      <div class="hidden md:flex space-x-6">
        {#each navItems as item}
          <a 
            href={item.href}
            class={`
              text-base md:text-lg transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:text-gold h-14 flex items-center
              ${activeSection === item.href.substring(1) ?
                'text-caramel' :
                'text-white'
              }
            `}
          >
            {item.title}
          </a>
        {/each}
      </div>
      
      <button 
        class="burguer-menu-btn"
        on:click={toggleMenu}
        aria-label="Menu"
      >
        <span class={`burger-layer ${isMenuOpen ? 'rotate-45 translate-y-2 bg-flame h-1' : 'bg-white h-0.5'}`}></span>
        <span class={`burger-layer ${isMenuOpen ? 'opacity-0' : 'bg-white opacity-100 h-0.5'}`}></span>
        <span class={`burger-layer ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-flame h-1' : 'bg-white h-0.5'}`}></span>
      </button>

      <img src="images/logo.webp" alt="Personal Logo" class="block md:hidden rounded-full overflow-hidden w-14 h-14 pt-2">
      <LanguageToggle />
    </div>
  </nav>
  
  {#if isMenuOpen}
    <div 
      class="burguer-menu"
      transition:fly={{ y: -200, duration: 300 }}
    >
      <div class="flex flex-col">
        {#each navItems as item}
          <a 
            href={item.href}
            on:click={closeMenu}
            class={`
              burguer-menu-item
              ${activeSection === item.href.substring(1) ?
                'text-caramel' :
                'text-white'
              }
            `}
          >
            {item.title}
          </a>
        {/each}
      </div>
    </div>
  {/if}
</header>

{#if isMenuOpen}
  <button type="button"
    aria-label="Close menu"
    class="fixed inset-0 z-40 bg-black bg-opacity-50"
    on:click={closeMenu}
    transition:fade={{ duration: 200 }}
  ></button>
{/if}

<style>
  nav {
    font-family: 'Readex Pro';
    src: url('/fonts/ReadexPro-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  .burguer-menu-btn {
    @apply md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none
  }

  .burguer-menu {
    @apply md:hidden bg-ocean text-white overflow-hidden
  }

  .burguer-menu-item {
    @apply py-3 text-base text-center transition-colors duration-300 hover:text-gold readex-bold hover:bg-white/10
  }

  .burger-layer {
    @apply w-full transition-all duration-300 rounded-lg
  }
</style>