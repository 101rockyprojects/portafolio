<script lang="ts">
  import Fa from 'svelte-fa';
  import { faBookOpen, faFistRaised, faGamepad, faCode } from '@fortawesome/free-solid-svg-icons';
  import { i18nStores } from '@App/components/stores/i18n-data.ts';
  const { nav, hobbies } = i18nStores;

  const hobbiesData = [
    {
      icon: faCode,
      image: '/images/coding.jpg'
    },
    {
      icon: faGamepad,
      image: '/images/gaming.jpg'
    },
    {
      icon: faBookOpen,
      image: '/images/reading.jpg'
    },
    {
      icon: faFistRaised,
      image: '/images/training.jpg'
    }
  ];
</script>

<section id="hobbies" class="section lg:px-6">
  <h2 class="section-title">&lt;{$nav.hobbies}/&gt;</h2>
  <div class="grid gap-2 md:grid-cols-3 w-full">
    {#each $hobbies as hobby, index}
        <article
            class={`
              h-64 rounded-lg overflow-hidden group bg-cover bg-no-repeat bg-bottom relative
              ${index % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'}
            `}
            style="background-image: url({hobby.image})"
        >
            <div class="flex items-end justify-start w-full h-full bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all">
                <section class="p-6 text-white text-xl w-full">
                  <div class={`
                      flex gap-2 items-center
                      ${index % 3 === 0 ? 'group-hover:text-flame' : 'group-hover:text-gold'}
                    `}
                  >
                    <Fa icon={hobbiesData[index].icon} />
                    <h3 class="text-inherit">{hobby.name}</h3>
                  </div>
                  <p class="text-sm opacity-40 group-hover:opacity-100 transition-opacity readex-thin text-balance">
                      {hobby.description}
                  </p>
                </section>
            </div>
        </article>
    {/each}
  </div>
</section>

<style>
  .section-title {
    @apply lg:text-start;
  }
</style>