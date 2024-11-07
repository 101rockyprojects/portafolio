<script lang="ts">
    import { onMount } from 'svelte';
    import { locale } from 'svelte-i18n';
    import { i18nStores } from '@App/components/stores/i18n-data.ts';
    
    const { nav, achievements } = i18nStores;

    let currentSlide = 0;

    function nextSlide() {
      currentSlide = (currentSlide + 1) % $achievements.length;
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + $achievements.length) % $achievements.length;
    }

    onMount(() => {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    });
  </script>
  
  <section id="achievements" class="section">
    <h2 class="section-title">{$nav.achievements}</h2>
    <div class="max-w-3xl mx-auto relative">
      <div class="overflow-hidden rounded-lg shadow-lg">
        {#each $achievements as achievement, index}
          <div 
            class="w-full transition-transform duration-500"
            style="transform: translateX({(index - currentSlide) * 100}%)"
          >
            <img 
              src={achievement.image} 
              alt={achievement.title}
              class="w-full h-64 object-cover"
            />
            <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
              <h3 class="text-xl font-bold text-white mb-2">{achievement.title}</h3>
              {#if achievement.link}
                <a 
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:underline text-white hover:text-blue-400"
                >
                  {$locale === 'en' ? 'Learn more...' : 'Ver más...'}
                </a>
              {/if}
            </div>
          </div>
        {/each}
      </div>
      
      <button 
        class="btn prev-next left-[-1.5em]"
        onclick={prevSlide}
      >
        ←
      </button>
      <button 
        class="btn prev-next right-[-1.5em]"
        onclick={nextSlide}
      >
        →
      </button>
    </div>
  </section>