<script lang="ts">
  import info from '@App/components/stores/info.ts';
  import { i18nStores } from '@App/components/stores/i18n-data.ts';
  const { about } = i18nStores;
  import { locale } from 'svelte-i18n';
  import Fa from 'svelte-fa';
  import { faEnvelope, faAddressBook, faIdCard } from '@fortawesome/free-solid-svg-icons';
  import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
</script>
  
<section id="about" class="section flex justify-center items-center relative">
  <article class="absolute text-white opacity-80 md:opacity-20 w-full text-[25.5dvw] leading-[18dvw] text-start pl-[2.5dvw] top-16 select-none">
    <p class="text-2xl md:text-3xl lg:text-4xl pl-[2dvw] pb-1 italic">{$about.salute}</p>
    <div class="opacity-60 md:opacity-60 flex">
      R
      <img src="{$info.image}" alt="Personal Logo" class="rounded-full overflow-hidden w-[18dvw] h-[18dvw] mt-1 lg:mt-2 border-[10px] md:border-[15px]">
      CKY
    </div>
    <p class="text-lg md:text-2xl italic text-end pr-5 md:pr-16 lg:pr-20">{$about.gag}</p>
  </article>
  <article class="about">
    <img src="{$info.image}" alt="Personal Logo" class="hidden md:block absolute rounded-full overflow-hidden w-28 h-28 border-2 right-6 top-6">
    <p class="text-4xl italic hidden md:flex gap-4 mb-2">
      {$about.salute}
      <span class="font-bold">{$info.name}</span>
    </p>
    <p class="text-2xl text-flame">{$about.title}</p>
    <p class="text-xl text-gold mb-4 italic"><q>{$about.slogan}</q></p>
    <p class="text-white readex-thin text-balance">{$about.description}</p>
    <p class="text-xl text-white readex-thin text-balance mb-6 italic">{$about.extra}</p>
    
    <div class="flex flex-wrap gap-4">
      <a href={`mailto:${$info.email}`} class="btn-secondary">
        <Fa icon={faEnvelope} />
      </a>
      <a href={$info.linkedin} target="_blank" rel="noopener noreferrer" class="btn-secondary">
        <Fa icon={faLinkedinIn} />
      </a>
      <a href={$info.github} target="_blank" rel="noopener noreferrer" class="btn-secondary">
        <Fa icon={faGithub} />
      </a>
      <a href={$info.cv} target="_blank" rel="noopener noreferrer" class="btn-primary flex gap-2">
        <Fa icon={faAddressBook} />
        {$locale === 'en' ? 'CV/Resume' : 'Hoja de vida'}
      </a>
      <a href={$info.card} target="_blank" rel="noopener noreferrer" class="btn-primary flex gap-2">
        <Fa icon={faIdCard} />
        {$locale === 'en' ? 'Cover Letter' : 'Carta de presentación'}
      </a>
    </div>
  </article>
</section>
<hr class="w-5/6 mx-auto opacity-20">

  <style>
    .about {
      margin-top: calc(4rem + 20dvw);
      @apply pt-6 max-w-2xl z-[1] md:mt-12 mx-auto md:rounded-lg md:bg-white/5 md:p-6 md:backdrop-blur-sm;
    }
  </style>