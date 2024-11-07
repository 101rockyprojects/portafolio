<script lang="ts">
    import { i18nStores } from '@App/components/stores/i18n-data.ts';
    
    const { nav, experiences } = i18nStores;
</script>

<section id="experience" class="section">
  <h2 class="section-title">{$nav.experience}</h2>
  <div class="max-w-3xl mx-auto">
    {#each $experiences as experience}
      <div class="py-4 relative pl-8 border-l-2 border-primary dark:border-l-orange-600">
        <div class="absolute w-4 h-4 bg-primary dark:bg-orange-600 rounded-full -left-[9px] top-0"></div>
        <h3 class="text-xl font-bold dark:text-white">{experience.title}</h3>
        <a 
          href={experience.companyLink} 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-primary dark:text-orange-600 hover:underline"
        >
          {experience.company}
        </a>
        <p class="text-gray-600 dark:text-gray-400">
          {experience.initialDate} - {experience.finalDate} | {experience.country}
        </p>
        <p class="mt-2 text-gray-700 dark:text-gray-300">{experience.description}</p>
      </div>
    {/each}
  </div>
</section>