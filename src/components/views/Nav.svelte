<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import LanguageToggle from '@App/components/views/LanguageToggle.svelte';
  import { i18nStores } from '@App/stores/data.ts';
  const { nav } = i18nStores;
  
  let isMenuOpen = $state(false);
  let prevScrollY = $state(0);
  let showNav = $state(true);
  let windowWidth = $state(0);
  let isPinned = $state(false);
  let hoverReveal = $state(false);

  const navItems = $derived([
    { title: $nav.about, href: '#about' },
    { title: $nav.experience, href: '#experience' },
    { title: $nav.projects, href: '#projects' },
    { title: $nav.contact, href: '#contact' },
  ]);

  let activeSection = $state('about');
  
  function closeMenu() {
    isMenuOpen = false;
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function handleScroll() {
    const scrollY = window.scrollY;
    const scrollingUp = scrollY < prevScrollY;

    if (isPinned || isMenuOpen || hoverReveal) {
      showNav = true;
    } else {
      showNav = scrollingUp || scrollY < 50;
    }

    prevScrollY = scrollY;
  }

  function handleResize() {
    windowWidth = window.innerWidth;
    if (windowWidth >= 768 && isMenuOpen) {
      isMenuOpen = false;
    }
  }

  function handleRevealEnter() {
    hoverReveal = true;
    showNav = true;
  }

  function handleRevealLeave() {
    hoverReveal = false;
    handleScroll();
  }

  function togglePinned() {
    isPinned = !isPinned;
    showNav = true;
  }

  const observedSectionIds = ['about', 'experience', 'projects', 'contact'];

  $effect(() => {
    if (typeof window === 'undefined') return;

    handleResize();
    handleScroll();

    const sections = observedSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) activeSection = (visible[0].target as HTMLElement).id;
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0.2, 0.35, 0.5, 0.65],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  });

  $effect(() => {
    if (isMenuOpen) showNav = true;
  });
</script>

<svelte:window on:scroll={handleScroll} on:resize={handleResize} />

<button
  type="button"
  class="nav-reveal-zone"
  aria-label="Reveal navigation"
  onmouseenter={handleRevealEnter}
  onclick={togglePinned}
></button>

<header class={`nav-header fixed w-full max-w-[100dvw] z-50 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
  <nav class="nav-shell mx-auto px-4" aria-label="Navigation" onmouseenter={handleRevealEnter} onmouseleave={handleRevealLeave}>
    <div class="nav-content flex items-center justify-between h-16">
      <!-- Logo + Branding -->
      <div class="flex items-center gap-3 min-w-fit">
        <a href="#about" class="invert flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <img src="images/icon.svg" alt="Rocky Logo" class="w-10 h-10 md:w-12 md:h-12 drop-shadow-lg" />
        </a>
      </div>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8 flex-1 justify-center">
        {#each navItems as item}
          <a 
            href={item.href}
            class={`
              relative text-sm md:text-base font-semibold transition-all duration-300
              ${activeSection === item.href.substring(1) ? 'text-secondary' : 'text-on-surface hover:text-secondary'}
            `}
          >
            {item.title}
            {#if activeSection === item.href.substring(1)}
              <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-secondary via-secondary to-secondary rounded-full"></span>
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
          onclick={toggleMenu}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          <span class={`w-full h-0.5 bg-secondary transition-all duration-300 rounded-full ${isMenuOpen ? 'rotate-45 translate-y-2 bg-secondary' : ''}`}></span>
          <span class={`w-full h-0.5 bg-secondary transition-all duration-300 rounded-full ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span class={`w-full h-0.5 bg-secondary transition-all duration-300 rounded-full ${isMenuOpen ? '-rotate-45 -translate-y-2.5 bg-secondary' : ''}`}></span>
        </button>
      </div>
    </div>
  </nav>
  
  <!-- Mobile Menu Dropdown -->
  {#if isMenuOpen}
    <div 
      class="md:hidden bg-surface-container-low/95 backdrop-blur-sm border-b border-outline-variant/15 shadow-lg overflow-hidden"
      transition:fly={{ y: -200, duration: 300 }}
    >
      <div class="flex flex-col px-4 py-2">
        {#each navItems as item}
          <a 
            href={item.href}
            onclick={closeMenu}
            class={`
              py-3 px-3 text-sm font-semibold rounded-lg transition-all duration-300
              ${activeSection === item.href.substring(1) ? 'text-secondary bg-surface-variant/40' : 'text-on-surface hover:text-secondary hover:bg-surface-variant/30'}
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
    onclick={closeMenu}
    transition:fade={{ duration: 200 }}
  ></button>
{/if}

<style lang="postcss">
  nav {
    font-family: 'Readex Pro';
  }

  .nav-reveal-zone {
    @apply fixed top-0 left-0 right-0 h-4 z-[60];
    @apply bg-transparent;
  }

  .nav-shell {
    @apply bg-gradient-to-b from-secondary/10 to-surface-container-low;
    @apply backdrop-blur-md;
    @apply border-b border-outline-variant/15;
    @apply shadow-[0_16px_32px_rgba(0,0,0,0.18)];
    @apply relative overflow-hidden;
  }

  .nav-shell::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('images/totk-doodles.webp');
    background-size: 640px;
    background-repeat: repeat;
    opacity: 0.07;
    filter: invert(1);
    mix-blend-mode: soft-light;
    pointer-events: none;
  }

  .nav-content {
    position: relative;
    z-index: 1;
  }

  .burguer-menu-btn {
    @apply md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none
  }

  .burguer-menu {
    @apply md:hidden bg-primary text-white overflow-hidden
  }

  .burguer-menu-item {
    @apply py-3 text-base text-center transition-colors duration-300 hover:text-gold hover:bg-white/10 font-readex font-bold tracking-wider;
  }

  .burger-layer {
    @apply w-full transition-all duration-300 rounded-lg
  }
</style>
