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

<main class="w-[100dvw]">
    <Nav />
    <div class="section-container bg-obscure">
        <About />
        <div class="relative w-full mb-10">
            <div class="scroll-container">
                <pre class="infinite-scroll-content">
                    <!-- Ingeniero Rocky -->
                    01001001 01101110 01100111 01100101 01101110 01101001 01100101 01110010 01101111 00100000 01010010 01101111 01100011 01101011 01111001
                    01001001 01101110 01100111 01100101 01101110 01101001 01100101 01110010 01101111 00100000 01010010 01101111 01100011 01101011 01111001
                </pre>
            </div>
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
            <div class="scroll-container">
                <pre class="infinite-scroll-content">
                    <!-- Ingeniero Rocky -->
                    01001001 01101110 01100111 01100101 01101110 01101001 01100101 01110010 01101111 00100000 01010010 01101111 01100011 01101011 01111001
                    01001001 01101110 01100111 01100101 01101110 01101001 01100101 01110010 01101111 00100000 01010010 01101111 01100011 01101011 01111001
                </pre>
            </div>
            <div class="col-span-4 lg:col-span-3">
                <Hobbies />
            </div>
        </div>
        <Contact />
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
    .scroll-container {
        @apply absolute w-[100dvw] max-w-[100dvw] text-white opacity-20 select-none overflow-hidden;
    }

    .infinite-scroll-content {
        @apply text-start text-base lg:text-lg leading-[0.6rem] lg:leading-[0.75rem] whitespace-nowrap;
        display: inline-block;
        animation: scrollText 6s linear infinite;
    }

    @keyframes scrollText {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-50%);
        }
    }
  </style>