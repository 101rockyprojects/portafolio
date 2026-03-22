<script lang="ts">
  import Tech from '@App/components/views/Tech.svelte';
  import { locale } from 'svelte-i18n';
  import { techData } from '@App/Shared/Domain/const/skills.ts';
  import { categories } from '@App/stores/data.ts';


  let filterLevel: string = 'All';

  function applyFilter(tech: { level: string }) {
    return filterLevel === 'All' || tech.level === filterLevel;
  }

  function getLevelLabel(level: string): string {
    const labels: Record<string, Record<string, string>> = {
      es: { 'Experienced': 'Experiencia', 'Learning': 'Proyectos', 'Want': 'Aprendiendo' },
      en: { 'Experienced': 'Experienced', 'Learning': 'Projects', 'Want': 'Learning' }
    };
    return labels[$locale || 'es']?.[level] || level;
  }
</script>

<section id="skills" class="section relative bg-surface/50 border-b border-outline-variant/15">
  <div class="flex flex-col items-center mb-4 lg:flex-row lg:justify-between gap-2">
      <h2 class="font-readex text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface">
        <span class="text-secondary font-mono">&lt;</span>Skill Set<span class="text-secondary font-mono">/&gt;</span>
      </h2>

      <!-- Filter Controls -->
      <div class="inline-flex gap-1 bg-primary/40 backdrop-blur-sm rounded-full p-1 border border-gold/30">
      {#each ['All', 'Experienced', 'Learning', 'Want'] as level}
        <button
          on:click={() => filterLevel = level}
          class={`px-4 md:px-5 py-2 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${
            filterLevel === level
              ? 'bg-gradient-to-r from-secondary to-primary-container text-surface-container-low shadow-lg shadow-gold/50'
              : 'text-white hover:text-surface-container-low'
          }`}
        >
          {level === 'All' ? ($locale === 'es' ? 'Todos' : 'All') : getLevelLabel(level)}
        </button>
      {/each}
    </div>
  </div>

  
  <!-- Skills Grid by Category -->
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
      {#each Object.keys($categories) as category}
        {@const categoryName = $categories[category]}
        {@const length = Object.values(techData).filter(tech => tech.category === category && applyFilter(tech)).length}
        <article class="category-container { length > 10 ? 'md:col-span-2' : '' }">
          <!-- Category Header -->
          <div class="category-header mb-4">
            <h3 class="text-lg md:text-xl font-bold text-center">
              <span class="text-gold">[</span> {categoryName} <span class="text-gold">]</span>
            </h3>
          </div>

          <!-- Skills Grid -->
          <div class="grid { length > 10 ? 'grid-cols-5 lg:grid-cols-7' : 'grid-cols-3 lg:grid-cols-5' } gap-3">
            {#each Object.keys(techData) as key (key)}
              {#if techData[key].category === category && applyFilter(techData[key])}
                <a 
                  href={techData[key].link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="tech-item"
                  title={key}
                >
                  <div class="tech-icon-wrapper">
                    <Tech
                      name={key}
                      source={techData[key].source}
                      size="1.5x"
                      color={techData[key].color || 'text-white'}
                    />
                  </div>
                  <span class="tech-name">{key}</span>
                </a>
              {/if}
            {/each}
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style lang="postcss">
  .category-container {
    @apply rounded-xl border border-gold/40 bg-surface-container/55 overflow-hidden;
    @apply p-5 md:p-6 shadow-lg shadow-gold/20 backdrop-blur-sm;
    @apply transition-all duration-500 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/30;
  }

  .category-header {
    @apply pb-3 border-b border-gold/30;
  }

  .tech-item {
    @apply rounded-lg p-1 cursor-pointer transition-all duration-300;
    @apply flex flex-col items-center justify-center gap-2;
    @apply hover:scale-110 hover:-translate-y-1;
    @apply border-0 bg-transparent;
  }

  .tech-icon-wrapper {
    @apply flex items-center justify-center w-fit;
  }

  .tech-name {
    @apply text-xs md:text-sm font-semibold text-white text-center leading-tight;
    @apply font-mono line-clamp-2 w-full;
  }

  .section-title {
    @apply text-3xl md:text-4xl font-bold tracking-widest;
  }
</style>
