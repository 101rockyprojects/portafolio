<script lang="ts">
  import info from '@App/stores/info.ts';
  import { i18nStores } from '@App/stores/data.ts';
  import { locale } from 'svelte-i18n';
  import { formatYears } from '@Shared/Domain/functions/formatYears.ts';
  import Fa from 'svelte-fa';
  import { faEnvelope, faAddressBook, faIdCard, faArrowRight } from '@fortawesome/free-solid-svg-icons';
  import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
  import { fade } from 'svelte/transition';

  const { about } = i18nStores;
  const highlightSkills = [
    'Java 8/17/20+ (Spring Boot&nbsp;|&nbsp;Hibernate/JPA)',
    'PHP 8+ (Laravel)',
    'PostgreSQL',
    'JWT',
    'Kafka | RabbitMQ',
    'AWS | Cloudflare',
    'SOLID | Clean Code',
    'API Design (REST/SOAP)'
  ];

  const rotatingWords = {
    en: ['Systems', 'Architectures', 'Platforms', 'Apps', 'Interfaces'],
    es: ['Sistemas', 'Arquitecturas', 'Plataformas', 'Aplicaciones', 'Interfaces'],
  } as const;

  // Svelte 5 Runes
  let reduceMotion = $state(false);
  let wordIndex = $state(0);

  const currentLocale = $derived(($locale ?? 'es') === 'en' ? 'en' : 'es');
  const wordList = $derived(currentLocale === 'en' ? rotatingWords.en : rotatingWords.es);
  const rotatingWord = $derived(wordList[wordIndex % wordList.length]);
  const longestWord = $derived(wordList.reduce((acc, word) => (word.length > acc.length ? word : acc), wordList[0]));

  $effect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const update = () => {
      reduceMotion = mql?.matches ?? false;
    };

    update();
    mql?.addEventListener?.('change', update);
    return () => mql?.removeEventListener?.('change', update);
  });

  $effect(() => {
    // Keep index in range when locale changes.
    wordIndex = wordIndex % wordList.length;
  });

  $effect(() => {
    if (typeof window === 'undefined') return;

    // Not less than 2s between words.
    const intervalMs = reduceMotion ? 4000 : 3000;
    let intervalId: number | undefined;

    const tick = () => {
      wordIndex = (wordIndex + 1) % wordList.length;
    };

    const start = () => {
      if (intervalId) return;
      intervalId = window.setInterval(tick, intervalMs);
    };

    const stop = () => {
      if (!intervalId) return;
      window.clearInterval(intervalId);
      intervalId = undefined;
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    handleVisibility();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  });
</script>
  
<section id="about" class="section relative overflow-hidden bg-surface !py-24 shadow-[#081329_0px_25px_40px_20px]">
  <!-- Background lights -->
  <div class="pointer-events-none absolute inset-0 z-0">
    <div class="absolute inset-0 bg-gradient-to-b from-surface to-surface-container-low"></div>
    <div class="absolute -top-32 left-1/2 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(144,147,255,0.22),transparent_60%)] blur-2xl"></div>
    <div class="absolute -bottom-10 right-[-5rem] h-[25rem] w-[25rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,209,111,0.12),transparent_60%)] blur-2xl"></div>
  </div>

  <div class="relative z-10 max-w-6xl mx-auto px-4 md:px-0">
    <div class="grid gap-10 lg:grid-cols-[1.15fr_0.75fr] items-start">
      <!-- Editorial Hero -->
      <article class="min-w-0" transition:fade={{ duration: 600 }}>
        <div class="inline-flex items-center gap-2 rounded-full bg-surface-variant/60 backdrop-blur-md px-3 py-1.5 border border-outline-variant/20">
          <span class="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_24px_rgba(144,147,255,0.35)] animate-ping"></span>
          <span class="text-xs tracking-[0.24em] uppercase text-secondary font-semibold">
            {formatYears($locale === 'es' ? 'Mayo 2021' : 'May 2021', '', $locale === 'es' ? 'es' : 'en')} {$locale === 'en' ? 'Innovating' : 'Innovando'}
          </span>
        </div>

        <h1 class="mt-6 font-readex text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-on-surface leading-[0.95]">
          {$locale === 'en' ? 'Crafting Digital ' : 'Diseñando '}
          <span class="word-wrap" data-longest={longestWord}>
            {#key rotatingWord}
              <span
                class="word-current word-gradient"
                in:fade={{ duration: reduceMotion ? 0 : 160 }}
                out:fade={{ duration: reduceMotion ? 0 : 120 }}
              >
                {rotatingWord}
                <span class="text-on-surface -ml-3 md:-ml-4 lg:-ml-5">.</span>
              </span>
            {/key}
          </span>
        </h1>

        <p class="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-on-surface-variant">
          { $about.description }
        </p>

        <p class="mt-4 font-mono text-sm text-on-surface-variant/80">
          { $about.extra }
        </p>
        
        <div class="mt-8 flex flex-wrap items-center gap-2">
          <a href={`mailto:${$info.email}`} class="social-glass tooltip" aria-label="Email" title="Email">
            <Fa icon={faEnvelope} />
            <span class="tooltiptext text-base">Email</span>
          </a>
          <a href={$info.linkedin} target="_blank" rel="noopener noreferrer" class="social-glass tooltip" aria-label="LinkedIn" title="LinkedIn">
            <Fa icon={faLinkedinIn} />
            <span class="tooltiptext text-base">LinkedIn</span>
          </a>
          <a href={$info.github} target="_blank" rel="noopener noreferrer" class="social-glass tooltip" aria-label="GitHub" title="GitHub">
            <Fa icon={faGithub} />
            <span class="tooltiptext text-base">GitHub</span>
          </a>
          <a
            href={$info.card}
            target="_blank"
            rel="noopener noreferrer"
            class="social-glass tooltip"
            aria-label={$locale === 'en' ? 'Cover letter' : 'Carta de presentación'}
            title={$locale === 'en' ? 'Cover letter' : 'Carta de presentación'}
          >
            <Fa icon={faIdCard} />
            <span class="tooltiptext text-base">{$locale === 'en' ? 'Cover letter' : 'Carta de presentación'}</span>
          </a>
          <a href={$info.cv} target="_blank" rel="noopener noreferrer" class="resume-cta group" aria-label={$locale === 'en' ? 'Open resume' : 'Ver hoja de vida'}>
            <span class="flex items-center gap-2">
              <Fa icon={faAddressBook} />
              <span>{$locale === 'en' ? 'Open Resume' : 'Ver hoja de vida'}</span>
            </span>
            <Fa icon={faArrowRight} class="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="#contact" class="cta-primary">
            {$locale === 'en' ? 'Build something together' : 'Construyamos algo juntos'}
          </a>
          <a href="#experience" class="cta-secondary">
            {$locale === 'en' ? 'My background?' : '¿Mi experiencia?'}
          </a>
        </div>
      </article>

      <!-- Floating Profile Card -->
      <aside class="profile-card" transition:fade={{ duration: 600 }}>
        <p class="font-mono mb-4 text-xs md:text-sm text-on-surface-variant/90">
          &gt; { $about.salute }
          <span class="text-on-surface-variant/60 ml-2">// { $about.gag }</span>
        </p>
        <header class="flex items-start gap-4">
          <div class="relative shrink-0">
            <img
              src="{$info.image}"
              alt="Profile"
              class="h-20 w-20 md:h-24 md:w-24 rounded-2xl object-cover border border-outline-variant/50 shadow-[0_8px_16px_rgba(96,99,238,0.12)]"
              loading="eager"
              decoding="async"
            />
          </div>

          <div class="min-w-0">
            <p class="text-sm font-semibold text-secondary">{$about.title}</p>
            <p class="-mt-1 font-readex font-semibold text-xl lg:text-3xl text-on-surface leading-tight">
              {$info.name}
            </p>
            <p class="mt-2 text-sm font-mono text-on-surface-variant leading-tight hidden xl:block">
              <span class="text-secondary font-semibold">“</span>{ $about.slogan }<span class="text-secondary font-semibold">”</span>
            </p>
          </div>
        </header>

        <p class="mt-2 text-sm font-mono text-on-surface-variant leading-tight hidden lg:block xl:hidden">
          <span class="text-secondary font-semibold">“</span>{ $about.slogan }<span class="text-secondary font-semibold">”</span>
        </p>

        <div class="mt-6">
          <p class="text-xs tracking-[0.22em] uppercase text-on-surface-variant/70 font-semibold">
            Core Skill Set
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            {#each highlightSkills as skill (skill)}
              <span class="badge-glass">{@html skill}</span>
            {/each}
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>

<style lang="postcss">
  .cta-primary {
    @apply inline-flex items-center justify-center rounded-full;
    @apply px-6 md:px-7 py-3 md:py-3.5 text-sm md:text-base font-semibold;
    @apply bg-gradient-to-br from-primary to-primary-container text-surface;
    @apply shadow-[0_16px_32px_rgba(96,99,238,0.10)];
    @apply transition-all duration-300 hover:shadow-[0_24px_48px_rgba(96,99,238,0.16)] hover:-translate-y-0.5;
    @apply border border-primary/20;
  }

  .cta-secondary {
    @apply inline-flex items-center justify-center rounded-full;
    @apply px-6 md:px-7 py-3 md:py-3.5 text-sm md:text-base font-semibold;
    @apply bg-transparent text-secondary;
    @apply border border-secondary/20;
    @apply transition-all duration-300 hover:bg-surface-variant/40 hover:border-secondary/30 hover:-translate-y-0.5;
  }

  .social-glass {
    @apply relative inline-flex items-center justify-center h-11 w-11 md:h-12 md:w-12;
    @apply rounded-xl bg-surface-variant/40 backdrop-blur-md;
    @apply border border-outline-variant/20 text-on-surface-variant;
    @apply transition-all duration-300 hover:bg-surface-variant/60 hover:border-secondary/30 hover:text-secondary hover:-translate-y-0.5;
  }

  .profile-card {
    @apply rounded-2xl bg-surface-container/70 backdrop-blur-md;
    @apply p-6 md:p-8 my-auto;
    @apply shadow-[0_16px_32px_rgba(96,99,238,0.08)];
  }

  .profile-card::before {
    @apply rounded-2xl;
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/totk-doodles.webp');
    background-size: 250px;
    background-repeat: repeat;
    opacity: 0.05;
    filter: invert(1);
    mix-blend-mode: soft-light;
    pointer-events: none;
  }

  .badge-glass {
    @apply inline-flex items-center rounded-full;
    @apply px-3 py-1.5 text-xs md:text-xs font-mono;
    @apply bg-surface-container-high/50 backdrop-blur-md text-on-surface-variant;
    @apply border border-outline-variant/20;
  }

  .resume-cta {
    @apply inline-flex items-center justify-between gap-3;
    @apply rounded-xl px-4 py-3;
    @apply bg-surface-container-high/70 backdrop-blur-md;
    @apply border border-outline-variant/15 text-on-surface;
    @apply transition-all duration-300;
    @apply hover:bg-primary-container hover:text-surface-container-low hover:border-primary/30 hover:shadow-[0_16px_32px_rgba(96,99,238,0.10)] hover:-translate-y-0.5;
  }

  .word-gradient {
    @apply bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent;
  }

  .word-wrap {
    display: inline-grid;
  }

  /* Reserve space for the longest word to avoid layout shift (width/height). */
  .word-wrap::before {
    content: attr(data-longest);
    grid-area: 1 / 1;
    visibility: hidden;
    white-space: nowrap;
  }

  .word-current {
    @apply inline-block;
    grid-area: 1 / 1;
    white-space: nowrap;
  }
</style>
