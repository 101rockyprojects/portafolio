<script lang="ts">
  import Tech from '@App/components/views/Tech.svelte';
  import { onMount } from 'svelte';
  import { locale } from 'svelte-i18n';
  import { techData } from '@App/Shared/Domain/const/skills.ts';
  import { categories } from '@App/components/stores/i18n-data.ts';
	import { MEDIUM_SCREEN_WIDTH } from '@App/Shared/Domain/const/viewport.ts';

  let filterLevel: string = 'All';
  let isSmallScreen: boolean = false;

  onMount(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });
  
  function checkScreenSize() {
    isSmallScreen = window.innerWidth <= MEDIUM_SCREEN_WIDTH;
  }

  function applyFilter(tech: { level: string }) {
    return filterLevel === 'All' || tech.level === filterLevel;
  }
</script>

<section id="skills" class="flex justify-center items-start flex-wrap gap-4 relative">
  <aside class="filters flex justify-end readex-thin w-5/6">
    <select bind:value={filterLevel} id="level">
      <option value="All">{$locale === 'es' ? 'Todos' : 'All'}</option>
      <option value="Experienced">{$locale === 'es' ? 'Experimentado' : 'Experienced'}</option>
      <option value="Learning">{$locale === 'es' ? 'Aprendiendo' : 'Learning'}</option>
      <option value="Want">{$locale === 'es' ? 'Quiero aprender' : 'Want to learn'}</option>
    </select>
  </aside>
  
  <section class="grid grid-cols-1 md:grid-cols-3 gap-4 w-5/6 mb-1">
    {#each Object.keys($categories) as category}
      <article class="category-container shadow-below">
        <h2 class="text-[1.05rem] md:text-lg lg:text-2xl text-center mb-2 flex flex-wrap justify-center">
          {$categories[category]}
        </h2>
        <div class="grid {isSmallScreen ? 'grid-cols-4': 'grid-cols-6'} md:grid-cols-2 lg:grid-cols-3 gap-2 readex-thin justify-center auto-fill">
          {#each Object.keys(techData) as key (key)}
            {#if techData[key].category === category && applyFilter(techData[key])}
              <a href={techData[key].link} target="_blank" class="icon">
                <Tech
                  name={key}
                  source={techData[key].source}
                  size="2x"
                  classTooltip="text-white text-sm text-center text-[0.8rem]"
                  color={techData[key].color}
                />
              </a>
            {/if}
          {/each}
        </div>
      </article>
    {/each}
  </section>
</section>

<hr class="w-5/6 mx-auto opacity-20">

<style lang="postcss">
  .category-container {
    @apply bg-ocean rounded-xl p-2 md:p-4;
  }

  .filters {
    @apply flex gap-4 mb-4;
  }

  .filters select {
    @apply bg-ocean text-white rounded-lg px-2 py-2 border-transparent focus:border-gold focus:ring-0 border-2 w-[12em] text-[0.85rem];
  }
</style>