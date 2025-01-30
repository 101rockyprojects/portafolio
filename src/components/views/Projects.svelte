<script lang="ts">
	import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { locale } from 'svelte-i18n';
  import Skills from '@App/components/views/Skills.svelte';
  import { i18nStores } from '@App/components/stores/i18n-data.ts';
  import { Fa } from 'svelte-fa';
  import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
  import { circInOut } from 'svelte/easing';

  const { nav, projects } = i18nStores;

  let expandedIndex: number | null = 0;
  let isSmallScreen = false;
  let selectedTechnologies: string[] = [];

  let technologies: string[] = [];
  onMount(() => {
    technologies = Array.from(
      new Set(
        $projects.flatMap(project => project.technologies)
      )
    );
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });

  function checkScreenSize() {
    isSmallScreen = window.innerWidth <= 1335;
  }

  function toggleExpand(index: number) {
    expandedIndex = expandedIndex === index ? null : index;
  }

  function filterProjects(project: any) {
    if (selectedTechnologies.length === 0) {
      return true;
    }
    return selectedTechnologies.every(tech => {
      expandedIndex = 0;
      return project.technologies.includes(tech);
    });
  }
</script>

<section id="projects" class="section relative">
  <aside class="comment text-start top-2">
    <pre>
      &lt;section&gt;

        &lt;h1&gt;{$nav.projects}&lt;/h1&gt;

        &lt;ul&gt;
          {#each $projects as project}
            &lt;li&gt;{project.name}&lt;/li&gt;
          {/each}
        &lt;/ul&gt;

      &lt;/section&gt;
    </pre>
  </aside>
  <h2 class="section-title pt-4">&lt;{$nav.projects}/&gt;</h2>
  <article class="project-container">
    <aside class="filter-container">
      {#each technologies as tech}
        <label class="filter-label readex-thin {selectedTechnologies.includes(tech) ? 'selected' : ''}">
          <input type="checkbox" bind:group={selectedTechnologies} value={tech} />
          {tech}
        </label>
      {/each}
    </aside>
    {#each $projects.filter(filterProjects) as project, index}
      <button
        class="project-card"
        class:expanded={expandedIndex === index || isSmallScreen}
        on:click={() => toggleExpand(index)}
      >
        <img 
          src={project.image || "/images/placeholder.png"} 
          alt={project.name} 
          class="card-image"
        />
        <div class="card-overlay"></div>

        <div
          class="card-content"
          class:expanded={expandedIndex === index || isSmallScreen}
        >
          <h3
            class="card-title shadow-below"
            class:expanded={expandedIndex === index || isSmallScreen}
          >
            {project.name}
          </h3>

          {#if expandedIndex === index || isSmallScreen}
            <div
              class="card-details"
              transition:slide={{ duration: 600, easing: circInOut }}
            >
              <p class="lg:text-[0.9rem] shadow-below mb-2">
                <span class="text-caramel">{$locale === 'en' ? 'Challenge: ' : 'Reto: '}</span>
                {project.description}
              </p>
              <p class="lg:text-[0.9rem] shadow-below mb-4">
                <span class="text-caramel">{$locale === 'en' ? 'Learning: ' : 'Aprendizaje: '}</span>
                {project.learnt}
              </p>
              <div class="flex justify-between">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn-primary flex gap-2"
                >
                  {$locale === 'en' ? 'View demo' : 'Ver proyecto'}
                  <Fa icon={faExternalLink} />
                </a>
                <div class="tech-tags shadow-below">
                  {#each project.technologies as tech}
                    <span class="tech-tag">
                      <Skills {tech} />
                    </span>
                  {/each}
                </div>
              </div>
            </div>
          {/if}
        </div>
      </button>
    {:else}
      <h2 class="text-xl text-center text-balance">
        {$locale === 'en'
          ? 'Oops, haven\'t tried this combination yet'
          : 'Oops, aún no he probado esta combinación'}...
      </h2>
    {/each}
  </article>  
</section>

<style lang="postcss">
  .filter-container {
    @apply flex justify-center items-center flex-wrap w-full gap-2 mb-4 z-10;
  }
  .filter-label {
    @apply bg-ocean cursor-pointer py-2 px-3 rounded-md text-center text-sm transition-colors duration-300;
  }
  .filter-label input {
    @apply absolute opacity-0;
  }
  .filter-label.selected {
    @apply bg-gold text-ocean font-bold;
  }
  .filter-label:hover {
    @apply bg-caramel text-ocean;
  }
  .project-container {
    @apply flex justify-center items-start flex-wrap gap-4;
  }
  .project-card {
    @apply relative rounded-lg shadow-xl overflow-hidden cursor-pointer w-32 h-[22.5em];
  }
  .project-card.expanded {
    @apply w-[42.5em] max-w-full;
    filter: drop-shadow(0px 2px 5px #272156);
  }
  .card-image {
    @apply absolute inset-0 w-full h-full object-cover object-[12%_100%] lg:object-left-top;
  }
  .card-overlay {
    @apply absolute inset-0 bg-gradient-to-t from-oxide via-transparent to-transparent;
  }
  .card-content {
    @apply absolute inset-x-0 bottom-0 p-5 text-white h-fit rotate-[-90deg] mb-8 transition-all duration-300 ease-in-out;
  }
  .card-content.expanded {
    @apply rotate-0 mb-0;
  }
  .card-title {
    @apply text-xl md:text-2xl font-bold text-left transition-all duration-700 ease-in-out w-max;
  }
  .card-title.expanded {
    @apply text-2xl md:text-3xl text-gold mb-2;
  }
  .card-details {
    @apply text-sm text-left;
  }
  .tech-tags {
    @apply flex items-center justify-end flex-wrap gap-4 w-fit rounded-md px-2;
  }
</style>