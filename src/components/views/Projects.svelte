<script lang="ts">
  import Tech from '@App/components/views/Tech.svelte';
  import { blur, fly, fade, crossfade, scale } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { locale } from 'svelte-i18n';
  import { i18nStores } from '@App/components/stores/i18n-data.ts';
  import { Fa } from 'svelte-fa';
  import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
  import { circInOut } from 'svelte/easing';
  import { techData } from '@App/Shared/Domain/const/skills.ts';
  import { LARGE_SCREEN_WIDTH, MIN_PROJECTS_TO_SHOW_IN_ROW } from '@App/Shared/Domain/const/viewport.ts';

  const { nav, projects } = i18nStores;

  let defaultProjectId: string | null = formatNameToId($projects[0].name);
  let expandedProjectId: string | null = defaultProjectId;
  let selectedTechnologies: string[] = [];
  let columnMode = false;

  let technologies: string[] = [];
  let filteredProjects: any[] = [];
  let displayedProjects: any[] = [];
  
  onMount(() => {
    technologies = Array.from(
      new Set(
        $projects.flatMap(project => project.technologies)
      )
    );
    checkScreenSize();
    checkProjectHash();
    window.addEventListener('resize', checkScreenSize);
  });

  function checkScreenSize() {
    columnMode = window.innerWidth <= LARGE_SCREEN_WIDTH;
    if ($projects.length <= MIN_PROJECTS_TO_SHOW_IN_ROW) {
      columnMode = true;
    }
  }

  function checkProjectHash() {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const project = filteredProjects.find(
        p => formatNameToId(p.name) === hash
      );
      if (project) {
        setTimeout(() => {
          expandedProjectId = hash;
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }

  function toggleExpand(project: any) {
    const projectId = formatNameToId(project.name);
    expandedProjectId = expandedProjectId === projectId ? null : projectId;
  }

  function formatNameToId(name: string) {
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  $: {
    if (selectedTechnologies.length === 0) {
      filteredProjects = [...$projects];
    } else {
      filteredProjects = $projects.filter(project => 
        selectedTechnologies.every(tech => project.technologies.includes(tech))
      );
      expandedProjectId = filteredProjects[0]?.name ? formatNameToId(filteredProjects[0].name) : null;
    }
    if (expandedProjectId && !filteredProjects.some(p => formatNameToId(p.name) === expandedProjectId)) {
      expandedProjectId = filteredProjects[0]?.name ? formatNameToId(filteredProjects[0].name) : null;
    }
    displayedProjects = expandedProjectId 
      ? [
          filteredProjects.find(p => formatNameToId(p.name) === expandedProjectId),
          ...filteredProjects.filter(p => formatNameToId(p.name) !== expandedProjectId)
        ].filter(Boolean)
      : filteredProjects;
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
        <label class="flex items-center gap-2 filter-label readex-thin h-12 group {selectedTechnologies.includes(tech) ? 'selected' : ''}">
          <input type="checkbox" bind:group={selectedTechnologies} value={tech} />
          <Tech
            name={tech}
            source={techData[tech].source}
            color={techData[tech].color}
          />
          {tech}
        </label>
      {/each}
    </aside>
    
    {#if filteredProjects.length === 0}
      <div in:fade={{ duration: 300 }} class="empty-state">
        <h2 class="text-xl text-center text-balance">
          {$locale === 'en'
            ? 'Oops, haven\'t tried this combination yet'
            : 'Oops, aún no he probado esta combinación'}...
        </h2>
      </div>
    {:else}
      <div class="projects-grid">
        {#each displayedProjects as project, index (project.name)}
          <div 
          in:fly={{ start: 0.7, duration: 400, delay: index * 100 }}
          out:fly={{ y: -200, duration: 200 }}
          animate:crossfade={{ duration: 700 }}
            class="max-w-full"
          >
            <button
              id={formatNameToId(project.name)}
              class="project-card"
              class:expanded={expandedProjectId === formatNameToId(project.name) || columnMode}
              on:click={() => toggleExpand(project)}
            >
              <img 
                src={project.image || "images/placeholder.webp"} 
                alt={project.name} 
                class="card-image"
                loading="eager"
              />
              <div class="card-overlay"></div>

              <div
                class="card-content"
                class:expanded={expandedProjectId === formatNameToId(project.name) || columnMode}
              >
                <h3
                  class="card-title shadow-below"
                  class:expanded={expandedProjectId === formatNameToId(project.name) || columnMode}
                >
                  {project.name}
                </h3>

                {#if expandedProjectId === formatNameToId(project.name) || columnMode}
                  <div
                    class="card-details"
                    transition:blur={{ duration: 600, easing: circInOut }}
                  >
                    <p class="lg:text-[0.9rem] shadow-below mb-2">
                      <span class="text-caramel">{$locale === 'en' ? 'Challenge: ' : 'Reto: '}</span>
                      {project.description}
                    </p>
                    <p class="lg:text-[0.9rem] shadow-below mb-4">
                      <span class="text-caramel">{$locale === 'en' ? 'Learning: ' : 'Aprendizaje: '}</span>
                      {project.learnt}
                    </p>
                    <div class="flex justify-between items-center">
                      <div class="max-w-fit flex flex-wrap gap-2">
                        {#if project.link}
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="btn-primary flex gap-2 max-h-12 w-fit"
                          >
                            {$locale === 'en' ? 'View demo' : 'Ver proyecto'}
                            <Fa icon={faExternalLink} />
                          </a>
                        {/if}
                        <a 
                          href={project.documentation} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          class="btn-default flex gap-2 max-h-12 w-fit shadow-sm shadow-ocean hover:bg-ocean"
                        >
                          {$locale === 'en' ? 'View docs' : 'Documentación'}
                          <Fa icon={faExternalLink} />
                        </a>
                      </div>
                      <div class="tech-tags shadow-below">
                        {#each project.technologies as tech}
                          <a href={techData[tech].link} target="_blank" class="tech-tag tooltip">
                            <Tech
                              name={tech}
                              source={techData[tech].source}
                              color={techData[tech].color}
                            />
                          </a>
                        {/each}
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </article>  
</section>

<style lang="postcss">
  .filter-container {
    @apply flex justify-center items-center flex-wrap w-full gap-2 mb-4 z-10;
  }
  .filter-label {
    @apply bg-ocean/30 cursor-pointer py-2 px-3 rounded-md text-center text-sm transition-colors duration-300;
  }
  .filter-label input {
    @apply absolute opacity-0;
  }
  .filter-label:hover {
    @apply bg-ocean;
  }
  .filter-label.selected {
    @apply bg-ocean border-2 border-gold text-gold;
  }
  .project-container {
    @apply flex justify-center items-start flex-wrap gap-4 w-full max-w-[100vw] overflow-x-hidden;
  }
  .projects-grid {
    @apply flex justify-center items-start flex-wrap gap-4 w-full lg:px-[8dvw];
  }
  .empty-state {
    @apply w-full py-8;
  }
  .project-card {
    @apply relative rounded-lg shadow-xl overflow-hidden cursor-pointer w-28 h-[25em] md:h-[22.5em] lg:h-[20em];
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }:focus-visible {
    outline: 1px solid #FFB005;
    outline-offset: 1px;
    box-shadow: 0 0 0 2px #FFB005;
  }
  .project-card.expanded {
    @apply max-w-full;
    filter: drop-shadow(0px 2px 5px #272156);
    width: calc(40em + 10dvw);
    height: 24rem;
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
    @apply text-[0.82rem] sm:text-sm text-left;
  }
  .tech-tags {
    @apply flex items-center justify-end flex-wrap gap-4 w-fit rounded-md px-2;
  }
</style>