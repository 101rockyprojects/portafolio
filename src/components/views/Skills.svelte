<script lang="ts">
  import { onMount } from 'svelte';
  import { locale } from 'svelte-i18n';
  import Fa from 'svelte-fa';
  import { faSpoon, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
  import { faPhp, faJs, faNodeJs, faPython, faJava, faYoutubeSquare, faGitAlt, faTrello, faDocker, faLaravel, faGolang, faNpm } from '@fortawesome/free-brands-svg-icons';

  export let tech: string | null = null;

  const techIcons: Record<string, { icon: any, color: string, category: string, level: string, link: string }> = {
    'PHP': { icon: faPhp, color: 'text-indigo-500', category: 'Back', level: 'Experienced', link: 'https://www.php.net/' },
    'Javascript': { icon: faJs, color: 'text-yellow-500', category: 'Front', level: 'Experienced', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    'Node.js': { icon: faNodeJs, color: 'text-green-600', category: 'Back', level: 'Experienced', link: 'https://nodejs.org/en' },
    'Java': { icon: faJava, color: 'text-red-600', category: 'Back', level: 'Experienced', link: 'https://www.java.com/en' },
    'Python': { icon: faPython, color: 'text-indigo-700', category: 'Back', level: 'Experienced', link: 'https://www.python.org' },
    'Git': { icon: faGitAlt, color: 'text-orange-600', category: 'Tool', level: 'Experienced', link: 'https://git-scm.com' },
    'Youtube API': { icon: faYoutubeSquare, color: 'text-red-600', category: 'Tool', level: 'Experienced', link: 'https://developers.google.com/youtube/v3/getting-started' },
    'Laravel': { icon: faLaravel, color: 'text-gray-500', category: 'Back', level: 'Want', link: 'https://laravel.com' },
    'Go': { icon: faGolang, color: 'text-gray-500', category: 'Back', level: 'Want', link: 'https://golang.org/' },
    'Docker': { icon: faDocker, color: 'text-blue-500', category: 'Tool', level: 'Experienced', link: 'https://www.docker.com' },
    'Trello': { icon: faTrello, color: 'text-blue-700', category: 'Tool', level: 'N/A', link: 'https://trello.com' },
    'Npm': { icon: faNpm, color: 'text-red-700', category: 'Tool', level: 'Experienced', link: 'https://nodejs.org/en' },
    'Scoop': { icon: faSpoon, color: 'text-caramel', category: 'Back', level: 'Experienced', link: 'https://github.com/mirdware/scoop?tab=readme-ov-file#bootstrap-scoop' },
    'Scalar': { icon: faArrowsAlt, color: 'text-caramel', category: 'Front', level: 'Experienced', link: 'https://github.com/mirdware/scalar?tab=readme-ov-file#scalar' },
  };
  const techImages: Record<string, { src: string, category: string, level: string, link: string }> = {
    'Composer': { src: 'composer.png', category: 'Tool', level: 'Experienced', link: 'https://getcomposer.org' },
    'RabbitMQ': { src: 'rabbitmq.png', category: 'Tool', level: 'Learning', link: 'https://www.rabbitmq.com' },
    'Vite': { src: 'vite.svg', category: 'Front', level: 'Learning', link: 'https://vitejs.dev' },
    'Svelte': { src: 'svelte.svg', category: 'Front', level: 'Experienced', link: 'https://svelte.dev' },
    'Strapi': { src: 'strapi.svg', category: 'Back', level: 'Learning', link: 'https://strapi.io/' },
    'Typescript': { src: 'typescript.png', category: 'Front', level: 'Experienced', link: 'https://www.typescriptlang.org' },
    'Tailwind': { src: 'tailwind.png', category: 'Front', level: 'Experienced', link: 'https://tailwindcss.com/' },
    'Hibernate': { src: 'hibernate.png', category: 'Back', level: 'Experienced', link: 'https://hibernate.org' },
    'Postgres': { src: 'postgres.png', category: 'Tool', level: 'Experienced', link: 'https://www.postgresql.org' },
    'Mysql': { src: 'mysql.png', category: 'Tool', level: 'Experienced', link: 'https://www.mysql.com' },
  };
  const categoryEs: string[] = [
    "Backend",
    "Frontend",
    "Herramienta"
  ];

  let filterLevel: string = 'All';
  let isSmallScreen: boolean = false;

  onMount(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });
  
  function checkScreenSize() {
    isSmallScreen = window.innerWidth <= 600;
  }

  function applyFilter(tech: string) {
    const techData = techIcons[tech] || techImages[tech];
    if (filterLevel !== 'All' && techData.level !== filterLevel) {
      return false;
    }
    return true;
  }
</script>

<section id="skills" class="flex justify-center items-start flex-wrap gap-4 relative">
  {#if tech}
    {#if tech in techIcons}
      <a href="{techIcons[tech].link}" class="tooltip">
        <Fa icon={techIcons[tech].icon} class={`text-3xl ${techIcons[tech].color}`} />
        <span class="tooltiptext-sm">{tech}</span>
      </a>
    {:else if tech in techImages}
      <a href="{techImages[tech].link}" class="tooltip">
        <img src="images/{techImages[tech].src}" alt="{tech} Logo" class="w-6">
        <span class="tooltiptext-sm">{tech}</span>
      </a>
    {/if}
  {:else}
    <aside class="filters flex justify-end readex-thin w-5/6">
      <select bind:value={filterLevel} id="level">
        <option value="All">{$locale === 'es' ? 'Todos' : 'All'}</option>
        <option value="Experienced">{$locale === 'es' ? 'Experimentado' : 'Experienced'}</option>
        <option value="Learning">{$locale === 'es' ? 'Aprendiendo' : 'Learning'}</option>
        <option value="Want">{$locale === 'es' ? 'Quiero aprender' : 'Want to learn'}</option>
      </select>
    </aside>
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4 w-5/6 mb-1">
      {#each ['Back', 'Front', 'Tool'] as category, index}
        <article class="category-container shadow-below">
          <h2 class="text-[1.05rem] md:text-lg lg:text-2xl text-center mb-2 flex flex-wrap justify-center">
            {$locale === 'es' ? categoryEs[index] : category}
          </h2>
          <div class="grid {isSmallScreen ? 'grid-cols-4': 'grid-cols-6'} md:grid-cols-2 lg:grid-cols-3 gap-2 readex-thin justify-center auto-fill">
            {#each Object.keys(techIcons) as key (key)}
              {#if techIcons[key].category === category && applyFilter(key)}
                <a href={techIcons[key].link} class="icon">
                  <Fa icon={techIcons[key].icon} class="text-5xl {techIcons[key].color}" />
                  <span>{key}</span>
                </a>
              {/if}
            {/each}
            {#each Object.keys(techImages) as key (key)}
              {#if techImages[key].category === category && applyFilter(key)}
                <a href={techImages[key].link} class="icon">
                  <img src="images/{techImages[key].src}" alt="{key} Logo" class="w-10">
                  <span>{key}</span>
                </a>
              {/if}
            {/each}
          </div>
        </article>
      {/each}
    </section>
{/if}
</section>

{#if !tech}
  <hr class="w-5/6 mx-auto opacity-20">
{/if}

<style>
  .category-container {
    @apply bg-ocean rounded-xl p-2 md:p-4;
  }
  .icon {
    @apply flex flex-col items-center justify-center w-full min-w-[5rem] lg:min-w-20 h-[4.5rem] text-white text-sm text-center text-[0.7rem] hover:scale-110;
  }

  .filters {
    @apply flex gap-4 mb-4;
  }

  .filters select {
    @apply bg-ocean text-white rounded-lg px-2 py-2 border-transparent focus:border-gold focus:ring-0 border-2 w-[12em] text-[0.85rem];
  }
</style>