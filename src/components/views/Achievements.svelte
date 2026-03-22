<script lang="ts">
  import { i18nStores } from '@App/stores/data.ts';
  import { locale } from 'svelte-i18n';
  import Fa from 'svelte-fa';
  import { faAward, faExternalLink, faTimes } from '@fortawesome/free-solid-svg-icons';
  import { onDestroy } from 'svelte';

  const { nav, achievements } = i18nStores;

  let showModal = false;
  let selectedAchievement: any = null;
  let dialogEl: HTMLDialogElement | null = null;
  let prevHtmlOverflow: string | null = null;
  let prevBodyOverflow: string | null = null;

  function openModal(achievement: any) {
    selectedAchievement = achievement;
    showModal = true;
    queueMicrotask(() => {
      if (!dialogEl || dialogEl.open) return;
      try {
        dialogEl.showModal();
      } catch {
        // no-op: avoid crashing if showModal() is not allowed
      }
    });
  }

  function closeModal() {
    if (dialogEl?.open) {
      dialogEl.close();
      return;
    }
    showModal = false;
    selectedAchievement = null;
  }

  function lockPageScroll() {
    if (typeof document === 'undefined') return;
    if (prevHtmlOverflow === null) prevHtmlOverflow = document.documentElement.style.overflow;
    if (prevBodyOverflow === null) prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function unlockPageScroll() {
    if (typeof document === 'undefined') return;
    if (prevHtmlOverflow !== null) document.documentElement.style.overflow = prevHtmlOverflow;
    if (prevBodyOverflow !== null) document.body.style.overflow = prevBodyOverflow;
    prevHtmlOverflow = null;
    prevBodyOverflow = null;
  }

  function handleDialogClose() {
    showModal = false;
    selectedAchievement = null;
  }

  function handleDialogClick(event: MouseEvent) {
    if (event.target === dialogEl) closeModal();
  }

  $: if (showModal) lockPageScroll();
  $: if (!showModal) unlockPageScroll();

  onDestroy(() => {
    unlockPageScroll();
  });
</script>

<section id="achievements" class="section relative overflow-hidden bg-surface !py-24 md:!py-28">
  <aside class="comment text-start top-4 left-0">
    <pre class="ml-[8dvw] lg:ml-[20dvw]">
      curl --user "rocky:xxxxxxxxx" --request POST --data '&lbrace;
        {#each $achievements as achievement}
          &quot;&#123;{achievement.title}&#125;&quot;
        {/each}
      &rbrace;'
    </pre>
  </aside>

  <div class="pointer-events-none absolute inset-0 -z-10">
    <div class="absolute inset-0 bg-gradient-to-b from-surface to-surface-container-low"></div>
    <div class="absolute -top-48 left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,209,111,0.10),transparent_60%)] blur-2xl"></div>
  </div>

  <div class="max-w-6xl mx-auto px-4 md:px-0">
    <header class="flex flex-col gap-6">
      <div class="inline-flex items-center gap-2 rounded-full bg-surface-variant/60 backdrop-blur-md px-3 py-1.5 border border-outline-variant/20 w-fit">
        <span class="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_24px_rgba(255,209,111,0.22)]"></span>
        <span class="text-[11px] tracking-[0.24em] uppercase text-on-surface-variant font-semibold">
          {$locale === 'en' ? 'Response:' : 'Respuesta:'}
        </span>
      </div>

      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <h2 class="font-readex text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface">
          <span class="text-secondary font-mono">&lt;</span>{$nav.achievements}<span class="text-secondary font-mono">/&gt;</span>
        </h2>
        <p class="max-w-xl text-on-surface-variant leading-relaxed">
          {$locale === 'en'
            ? 'Awards, and measurable progress.'
            : 'Hitos, reconocimientos y progreso medible.'}
        </p>
      </div>
    </header>

    <div class="achievements-grid">
      {#each $achievements as achievement, idx}
        <button
          type="button"
          class="achievement-card group"
          onclick={() => openModal(achievement)}
          title={achievement.title}
        >
          <div class="icon-ring" aria-hidden="true">
            <Fa icon={faAward} class="text-2xl text-secondary group-hover:text-gold transition-colors duration-300" />
          </div>

          <div class="min-w-0 text-center">
            <p class="badge-kicker">
              {$locale === 'en' ? 'Award' : 'Logro'} #{String(idx + 1).padStart(2, '0')}
            </p>
            <h3 class="badge-title">{achievement.title}</h3>
          </div>
        </button>
      {/each}
    </div>
  </div>

</section>

{#if selectedAchievement}
  <dialog
    bind:this={dialogEl}
    class="modal-layer"
    onclose={handleDialogClose}
    onclick={handleDialogClick}
    aria-label={$locale === 'en' ? 'Achievement details' : 'Detalle del logro'}
  >
    <div class="modal-content" role="dialog" aria-modal="true">
      <button type="button" class="modal-close" onclick={closeModal} aria-label={$locale === 'en' ? 'Close' : 'Cerrar'}>
        <Fa icon={faTimes} class="text-xl text-secondary hover:text-on-surface transition-colors duration-200" />
      </button>

      {#if selectedAchievement.image}
        <img src={selectedAchievement.image} alt={selectedAchievement.title} class="modal-image" loading="lazy" />
      {/if}

      {#if selectedAchievement.link}
        <a href={selectedAchievement.link} target="_blank" rel="noopener noreferrer" class="modal-title">
          <h3 class="min-w-0">{selectedAchievement.title}</h3>
          <Fa icon={faExternalLink} class="text-lg" />
        </a>
      {:else}
        <div class="modal-title">
          <h3 class="min-w-0">{selectedAchievement.title}</h3>
        </div>
      {/if}

      {#if selectedAchievement.description?.length}
        <div class="modal-description">
          {#each selectedAchievement.description as paragraph}
            <p>{paragraph}</p>
          {/each}
        </div>
      {/if}
    </div>
  </dialog>
{/if}

<style lang="postcss">
  .achievements-grid {
    @apply mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6;
  }

  .achievement-card {
    @apply rounded-2xl;
    @apply bg-surface-container/65 backdrop-blur-md;
    @apply border border-outline-variant/15;
    @apply p-6 md:p-7;
    @apply flex flex-col items-center justify-center gap-4;
    @apply transition-all duration-500 cursor-pointer;
    @apply hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_48px_rgba(96,99,238,0.10)];
  }

  .icon-ring {
    @apply h-14 w-14 rounded-full;
    @apply bg-surface-variant/40 backdrop-blur-md;
    @apply border border-outline-variant/20;
    @apply flex items-center justify-center;
    @apply transition-transform duration-300 group-hover:scale-105;
  }

  .badge-kicker {
    @apply text-[11px] tracking-[0.22em] uppercase font-semibold;
    @apply text-on-surface-variant/70;
  }

  .badge-title {
    @apply mt-2 font-readex font-semibold text-base md:text-lg;
    @apply text-on-surface leading-snug line-clamp-4;
    @apply group-hover:text-secondary transition-colors duration-300;
  }

  .modal-layer {
    @apply z-[9999] p-0 m-0 border-0;
    @apply w-[100dvw] h-[100dvh] max-w-none max-h-none;
    @apply bg-transparent;
    display: grid;
    place-items: center;
    overflow: visible;
    isolation: isolate;
  }

  .modal-content {
    @apply relative z-10 max-w-[90dvw] md:max-w-2xl w-full max-h-[85dvh] overflow-y-auto;
    @apply rounded-2xl bg-surface-container/80 backdrop-blur-md;
    @apply border border-outline-variant/15;
    @apply p-6 md:p-8;
    @apply shadow-[0_24px_48px_rgba(0,0,0,0.35)];
    @apply text-on-surface;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }

  .modal-layer::backdrop {
    @apply bg-black/70;
    backdrop-filter: blur(6px);
  }

  .modal-close {
    @apply absolute top-4 right-4 z-10;
    @apply h-10 w-10 rounded-xl;
    @apply bg-surface-variant/40 border border-outline-variant/20;
    @apply flex items-center justify-center;
    @apply transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/30;
  }

  .modal-image {
    @apply w-auto h-64 object-contain rounded-xl mb-6 mx-auto;
  }

  .modal-title {
    @apply flex items-center justify-between gap-3 mb-4;
    @apply font-readex text-2xl md:text-3xl font-bold;
    @apply text-secondary hover:text-on-surface transition-colors duration-200;
  }

  .modal-description {
    @apply space-y-3 text-sm md:text-base text-on-surface-variant;
    @apply leading-relaxed;
  }
</style>
