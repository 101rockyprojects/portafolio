<script lang="ts">
    import { i18nStores } from '@App/components/stores/i18n-data.ts';
    
    const { nav, educations } = i18nStores;
</script>
  
<section id="education" class="section">
  <h2 class="section-title">{$nav.education}</h2>
  <div class="max-w-3xl mx-auto grid gap-8">
    {#each $educations as education}
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-700 dark:shadow-lg p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-bold dark:text-white">{education.title}</h3>
            <p class="text-gray-700 dark:text-orange-400">{education.institution}</p>
          </div>
          <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hidden">
            {education.type}
          </span>
        </div>
        <p class="text-gray-600 dark:text-gray-400 mb-2">
          {education.initialDate} - {education.finalDate} | {education.country}
        </p>
        <p class="text-gray-700 dark:text-gray-300">{education.description}</p>
        {#if education.level}
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Level: {education.level}</p>
        {/if}
      </div>
    {/each}
  </div>
</section>