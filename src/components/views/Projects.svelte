<script lang="ts">
    import { locale } from 'svelte-i18n';
    import { i18nStores } from '@App/components/stores/i18n-data.ts';
    
    const { nav, projects } = i18nStores;

    let expandedProject = $state<number | null>(null);
    
    function toggleProject(index: number) {
      expandedProject = expandedProject === index ? null : index;
    }
  </script>
  
  <section id="projects" class="section">
    <h2 class="section-title">{$nav.projects}</h2>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each $projects as project, index}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 dark:shadow-lg overflow-hidden">
          <img src={project.image} alt={project.name} class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2 dark:text-white">{project.name}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
            
            <button
              onclick={() => toggleProject(index)}
              class="hover:underline text-gray-700 dark:text-gray-300 mb-2 font-thin text-sm"
            >
            {#if expandedProject === index}
              {$locale === 'en' ? 'Show less...' : 'Ver menos...'}
            {:else}
              {$locale === 'en' ? 'Learn more...' : 'Ver más...'}
            {/if}
            </button>
            
            {#if expandedProject === index}
              <div class="mt-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{project.learnt}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  {#each project.technologies as tech}
                    <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                      {tech}
                    </span>
                  {/each}
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn-primary inline-block"
                >
                  {$locale === 'en' ? 'View demo' : 'Ver proyecto'}
                </a>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </section>