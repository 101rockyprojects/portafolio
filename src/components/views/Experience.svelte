<script lang="ts">
	import { Fa } from 'svelte-fa';
	import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
  import { i18nStores } from '@App/stores/data.ts';
  import { locale } from 'svelte-i18n';
  import { formatYears } from '@Shared/Domain/functions/formatYears.ts';
    
  const { nav, experiences } = i18nStores;
</script>

<section id="experience" class="section experience-container relative overflow-hidden !py-24 md:!py-28">
  <aside class="comment text-start top-0 min-w-fit">
    <div class="relative border-l-4 ml-[40dvw] md:ml-[24dvw] mt-2 pt-1 pl-4 border-white rounded-xl">
      <div class="absolute w-5 h-5 bg-white rounded-full -left-[12px] top-0"></div>
      <div class="absolute w-3 h-3 bg-surface rounded-full -left-[8px] top-1"></div>
      <div class="absolute w-5 h-5 bg-white rounded-full -left-[12px] top-11"></div>
      <div class="absolute w-3 h-3 bg-surface rounded-full -left-[8px] top-12"></div>
      <div class="absolute w-[0.4rem] h-[0.4rem] bg-surface rounded-full -left-[5px] top-[5.9rem]"></div>
      <pre class="flex flex-col flex-wrap gap-1 text-mono">
        <span class="leading-tight md:leading-none">hotfix:Remove exposed API_KEY</span>
        <p class="text-xs leading-relaxed md:leading-tight">Oops, removed from app.css</p>
        <span class="leading-tight md:leading-none">Make the best portfolio</span>
        <p class="text-xs leading-relaxed md:leading-tight">Add some text and color</p>
      </pre>
    </div>
  </aside>

  <div class="pointer-events-none absolute inset-0 -z-10">
    <div class="absolute inset-0 bg-gradient-to-b from-surface to-surface-container-low"></div>
    <div class="absolute -top-40 left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(144,147,255,0.14),transparent_60%)] blur-2xl"></div>
  </div>

  <div class="max-w-6xl mx-auto px-4 md:px-0">
    <header class="flex flex-col gap-6">
      <div class="inline-flex items-center gap-2 rounded-full bg-surface-variant/60 backdrop-blur-md px-3 py-1.5 border border-outline-variant/20 w-fit">
        <span class="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_24px_rgba(144,147,255,0.30)]"></span>
        <span class="text-[11px] tracking-[0.24em] uppercase text-on-surface-variant font-semibold">
          {$locale === 'en' ? 'git init Engineering' : 'git init Ingeniería'}
        </span>
      </div>

      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <h2 class="font-readex text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface">
          {$nav.experience}<span class="text-secondary">.</span>
        </h2>
        <p class="max-w-xl text-on-surface-variant leading-relaxed">
          {$locale === 'en'
            ? 'A look back at my technical career in real production environments.'
            : 'Un repaso por mi recorrido técnico en entornos de producción reales.'}
        </p>
      </div>
    </header>

    <div class="mt-10 space-y-8">
      {#each $experiences as experience, idx}
        <article class="experience-row">
          <div class="timeline-line"></div>
          <div class="timeline-dot" aria-hidden="true"></div>
          <div class="experience-left">
            <div class="company-card">
              <div class="flex items-start justify-between gap-4">
                <div class="min-w-0">
                  <p class="text-[11px] tracking-[0.22em] uppercase text-on-surface-variant/70 font-semibold">
                    {$locale === 'en' ? 'Company' : 'Empresa'}
                  </p>
                  <h3 class="mt-2 font-readex text-xl md:text-2xl font-bold text-secondary leading-tight truncate">
                    {experience.company}
                  </h3>
                  <a
                    href={experience.companyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-secondary transition-colors"
                  >
                    {experience.companyLink.replace(/(^\w+:|^)\/\//, '')}
                    <Fa icon={faExternalLink} size="0.85x" />
                  </a>
                </div>

                <span class="index-badge" aria-label={$locale === 'en' ? 'Experience index' : 'Índice de experiencia'}>
                  {"v.1.0." + String(idx + 1)}
                </span>
              </div>

              <div class="mt-6 space-y-3">
                <div class="meta-row">
                  <span class="meta-key">{$locale === 'en' ? 'Deployment phase' : 'Fase de despliegue'}</span>
                  <span class="meta-val">
                    {experience.initialDate} → {experience.finalDate ?? ($locale === 'en' ? 'Present' : 'Actualidad')}
                  </span>
                </div>
                <div class="meta-row">
                  <span class="meta-key">{$locale === 'en' ? 'Service time' : 'Tiempo de servicio'}</span>
                  <span class="meta-val text-on-surface">
                    {formatYears(experience.initialDate, experience.finalDate, $locale ?? 'es')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="experience-right">
            <div class="role-card">
              <div class="flex items-start justify-between gap-4">
                <div class="min-w-0">
                  <p class="text-[11px] tracking-[0.22em] uppercase text-secondary/80 font-semibold">
                    {$locale === 'en' ? 'Role' : 'Rol'}
                  </p>
                  <h4 class="mt-2 font-mono text-xl md:text-2xl font-semibold text-on-surface leading-snug">
                    {experience.title}
                  </h4>
                </div>

                <span class="status-pill">
                  {$locale === 'en' ? 'JUNIOR TO MID' : 'JUNIOR A SEMISENIOR'}
                </span>
              </div>

              {#if experience.description?.length}
                <ul class="mt-6 space-y-4">
                  {#each experience.description as paragraph (paragraph)}
                    <li class="desc-item">
                      <span class="desc-icon" aria-hidden="true"></span>
                      <p class="text-sm md:text-base text-on-surface-variant leading-relaxed">
                        {paragraph}
                      </p>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style lang="postcss">
  .experience-container {
    @apply bg-gradient-to-b from-secondary/10 to-surface-container-low;
    @apply backdrop-blur-md;
    @apply border-y border-gold/15;
    @apply shadow-[0_16px_32px_rgba(0,0,0,0.18)];
    @apply relative overflow-hidden;
  }

  .experience-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/totk-doodles.webp');
    background-size: 340px;
    background-repeat: repeat;
    opacity: 0.1;
    filter: invert(1);
    mix-blend-mode: soft-light;
    pointer-events: none;
  }

  .experience-row {
    @apply relative grid gap-6 lg:gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start;
  }

  .experience-left {
    @apply pl-8;
  }

  .timeline-line {
    @apply absolute left-3 top-2 bottom-2 w-[0.125rem] bg-primary/20 h-[105%] rounded;
  }

  .timeline-dot {
    @apply absolute left-2 top-0 h-2.5 w-2.5 rounded-full;
    @apply bg-primary;
    @apply shadow-[0_0_24px_rgba(144,147,255,0.25)];
  }

  .company-card {
    @apply rounded-2xl bg-surface-container/65 backdrop-blur-md;
    @apply border border-outline-variant/15;
    @apply p-5 md:p-6;
    @apply shadow-[0_10px_32px_rgba(240,180,15,0.08)];
  }

  .index-badge {
    @apply inline-flex items-center justify-center;
    @apply h-6 w-fit px-4 rounded-full;
    @apply bg-surface-variant/60 backdrop-blur-md;
    @apply border border-outline-variant/20;
    @apply font-mono text-xs md:text-sm font-semibold text-on-surface;
  }

  .meta-row {
    @apply flex items-baseline justify-between gap-4;
  }

  .meta-key {
    @apply text-[11px] tracking-[0.22em] uppercase text-on-surface-variant/60 font-semibold;
  }

  .meta-val {
    @apply text-sm font-semibold text-on-surface-variant text-end leading-none;
  }

  .experience-right {
    @apply min-w-0;
  }

  .role-card {
    @apply rounded-2xl bg-transparent lg:bg-surface-container/65 lg:backdrop-blur-md;
    @apply lg:border border-outline-variant/15;
    @apply pl-10 lg:p-7;
    @apply lg:shadow-[0_10px_32px_rgba(240,180,15,0.08)];
  }

  .status-pill {
    @apply hidden md:inline-flex items-center justify-center;
    @apply px-3 py-2 rounded-full;
    @apply bg-surface-variant/40 border border-outline-variant/20;
    @apply text-[10px] tracking-[0.22em] uppercase font-semibold text-on-surface-variant;
    @apply whitespace-nowrap;
  }

  .desc-item {
    @apply flex gap-3;
  }

  .desc-icon {
    @apply mt-2 h-2.5 w-2.5 rounded-full flex-shrink-0;
    @apply bg-secondary/80;
    @apply shadow-[0_0_18px_rgba(255,209,111,0.18)];
  }
</style>
