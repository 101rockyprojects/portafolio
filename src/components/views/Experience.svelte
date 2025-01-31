<script lang="ts">
	import { Fa } from 'svelte-fa';
	import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
  import { i18nStores } from '@App/components/stores/i18n-data.ts';
    
  const { nav, experiences } = i18nStores;
</script>

<section id="experience" class="section relative">
  <aside class="comment text-start top-3">
    <div class="relative border-l-4 ml-[20dvw] pt-1 pl-4 border-white">
      <div class="absolute w-5 h-5 bg-white rounded-full -left-[12px] top-0"></div>
      <div class="absolute w-3 h-3 bg-obscure rounded-full -left-[8px] top-1"></div>
      <div class="absolute w-5 h-5 bg-white rounded-full -left-[12px] top-11"></div>
      <div class="absolute w-3 h-3 bg-obscure rounded-full -left-[8px] top-12"></div>
      <div class="absolute w-3 h-3 bg-white rounded-full -left-[8px] top-[5.75rem]"></div>
      <div class="absolute w-[0.4rem] h-[0.4rem] bg-obscure rounded-full -left-[5px] top-[5.9rem]"></div>
      <section class="flex flex-col flex-wrap gap-1">
        <span class="">Fix: Remove exposed api_key</span>
        <p class="text-sm mb-1">Oops, removed from index.html</p>
        <span class="">Feat: Make the best portfolio</span>
        <p class="text-sm mb-1">Add some text and color</p>
        <span class="">Init project</span>
      </section>
    </div>
  </aside>
  <h2 class="section-title">&lt;{$nav.experience}/&gt;</h2>
  <div class="max-w-3xl mx-auto">
    {#each $experiences as experience}
      <article class="pb-4 relative pl-4 border-l-4 border-flame">
        <time datetime={experience.finalDate} class="absolute text-sm text-flame">
          {experience.initialDate} - {experience.finalDate} | {experience.country}
        </time>
        <div class="absolute w-5 h-5 bg-flame rounded-full -left-[12px] top-0"></div>
        <div class="absolute w-3 h-3 bg-obscure rounded-full -left-[8px] top-1"></div>
        <h3 class="pt-4 text-2xl font-bold">{experience.title}</h3>
        <a 
          href={experience.companyLink} 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex gap-2 items-center text-gold hover:underline"
        >
          {experience.company}
          <Fa icon={faExternalLink} />
        </a>
        <p class="description readex-thin mb-3">{experience.description}</p>
        <p class="description readex-thin">{experience.extra}</p>
      </article>
    {/each}
  </div>
</section>

<style lang="postcss">
  .section-title {
    @apply pt-4 lg:text-start;
  }
  .description {
    @apply mt-2 text-white;
  }
</style>