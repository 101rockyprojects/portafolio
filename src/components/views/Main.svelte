<script lang="ts">
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

    let containerRef: HTMLElement;
    

    // Binary representation of "Ingeniero Rocky"
    const binarySrollText = '01001001 01101110 01100111 01100101 01101110 01101001 01100101 01110010 01101111 00100000 01010010 01101111 01100011 01101011 01111001 01001001 01101110 01100111 01100101 01101110 01101001 01100101 01110010 01101111 00100000 01010010 01101111 01100011 01101011 01111001'
    const scrollText = Object.keys(techData).join('  «  ');
</script>

<main class="w-[100dvw]">
    <Nav />
    <div class="section-container bg-surface-container-lowest" bind:this={containerRef}>
        <About />

        <ScrollLoop text={scrollText} />

        <Skills />

        <Experience />

        <Projects />
    
        <Education />

        <Achievements />

        <ScrollLoop text={binarySrollText} />

        <Hobbies />

        <Recommendations />
        <Contact />
    </div>

    <!-- Scroll to Top Button -->
    <button class="fixed bottom-6 right-2 lg:right-6 p-3 rounded-full bg-ocean/20 text-white shadow-lg hover:bg-gold/100 hover:text-ocean transition-colors duration-300"
        on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
    </button>
</main>

<style lang="postcss">
    .section-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100dvw, 1fr));
        min-width: 80dvw;
        width: 100%;
        margin: 0 auto;
    }
</style>
