<script lang="ts">
    import Nav from '@App/components/views/Nav.svelte';
    import About from '@App/components/views/About.svelte';
    import Projects from '@App/components/views/Projects.svelte';
    import Skills from '@App/components/views/Skills.svelte';
    import Experience from '@App/components/views/Experience.svelte';
    import Education from '@App/components/views/Education.svelte';
    import Hobbies from '@App/components/views/Hobbies.svelte';
    import Achievements from '@App/components/views/Achievements.svelte';
    import Contact from '@App/components/views/Contact.svelte';
</script>

<main>
    <Nav />
    <div class="section-container bg-obscure">
        <About />
        <Projects />
        <Skills />
        <div class="flex justify-center flex-col lg:flex-row lg:px-4">
            <Experience />
            <Education />
        </div>
        <div class="grid grid-cols-4 w-full lg:px-[8%] relative">
            <div class="col-span-4 lg:col-span-1">
                <Achievements />
            </div>
            <pre class="comment-block">
                01010010 01101111 01100011 01101011 01111001 00100000 01000010 01101001 01101110 01100001 01110010 01111001 01010010 01101111 01100011 01101011 01111001 00100000 01000010 01101001 01101110 01100001 01110010 01111001
            </pre>
            <div class="col-span-4 lg:col-span-3">
                <Hobbies />
            </div>
        </div>
        <Contact />
    </div>
</main>

<style>
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
    .comment-block {
        @apply absolute -ml-[25%] w-full text-start text-white opacity-[12%] text-base lg:text-xl leading-[0.6rem] lg:leading-[0.8rem] select-none;
    }
  </style>