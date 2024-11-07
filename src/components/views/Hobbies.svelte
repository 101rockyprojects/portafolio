<script lang="ts">
    import { i18nStores } from '@App/components/stores/i18n-data.ts';
    
    const { nav, hobbies } = i18nStores;
  </script>
  
  <section id="hobbies" class="section">
    <h2 class="section-title">{$nav.hobbies}</h2>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each $hobbies as hobby}
        <div 
          class="relative h-64 rounded-lg overflow-hidden group"
          style="background-image: url({hobby.image}); background-size: cover;"
        >
          <div class="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 class="text-xl font-bold mb-2">{hobby.name}</h3>
              <p class="text-sm opacity-40 group-hover:opacity-100 transition-opacity readex-thin">
                {hobby.description}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>