<script lang="ts">
  import { i18nStores } from '@App/components/stores/i18n-data.ts';
    
  const { nav, educations } = i18nStores;
</script>
  
<section id="education" class="section relative w-full lg:min-w-[45dvw] lg:pl-0">
  <aside class="comment text-start top-0">
    <pre class="ml-[11rem]">
      &lbrace;

        &quot;{$nav.education}&quot;: &lbrace;
        {#each $educations as education}
          &quot;{education.title}&quot;,
        {/each}
        &rbrace;
      &rbrace;
    </pre>
  </aside>
  <h2 class="section-title lg:text-start">&lt;{$nav.education}/&gt;</h2>
  <div class="max-w-3xl mx-auto grid gap-8">
    {#each $educations as education}
      <article class="bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-4 group">
        {#if education.type === 'language' && education.level}
          <article class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-bold text-caramel mb-1">{education.title} {education.level}</h3>
              <p class="text-white">{education.institution}</p>
              <time datetime={education.finalDate} class="text-gray-400">
                {education.initialDate} - {education.finalDate} | {education.country}
              </time>
            </div>
            <img src="{education.logo}" alt="{education.institution} Logo" class="w-14 h-14 object-contain shadow-neon">
          </article>
        {:else}
          <img src="{education.logo}" alt="{education.institution} Logo" class="absolute max-w-20 max-h-20 right-4 shadow-neon">
          <article class="flex flex-col justify-between items-start">
            <h3 class="text-xl font-bold text-caramel mb-1">{education.title}</h3>
            <p class="text-white">{education.institution}</p>
            <time datetime={education.finalDate} class="text-gray-400">
              {education.initialDate} - {education.finalDate} | {education.country}
            </time>
            <p class="text-white opacity-50 readex-thin">{education.description}</p>
          </article>
        {/if}
      </article>
    {/each}
  </div>
</section>

<style lang="postcss">
  .section-title {
    @apply pt-4 lg:text-start;
  }
</style>