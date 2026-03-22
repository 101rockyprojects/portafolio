<script lang="ts">
  import Tech from '@App/components/views/Tech.svelte';
  import { fade, fly } from 'svelte/transition';
  import { locale } from 'svelte-i18n';
  import { i18nStores } from '@App/stores/data.ts';
  import { techData } from '@App/Shared/Domain/const/skills.ts';
  import type { Project } from '@Shared/Domain/types/project.ts';

  const { nav, projects } = i18nStores;

  let selectedTechnologies: string[] = [];
  let technologies: string[] = [];
  let filteredProjects: Project[] = [];

  $: {
    technologies = Array.from(new Set($projects.flatMap((project) => project.technologies))).sort((a, b) =>
      a.localeCompare(b)
    );

    if (selectedTechnologies.length === 0) {
      filteredProjects = [...$projects];
    } else {
      filteredProjects = $projects.filter(project => 
        selectedTechnologies.every(tech => project.technologies.includes(tech))
      );
    }
  }
</script>

<section id="projects" class="section projects-container relative overflow-hidden bg-surface-container-low !py-24 md:!py-28">
  <aside class="comment text-start top-4">
    <pre class="ml-[8dvw] lg:ml-[20dvw]">
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

  <div class="pointer-events-none absolute inset-0 -z-10">
    <div class="absolute inset-0 bg-gradient-to-b from-surface-container-low to-surface"></div>
    <div class="absolute -top-40 left-[-8rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(144,147,255,0.14),transparent_60%)] blur-2xl"></div>
  </div>

  <div class="max-w-6xl mx-auto px-4 md:px-0">
    <header class="flex flex-col gap-6">
      <div class="inline-flex items-center gap-2 rounded-full bg-surface-variant/60 backdrop-blur-md px-3 py-1.5 border border-outline-variant/20 w-fit">
        <span class="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_24px_rgba(255,209,111,0.22)] animate-ping"></span>
        <span class="text-[11px] tracking-[0.24em] uppercase text-on-surface-variant font-semibold">
          {$locale === 'en' ? 'Loading projects...' : 'Cargando proyectos...'}
        </span>
      </div>

      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <h2 class="font-readex text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface">
          {$nav.projects}<span class="text-secondary">.</span>
        </h2>
        <p class="max-w-xl text-on-surface-variant leading-relaxed">
          {$locale === 'en'
            ? 'Some of the most notable projects I\'ve worked on.'
            : 'Algunos de los proyectos más interesantes en los que he trabajado.'}
        </p>
      </div>
    </header>

    <!-- Filter Chips -->
    <aside class="mt-10">
      <div class="filter-wrapper">
        {#each technologies as tech}
          <label class="filter-chip {selectedTechnologies.includes(tech) ? 'active' : ''}">
            <input type="checkbox" bind:group={selectedTechnologies} value={tech} />
            <span class="flex items-center gap-2">
              {#if techData[tech]}
                <span class="tooltip">
                  <Tech
                    name={tech}
                    source={techData[tech].source}
                    color={techData[tech].color}
                    size="1x"
                    classTooltip="hidden"
                  />
                </span>
              {/if}
              <span class="text-xs md:text-sm">{tech}</span>
            </span>
          </label>
        {/each}
      </div>
    </aside>

    {#if filteredProjects.length === 0}
      <div in:fade={{ duration: 300 }} class="empty-state">
        <h3 class="text-base md:text-lg text-center text-balance text-on-surface-variant">
          {$locale === 'en'
            ? 'No matches for this filter combo (yet).'
            : 'Sin resultados para esta combinación (por ahora).'}
        </h3>
      </div>
    {:else}
      <div class="projects-grid">
        {#each filteredProjects as project, index}
          <section
            in:fly={{ y: 18, opacity: 0, duration: 420, delay: index * 60 }}
            class='project-card {index === 0 ? 'first' : ''}'
          >
            <div class="card-image-wrapper {index === 0 ? 'first' : ''}">
              <img
                src={project.image || 'images/placeholder.webp'}
                alt={project.name}
                class="card-image group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div class="card-overlay"></div>

              <div class="absolute right-4 bottom-4 flex flex-wrap gap-2">
                {#each project.technologies.slice(0, 5) as tech (tech)}
                  <span class="tech-pill" title={tech}>
                    {#if techData[tech]}
                      <span class="tooltip">
                        <Tech
                          name={tech}
                          source={techData[tech].source}
                          color={techData[tech].color}
                          size="0.5x"
                          classTooltip="hidden"
                        />
                      </span>
                    {/if}
                  </span>
                {/each}
              </div>
            </div>

            <div class="card-body">
              <div class="flex items-center justify-between gap-3">
                <h3 class="card-title">{project.name}</h3>
                {#if project.documentation}
                <a
                  title={$locale === 'en' ? 'Documentation available' : 'Documentación disponible'}
                  href={project.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="doc-indicator"
                >
                  Docs
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                    <path d="M14 3h7a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0V6.41l-9.29 9.3a1 1 0 0 1-1.42-1.42L18.59 5H14a1 1 0 0 1-1-1z"/>
                    <path d="M5 5h5a1 1 0 0 1 0 2H6v10h10v-4a1 1 0 1 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/>
                  </svg>
                </a>
              {/if}
              </div>
              <p class="card-description">{project.description}</p>
              <p class="card-learnt">{$locale === 'es' ? 'Reto:' : 'Challenge:'} {project.learnt}</p>
            </div>

            <a
              href={project.link || '#projects'}
              target={project.link ? '_blank' : '_self'}
              rel={project.link ? 'noopener noreferrer' : ''}
              class="card-footer group">
              <span class="link-indicator">
                {$locale === 'en' ? 'View project' : 'Ver proyecto'} →
              </span>
            </a>
          </section>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style lang="postcss">
  .projects-container,
  .card-footer {
    @apply bg-gradient-to-b from-secondary/10 to-surface-container-low;
    @apply backdrop-blur-md;
    @apply border-b border-outline-variant/15;
    @apply shadow-[0_16px_32px_rgba(0,0,0,0.18)];
    @apply relative overflow-hidden;
  }

  .filter-wrapper {
    @apply flex flex-wrap items-center justify-center gap-2 p-3 md:p-4;
    @apply rounded-2xl bg-surface-container/60 backdrop-blur-md;
    @apply border border-outline-variant/15;
  }

  .filter-chip {
    @apply relative inline-flex items-center cursor-pointer;
    @apply px-3 py-2 rounded-full;
    @apply bg-surface-variant/40 backdrop-blur-md;
    @apply border border-outline-variant/20;
    @apply text-on-surface-variant text-xs md:text-sm font-semibold;
    @apply transition-all duration-300 hover:bg-surface-variant/60 hover:border-secondary/30 hover:text-on-surface;
  }

  .filter-chip input {
    @apply absolute opacity-0;
  }

  .filter-chip.active {
    @apply bg-gradient-to-br from-outline-variant to-primary text-white border-0;
    @apply -translate-y-1 shadow-[0_16px_32px_rgba(96,99,238,0.10)];
  }

  .projects-grid {
    @apply mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
  }

  .empty-state {
    @apply w-full py-12 text-center;
  }

  .project-card {
    @apply relative rounded-2xl overflow-hidden cursor-pointer;
    @apply flex h-full flex-col;
    @apply bg-surface-container/65 backdrop-blur-md;
    @apply border border-outline-variant/15;
    @apply transition-all duration-500;
    @apply hover:border-primary/30 hover:-translate-y-1;
    @apply hover:shadow-[0_24px_48px_rgba(96,99,238,0.10)];
  }

  .project-card.first {
    @apply md:col-span-2 border-2 border-primary/50;
  }

  .card-image-wrapper {
    @apply relative w-full h-52 overflow-hidden;
  }

  .card-image-wrapper.first {
    @apply relative w-full h-64 overflow-hidden;
  }

  .card-image {
    @apply w-full h-full object-cover transition-transform duration-500;
  }

  .card-overlay {
    @apply absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent;
  }

  .tech-pill {
    @apply inline-flex items-center gap-2;
    @apply rounded-full px-3 py-1.5;
    @apply bg-surface-variant/60 backdrop-blur-md;
    @apply border border-outline-variant/20;
    @apply text-on-surface-variant;
  }
  
  .card-title {
    @apply font-readex text-lg md:text-xl font-bold;
    @apply text-secondary;
    @apply leading-snug line-clamp-2;
  }

  .card-description {
    @apply text-sm md:text-base text-on-surface-variant;
    @apply leading-normal line-clamp-3;
  }

  .card-learnt {
    @apply font-mono text-xs md:text-sm text-on-surface-variant;
    @apply leading-snug line-clamp-5;
  }

  .card-body {
    @apply flex-1 px-5 py-6 md:px-6 md:py-7;
    @apply flex flex-col gap-3;
  }

  .card-footer {
    @apply flex items-center justify-between;
    @apply px-5 py-4 md:px-6;
    @apply bg-gradient-to-l hover:from-gold/50 hover:to-primary/5;
    @apply transition-colors duration-300;
  }

  .link-indicator {
    @apply text-base font-semibold text-on-surface;
    @apply transition-colors duration-300 group-hover:text-gold;
  }

  .doc-indicator {
    @apply flex gap-2 items-center text-xs font-semibold tracking-wide uppercase w-fit;
    @apply text-on-surface-variant/80 hover:text-white;
    @apply border border-outline-variant/20 rounded-full px-5 py-1;
    @apply bg-surface-variant/40 hover:bg-outline-variant;
  }

  .projects-container::before,
  .card-footer::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/doodles.webp');
    background-size: 300px;
    background-repeat: repeat;
    opacity: 0.15;
    filter: invert(1);
    mix-blend-mode: soft-light;
    pointer-events: none;
  }
</style>
