<script lang="ts">
  import Fa from 'svelte-fa';
  import { faBookOpen, faFistRaised, faGamepad, faCode } from '@fortawesome/free-solid-svg-icons';
  import { i18nStores } from '@App/stores/data.ts';
  const { nav, hobbies } = i18nStores;

  const hobbiesData = [
    { icon: faCode, color: 'text-primary' },
    { icon: faGamepad, color: 'text-secondary' },
    { icon: faBookOpen, color: 'text-secondary' },
    { icon: faFistRaised, color: 'text-primary' }
  ];
</script>

<section id="hobbies" class="section relative bg-surface">
  <h2 class="section-title text-center mb-10">
    <span class="text-gold">[</span> {$nav.hobbies} <span class="text-gold">]</span>
  </h2>

  <!-- Hobbies Grid with Better Distribution -->
  <div class="hobbies-grid">
    {#each $hobbies as hobby, index}
      <article
        class={`hobby-card group relative overflow-hidden ${
          index === 0 || index === 3 ? 'md:col-span-2' : 'md:col-span-1'
        }`}
        style="background-image: url({hobby.image})"
      >
        <!-- Background Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/80 transition-all duration-500"></div>

        <!-- Content Container -->
        <div class="relative h-full flex flex-col justify-end p-5 md:p-7">
          <!-- Icon & Title -->
          <div class="hobby-header mb-3 transform transition-all duration-300 group-hover:translate-y-0">
            <div class="flex items-center gap-3 mb-2">
              <div class="hobby-icon-wrapper">
                <Fa 
                  icon={hobbiesData[index].icon}
                  class={`text-3xl md:text-4xl ${hobbiesData[index].color} group-hover:scale-110 transition-transform duration-300`}
                />
              </div>
              <h3 class="text-2xl md:text-3xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                {hobby.name}
              </h3>
            </div>
          </div>

          <!-- Description -->
          <p class="hobby-description text-sm md:text-base text-gray-200 leading-relaxed opacity-80 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-40">
            {hobby.description}
          </p>

          <!-- Decorative Line -->
          <div class="hobby-line mt-3 w-0 group-hover:w-12 h-0.5 bg-gradient-to-r from-gold to-gold transition-all duration-500"></div>
        </div>
      </article>
    {/each}
  </div>
</section>

<style lang="postcss">
  .section-title {
    @apply text-3xl md:text-4xl font-bold tracking-wider text-white;
  }

  .hobbies-grid {
    @apply grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto px-4 md:px-0;
  }

  .hobby-card {
    @apply rounded-xl min-h-56 md:min-h-72 relative;
    @apply bg-cover bg-center bg-no-repeat;
    @apply border border-gold/30 transition-all duration-500;
    @apply hover:border-gold/60 hover:shadow-2xl hover:shadow-gold/30;
  }

  .hobby-header {
    @apply space-y-1;
  }

  .hobby-icon-wrapper {
    @apply inline-flex items-center justify-center;
  }

  .hobby-description {
    @apply overflow-hidden transition-all duration-300;
  }

  .hobby-line {
    @apply transition-all duration-500;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .hobby-card {
      @apply min-h-48;
    }
  }
</style>
