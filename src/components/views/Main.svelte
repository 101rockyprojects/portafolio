<script lang="ts">
    import { i18nStores } from '@App/stores/data.ts';
    import Nav from '@App/components/views/Nav.svelte';
    import About from '@App/components/views/About.svelte';
    import Projects from '@App/components/views/Projects.svelte';
    import Skills from '@App/components/views/Skills.svelte';
    import Experience from '@App/components/views/Experience.svelte';
    import Education from '@App/components/views/Education.svelte';
    import Hobbies from '@App/components/views/Hobbies.svelte';
    import Achievements from '@App/components/views/Achievements.svelte';
    import Recommendations from '@App/components/views/Recommendations.svelte';
    import Contact from '@App/components/views/Contact.svelte';
    import ScrollLoop from '@App/components/views/ScrollLoop.svelte';
    import { techData } from '@App/Shared/Domain/const/skills.ts';
    import { fly } from 'svelte/transition';

    let containerRef: HTMLElement;
    
    let showScrollTop = $state(false);
    let isReturningTop = $state(false);

    // Binary representation of "Ingeniero Rocky"
    const binarySrollText = '01001001 01101110 01100111 01100101 01101110 01101001 01100101 01110010 01101111 00100000 01010010 01101111 01100011 01101011 01111001 01001001 01101110 01100111 01100101 01101110 01101001 01100101 01110010 01101111 00100000 01010010 01101111 01100011 01101011 01111001'
    const scrollTech = Object.keys(techData).join('  «  ');

    function updateScrollTopVisibility() {
        const y = window.scrollY;
        showScrollTop = y > window.innerHeight;
        if (isReturningTop && y < 4) isReturningTop = false;
    }

    function scrollToTop() {
        isReturningTop = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    $effect(() => {
        if (typeof window === 'undefined') return;
        updateScrollTopVisibility();

        window.addEventListener('scroll', updateScrollTopVisibility, { passive: true });
        window.addEventListener('resize', updateScrollTopVisibility, { passive: true });

        return () => {
            window.removeEventListener('scroll', updateScrollTopVisibility);
            window.removeEventListener('resize', updateScrollTopVisibility);
        };
    });
</script>

<main class="w-[100dvw]">
    <Nav />
    <div class="section-container main-container" bind:this={containerRef}>
        <About />

        <ScrollLoop text={scrollTech} />

        <Skills />

        <Experience />

        <Projects />
    
        <Education />

        <Achievements />

        <ScrollLoop text={binarySrollText} />
        
        <Recommendations />
        
        <hr class="w-full">
        
        <Hobbies />

        <Contact />
    </div>

    {#if showScrollTop}
        <!-- Scroll to Top Button -->
        <button
            class={`scroll-top-btn ${isReturningTop ? 'is-active' : ''}`}
            onclick={scrollToTop}
            aria-label="Scroll to top"
            in:fly={{ y: 28, duration: 800 }}
            out:fly={{ y: 28, duration: 800 }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        </button>
    {/if}
</main>

<style lang="postcss">
    .section-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100dvw, 1fr));
        min-width: 80dvw;
        width: 100%;
        margin: 0 auto;
    }

    .main-container {
        @apply bg-gradient-to-b from-secondary/10 to-surface-container-low;
        @apply backdrop-blur-md;
        @apply border-b border-outline-variant/15;
        @apply shadow-[0_16px_32px_rgba(0,0,0,0.18)];
        @apply relative overflow-hidden;
    }

    .main-container::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url('images/doodles.webp');
        background-size: 300px;
        background-repeat: repeat;
        opacity: 0.1;
        filter: invert(1);
        mix-blend-mode: soft-light;
        pointer-events: none;
    }

    .scroll-top-btn {
        @apply fixed bottom-6 right-2 lg:right-6;
        @apply p-3 rounded-full;
        @apply bg-surface-variant/35 backdrop-blur-md;
        @apply border border-outline-variant/20;
        @apply text-on-surface-variant;
        @apply transition-all duration-300;
        @apply shadow-[0_16px_32px_rgba(0,0,0,0.25)];
    }

    .scroll-top-btn:hover {
        @apply bg-surface-variant/55 border-secondary/30 text-on-surface;
        @apply shadow-[0_24px_48px_rgba(96,99,238,0.10)];
        transform: translateY(-2px);
    }

    .scroll-top-btn.is-active {
        @apply border-primary/30 text-on-surface;
        @apply shadow-[0_24px_48px_rgba(96,99,238,0.18)];
    }
</style>
