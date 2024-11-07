<script lang="ts">
    import { onMount } from 'svelte';
    import { waitLocale } from 'svelte-i18n';
    import Nav from '@App/components/views/Nav.svelte';
    import About from '@App/components/views/About.svelte';
    import Projects from '@App/components/views/Projects.svelte';
    import Experience from '@App/components/views/Experience.svelte';
    import Education from '@App/components/views/Education.svelte';
    import Hobbies from '@App/components/views/Hobbies.svelte';
    import Achievements from '@App/components/views/Achievements.svelte';
    import Contact from '@App/components/views/Contact.svelte';
    let darkMode = $state(false);
  
    onMount(async () => {
        await waitLocale();
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        darkMode = isDark;
        updateTheme(isDark);
    });
    
    function updateTheme(isDark: boolean) {
        document.documentElement.classList.toggle('dark', isDark);
    }
    
    $effect(() => {
        updateTheme(darkMode);
    });
</script>

<main class="mx-auto pt-10">
    <Nav bind:darkMode />
    <div class="section-container bg-white dark:bg-gray-800">
        <About />
        <Projects />
        <Experience />
        <Education />
        <Hobbies />
        <Achievements />
        <Contact />
    </div>
</main>

<style>
    .section-container {
        font-family: 'Readex Pro';
        src: url('/src/assets/fonts/ReadexPro-Bold.ttf') format('truetype');
        font-weight: 700;
        font-style: normal;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100dvw, 1fr));
        gap: 10px;
        min-width: 80dvw;
        width: 100%;
        margin: 0 auto;
    }
  </style>