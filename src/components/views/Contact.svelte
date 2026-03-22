<script lang="ts">
    import { locale } from 'svelte-i18n';
    import info from '@App/stores/info.ts';
    import { i18nStores } from '@App/stores/data.ts';
    import { Fa } from 'svelte-fa';
    import { faAt, faCheck, faLocationDot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
    import { fade } from 'svelte/transition';

    const { nav } = i18nStores;
    
    let formData = {
      name: "",
      email: "",
      message: ""
    };
    
    let sended = false;
    let isLoading = false;

    const handleSubmit = async (event: Event) => {
      event.preventDefault();
      isLoading = true;
      const json = JSON.stringify({
        access_key: $info.api_key,
        ...formData
      });
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: json
        });
        const result = await response.json();
        if (result.success) {
          formData = { name: '', email: '', message: '' };
          sended = true;
          setTimeout(() => {
            sended = false;
          }, 3000);
        }
      } catch (error) {
        console.error(error);
      } finally {
        isLoading = false;
      }
    }
</script>
  
<section id="contact" class="section contact-container relative overflow-hidden bg-surface !py-16">
  <div class="pointer-events-none absolute inset-0 -z-10">
    <div class="absolute inset-0 bg-gradient-to-b from-surface to-surface-container-low"></div>
    <div class="absolute -top-40 right-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(144,147,255,0.18),transparent_60%)] blur-2xl"></div>
    <div class="absolute -bottom-48 left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,209,111,0.10),transparent_60%)] blur-2xl"></div>
  </div>

  <div class="max-w-6xl mx-auto px-4 md:px-0">
    <div class="grid gap-12 lg:grid-cols-2 items-center">
      <!-- Left: Editorial Copy -->
      <article class="min-w-0">
        <div class="inline-flex items-center gap-2 rounded-full bg-surface-variant/60 backdrop-blur-md px-3 py-1.5 border border-outline-variant/20 w-fit">
          <span class="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_24px_rgba(144,147,255,0.30)] animate-ping"></span>
          <span class="text-[11px] tracking-[0.24em] uppercase text-on-surface-variant font-semibold">
            {$nav.contact}
          </span>
        </div>

        <h2 class="mt-6 font-readex text-5xl md:text-6xl font-bold tracking-tight text-on-surface">
          {$locale === 'en' ? 'Ready to ' : '¿Listo para '}
          <span class="text-secondary">{$locale === 'en' ? 'Evolve' : 'Innovar'}</span>{$locale === 'en' ? '?' : '?'}
        </h2>

        <p class="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-on-surface-variant">
          {$locale === 'en'
            ? 'Let’s build something that stands out in the digital noise. High tech meets high design. Small ideas lead to great systems.'
            : 'Construyamos algo que destaque en el ruido digital. Alta tecnología con alto diseño. Pequeñas ideas llevan a grandes sistemas.'}
        </p>

        <div class="flex flex-col mt-10 space-y-4">
          <a href={`mailto:${$info.email}`} class="contact-line">
            <span class="contact-icon">
              <Fa icon={faAt} />
            </span>
            <span class="contact-text">{$info.email}</span>
          </a>

          <div class="contact-line" aria-label={$locale === 'en' ? 'Location: Remote' : 'Ubicación: Remoto'}>
            <span class="contact-icon">
              <Fa icon={faLocationDot} />
            </span>
            <span class="contact-text">
              {$locale === 'en' ? 'Remote' : 'Remoto'}
            </span>
          </div>
        </div>
      </article>

      <!-- Right: Form Card -->
      <form on:submit={handleSubmit} class="contact-card">
        <div class="space-y-5">
          <div class="form-group">
            <label for="name" class="form-label">
              {$locale === 'en' ? 'Name' : 'Nombre'}
            </label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              placeholder={$locale === 'en' ? 'Jane Doe' : 'Juan Pérez'}
              required
              class="form-input"
              disabled={isLoading || sended}
            />
          </div>

          <div class="form-group">
            <label for="email" class="form-label">
              {$locale === 'en' ? 'Email' : 'Email'}
            </label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              placeholder={$locale === 'en' ? 'you@example.com' : 'tu@ejemplo.com'}
              required
              class="form-input"
              disabled={isLoading || sended}
            />
          </div>

          <div class="form-group">
            <label for="message" class="form-label">
              {$locale === 'en' ? 'Message' : 'Mensaje'}
            </label>
            <textarea
              id="message"
              bind:value={formData.message}
              placeholder={$locale === 'en' ? 'Tell me what you want to build…' : 'Cuéntame qué quieres construir…'}
              rows="5"
              required
              class="form-input resize-none"
              disabled={isLoading || sended}
            ></textarea>
          </div>
        </div>

        <div class="mt-7">
          {#if !sended}
            <button type="submit" disabled={isLoading} class="submit-btn">
              <span class="flex items-center gap-2 justify-center">
                <Fa icon={faPaperPlane} class={isLoading ? 'animate-spin' : ''} />
                <span class="tracking-wider uppercase">
                  {isLoading
                    ? ($locale === 'en' ? 'Sending…' : 'Enviando…')
                    : ($locale === 'en' ? 'Contact Me' : 'Contactarme')}
                </span>
              </span>
            </button>
          {:else}
            <div class="success-message" transition:fade={{ duration: 300 }} aria-live="polite">
              <Fa icon={faCheck} class="text-xl" />
              <span class="tracking-wide">
                {$locale === 'en' ? 'Message sent.' : 'Mensaje enviado.'}
              </span>
            </div>
          {/if}
        </div>
      </form>
    </div>
  </div>
</section>

<style lang="postcss">
  .contact-container {
    @apply bg-gradient-to-b from-secondary/10 to-surface-container-low;
    @apply backdrop-blur-md;
    @apply border-b border-outline-variant/15;
    @apply shadow-[0_16px_32px_rgba(0,0,0,0.18)];
    @apply relative overflow-hidden;
  }

  .contact-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/totk-doodles.webp');
    background-size: 300px;
    background-repeat: repeat;
    opacity: 0.07;
    filter: invert(1);
    mix-blend-mode: soft-light;
    pointer-events: none;
  }

  .contact-card {
    @apply rounded-2xl;
    @apply bg-gold/5;
    @apply border border-gold/15;
    @apply p-6 md:p-8;
    @apply shadow-[0_16px_32px_rgba(96,99,238,0.08)];
  }

  .form-group {
    @apply space-y-2;
  }

  .form-label {
    @apply block text-[11px] md:text-xs font-semibold;
    @apply tracking-[0.22em] uppercase;
    @apply text-on-surface-variant/70;
  }

  .form-input {
    @apply w-full px-4 py-3 rounded-xl;
    @apply bg-surface-container-lowest/90 text-on-surface placeholder:text-on-surface-variant/40;
    @apply border border-outline-variant/20;
    @apply transition-all duration-200;
    @apply focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20;
    @apply disabled:opacity-60 disabled:cursor-not-allowed;
  }

  .submit-btn {
    @apply w-full py-3.5 rounded-xl font-semibold text-sm md:text-base;
    @apply bg-gradient-to-br from-primary to-primary-container text-surface;
    @apply border border-primary/20;
    @apply transition-all duration-300 hover:-translate-y-0.5;
    @apply hover:shadow-[0_24px_48px_rgba(96,99,238,0.14)];
    @apply disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0;
  }

  .success-message {
    @apply flex items-center justify-center gap-3;
    @apply w-full py-3.5 rounded-xl;
    @apply bg-surface-variant/40 text-secondary;
    @apply font-semibold text-sm md:text-base border border-outline-variant/20;
  }

  .contact-line {
    @apply inline-flex items-center gap-3;
    @apply text-on-surface-variant;
    @apply transition-colors duration-200 hover:text-on-surface;
  }

  .contact-icon {
    @apply inline-flex items-center justify-center h-10 w-10;
    @apply rounded-xl bg-surface-variant/40 backdrop-blur-md;
    @apply border border-outline-variant/20;
    @apply text-secondary;
  }

  .contact-text {
    @apply font-semibold;
  }
</style>
