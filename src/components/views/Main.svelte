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
    import BinaryScroll from '@App/components/views/BinaryScroll.svelte';
</script>

<main class="w-[100dvw]">
    <Nav />
    <div class="section-container bg-obscure">
        <About />
        <div class="relative w-full mb-12">
            <BinaryScroll />
        </div>
        <div class="flex justify-center flex-col lg:flex-row lg:px-4">
            <Experience />
            <Education />
        </div>
        <hr>
        <Projects />
        <Skills />
        <div class="grid grid-cols-4 w-full lg:px-[8%] relative">
            <div class="col-span-4 lg:col-span-1">
                <Achievements />
            </div>
            <BinaryScroll />
            <div class="col-span-4 lg:col-span-3">
                <Hobbies />
            </div>
        </div>
        <hr />
        <div class="grid grid-cols-5 w-full lg:px-[8%] relative">
            <div class="col-span-5 lg:col-span-2">
                <Recommendations />
            </div>
            <div class="col-span-5 lg:col-span-3">
                <Contact />
            </div>
        </div>
    </div>
</main>

<style lang="postcss">
    .section-container {
        font-family: 'Readex Pro';
        src: url('/fonts/ReadexPro-Bold.ttf') format('truetype');
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