<script lang="ts">
  import { i18nStores } from '@App/components/stores/i18n-data.ts';
  import Fa from 'svelte-fa';
  import { faAward, faExternalLink, faTimes } from '@fortawesome/free-solid-svg-icons';

  const { nav, achievements } = i18nStores;

  let showModal = false;
  let selectedAchievement: any = null;

  function openModal(achievement: any) {
      selectedAchievement = achievement;
      showModal = true;
  }

  function closeModal() {
      showModal = false;
      selectedAchievement = null;
  }
</script>

<section id="achievements" class="section relative">
  <h2 class="section-title">&lt;{$nav.achievements}/&gt;</h2>
  <article class="flex flex-wrap gap-4 flex-col mx-auto md:w-11/12 lg:w-full">
      {#each $achievements as achievement}
          <button class="relative flex items-center cursor-pointer gap-4 py-3 mb-4 group" on:click={() => openModal(achievement)}>
            <Fa icon={faAward} class="text-2xl text-caramel" />
            <h3 class="text-lg font-bold text-start text-balance">{achievement.title}</h3>
            <span class="top-0 left-0 w-1/3 h-[2px] bars"></span>
            <span class="bottom-0 right-0 w-3/4 h-[2px] bars"></span>
          </button>
      {/each}
  </article>

  {#if showModal}
      <section class="modal">
          <article id="modal-content" class="bg-elegant rounded-lg shadow-2xl pt-0 px-6 pb-6 max-w-2xl w-3/4 max-h-[85dvh] overflow-x-auto relative">
            <button class="flex justify-end w-full sticky top-2 right-2 mb-2" on:click={closeModal}>
                <Fa icon={faTimes} class="text-3xl text-flame hover:scale-110 hover:rotate-90 transition-all duration-300 ease-out" />
            </button>
            <a
                href="{selectedAchievement.link}"
                target="_blank"
                rel="noopener noreferrer"
                class="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-balance flex items-center gap-2 text-caramel hover:text-gold hover:underline"
            >
                <h3>{selectedAchievement.title}</h3>
                <Fa icon={faExternalLink} class="text-2xl mt-1" />
            </a>
            <img src={selectedAchievement.image} alt={selectedAchievement.title} class="w-[80%] h-full max-h-[20rem] object-cover mb-4 rounded-md mx-auto" />
            <div class="text-[0.8rem] md:text-sm transition-opacity readex-thin">
                <p class="mb-2">{selectedAchievement.description}</p>
                <p>{selectedAchievement.extra}</p>
            </div>
          </article>
      </section>
  {/if}
</section>

<style lang="postcss">
  .section-title {
    @apply lg:text-start;
  }
  .modal {
    @apply fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50;
  }
  .bars {
    @apply  absolute bg-caramel group-hover:bg-flame group-hover:w-full transition-all duration-300 ease-out;
  }
</style>