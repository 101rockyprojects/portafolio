<script lang="ts">
    import { locale } from 'svelte-i18n';
    import { i18nStores } from '@App/stores/data.ts';
    
  const { nav, educations } = i18nStores;
</script>
  
<section id="education" class="section relative w-full overflow-hidden bg-surface-container-low !py-24 md:!py-28">
  <!-- Background lights -->
  <div class="pointer-events-none absolute inset-0 z-0">
    <div class="absolute top-64 left-1/3 h-28 w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(100,200,100,0.25),transparent_60%)] blur-2xl"></div>
    <div class="absolute bottom-20 -right-[8rem] h-[14rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(100,20,200,0.25),transparent_60%)] blur-2xl"></div>
  </div>

  <aside class="comment text-start top-0 mt-4">
    <pre class="ml-[8dvw] lg:ml-[20dvw]">
      &lbrace;

        &quot;{$nav.education}&quot;: &lbrace;
        {#each $educations as education}
          &quot;{education.title}&quot;,
        {/each}
        &rbrace;
        
      &rbrace;
    </pre>
  </aside>
  <div class="pointer-events-none absolute inset-0 -z-10">
    <div class="absolute inset-0 bg-gradient-to-b from-surface-container-low to-surface"></div>
    <div class="absolute -top-44 right-[-12rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(221,183,255,0.12),transparent_60%)] blur-2xl"></div>
  </div>

  <div class="max-w-6xl mx-auto px-4 md:px-0">
    <header class="flex flex-col gap-6">
      <div class="inline-flex items-center gap-2 rounded-full bg-surface-variant/60 backdrop-blur-md px-3 py-1.5 border border-outline-variant/20 w-fit">
        <span class="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_24px_rgba(221,183,255,0.22)] animate-ping"></span>
        <span class="text-[11px] tracking-[0.24em] uppercase text-on-surface-variant font-semibold">
          {$locale === 'en' ? 'Status: Learning...' : 'Estado: estudiando...'}
        </span>
      </div>

      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <h2 class="font-readex text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface">
          <span class="text-secondary font-mono">&lt;</span>{$nav.education}<span class="text-secondary font-mono">/&gt;</span>
        </h2>
        <p class="max-w-xl text-on-surface-variant leading-relaxed">
          {$locale === 'en'
            ? 'The education that shaped my engineering profile.'
            : 'Formación que moldeó mi perfil ingenieril.'}
        </p>
      </div>
    </header>

    <div class="education-grid">
      {#each $educations as education}
        <article class="education-card">
          <header class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <h3 class="card-title">{education.institution}</h3>
              <p class="card-subtitle">
                {education.title}
              </p>

              <div class="mt-5 space-y-2">
                <div class="meta-line">
                  <span class="meta-icon" aria-hidden="true">🗓</span>
                  <time datetime={education.finalDate} class="meta-text">
                    {education.initialDate} — {education.finalDate}
                  </time>
                </div>
                <!-- <div class="meta-line">
                  <span class="meta-icon" aria-hidden="true">📍</span>
                  <span class="meta-text">{education.country}</span>
                </div> -->
              </div>
            </div>

            <div class="logo-badge" aria-hidden="true">
              <img
                src={education.logo}
                alt=""
                class="h-10 w-10 md:h-11 md:w-11 object-contain"
                loading="lazy"
              />
            </div>
          </header>

          {#if education.description}
            <p class="card-description">{education.description}</p>
          {/if}

          {#if education.type === 'language' && education.level}
            <div class="level-badge">
              <span class="text-[11px] tracking-[0.22em] uppercase font-semibold text-on-surface-variant/70">
                {$locale === 'en' ? 'Level' : 'Nivel'}
              </span>
              <span class="font-semibold text-on-surface">{education.level}</span>
            </div>
          {/if}
        </article>
      {/each}
    </div>
  </div>
</section>

<style lang="postcss">
  .education-grid {
    @apply mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto;
  }

  .education-card {
    @apply relative rounded-2xl;
    @apply bg-surface-container/65 backdrop-blur-md;
    @apply border border-outline-variant/15;
    @apply p-6 md:p-7;
    @apply shadow-[0_16px_32px_rgba(96,99,238,0.08)];
    @apply transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_48px_rgba(96,99,238,0.10)];
    @apply space-y-5;
  }

  .logo-badge {
    @apply inline-flex items-center justify-center;
    @apply h-12 w-12 md:h-14 md:w-14 rounded-2xl;
    @apply bg-surface-variant/40 backdrop-blur-md;
    @apply border border-outline-variant/20;
  }

  .card-title {
    @apply font-readex text-lg md:text-xl font-bold text-on-surface leading-snug;
  }

  .card-subtitle {
    @apply mt-2 text-sm md:text-base font-semibold text-secondary;
  }

  .meta-line {
    @apply flex items-center gap-2;
  }

  .meta-icon {
    @apply text-on-surface-variant/70;
  }

  .meta-text {
    @apply text-sm text-on-surface-variant;
  }

  .card-description {
    @apply text-sm md:text-base text-on-surface-variant leading-relaxed;
  }

  .level-badge {
    @apply inline-flex items-center justify-between gap-3;
    @apply rounded-xl px-4 py-3;
    @apply bg-surface-container-high/35;
    @apply border border-outline-variant/15;
  }
</style>
