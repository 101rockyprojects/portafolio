<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import LanguageToggle from '@App/components/views/LanguageToggle.svelte';
  import { i18nStores } from '@App/stores/data.ts';
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
    if (windowWidth >= 768 && isMenuOpen) {
      isMenuOpen = false;
    }
  }

  onMount(() => {
    handleResize();
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

<svelte:window on:scroll={handleScroll} on:resize={handleResize} />

<header class={`fixed w-full max-w-[100dvw] z-50 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
  <nav class={`mx-auto px-4 bg-gradient-to-b from-secondary/10 to-surface-container-low backdrop-blur-sm border-b border-gold/20 shadow-lg`} aria-label="Navigation">
    <div class="flex items-center justify-between h-16">
      <!-- Logo + Branding -->
      <div class="flex items-center gap-3 min-w-fit">
        <a href="#about" class="invert flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <img src="/images/icon.svg" alt="Rocky Logo" class="w-10 h-10 md:w-12 md:h-12 drop-shadow-lg" />
        </a>
      </div>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8 flex-1 justify-center">
        {#each navItems as item}
          <a 
            href={item.href}
            class={`
              relative text-sm md:text-base font-semibold transition-all duration-300
              ${activeSection === item.href.substring(1) ? 'text-gold' : 'text-white hover:text-gold'}
            `}
          >
            {item.title}
            {#if activeSection === item.href.substring(1)}
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold via-gold to-gold rounded-full"></span>
            {/if}
          </a>
        {/each}
      </div>
      
      <!-- Right Controls: Language + Mobile Menu -->
      <div class="flex items-center gap-3 md:gap-4">
        <LanguageToggle />
        
        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none hover:scale-110 transition-transform"
          on:click={toggleMenu}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          <span class={`w-full h-0.5 bg-secondary transition-all duration-300 rounded-full ${isMenuOpen ? 'rotate-45 translate-y-2 bg-gold' : ''}`}></span>
          <span class={`w-full h-0.5 bg-secondary transition-all duration-300 rounded-full ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span class={`w-full h-0.5 bg-secondary transition-all duration-300 rounded-full ${isMenuOpen ? '-rotate-45 -translate-y-2.5 bg-gold' : ''}`}></span>
        </button>
      </div>
    </div>
  </nav>
  
  <!-- Mobile Menu Dropdown -->
  {#if isMenuOpen}
    <div 
      class="md:hidden bg-surface-container-low/95 backdrop-blur-sm border-b border-gold/20 shadow-lg overflow-hidden"
      transition:fly={{ y: -200, duration: 300 }}
    >
      <div class="flex flex-col px-4 py-2">
        {#each navItems as item}
          <a 
            href={item.href}
            on:click={closeMenu}
            class={`
              py-3 px-3 text-sm font-semibold rounded-lg transition-all duration-300
              ${activeSection === item.href.substring(1) ? 'text-gold bg-gold/10' : 'text-white hover:text-gold hover:bg-white/5'}
            `}
          >
            {item.title}
          </a>
        {/each}
      </div>
    </div>
  {/if}
</header>

<!-- Mobile Menu Overlay -->
{#if isMenuOpen}
  <button type="button"
    aria-label="Close menu"
    class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
    on:click={closeMenu}
    transition:fade={{ duration: 200 }}
  ></button>
{/if}

<style lang="postcss">
  nav {
    font-family: 'Readex Pro';
  }

  .burguer-menu-btn {
    @apply md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none
  }

  .burguer-menu {
    @apply md:hidden bg-ocean text-white overflow-hidden
  }

  .burguer-menu-item {
    @apply py-3 text-base text-center transition-colors duration-300 hover:text-gold hover:bg-white/10 font-readex font-bold tracking-wider;
  }

  .burger-layer {
    @apply w-full transition-all duration-300 rounded-lg
  }
</style>
