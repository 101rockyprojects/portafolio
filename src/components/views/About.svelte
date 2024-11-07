<script lang="ts">
    import { i18nStores } from '@App/components/stores/i18n-data.ts';
    
    const { nav, about } = i18nStores;
  </script>
  
  <section id="about" class="section">
    <h2 class="section-title">{$nav.about}</h2>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-4 dark:text-white">{$about.name}</h1>
      <p class="text-xl text-secondary mb-6 dark:text-gray-300">{$about.slogan}</p>
      <p class="text-gray-600 dark:text-gray-400 mb-8">{$about.description}</p>
      
      <div class="flex flex-wrap gap-4">
        <a href={`mailto:${$about.email}`} class="btn-primary">
          Email
        </a>
        <a href={$about.linkedin} target="_blank" rel="noopener noreferrer" class="btn-primary">
          LinkedIn
        </a>
        <a href={$about.github} target="_blank" rel="noopener noreferrer" class="btn-primary">
          GitHub
        </a>
        <a href={$about.cv} target="_blank" rel="noopener noreferrer" class="btn-secondary">
          CV/Resume
        </a>
      </div>
    </div>
  </section>