<script lang="ts">
    import { locale } from 'svelte-i18n';
    import { get } from 'svelte/store';
    import info from '@App/components/stores/info.ts';
    import { i18nStores } from '@App/components/stores/i18n-data.ts';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { faCheck } from '@fortawesome/free-solid-svg-icons';

    const { nav } = i18nStores;
    const { api_key } = get(info);
    let formData = {
      name: "",
      email: "",
      message: ""
    };
    
    let sended = false;

    const handleSubmit = async (event: Event) => {
      event.preventDefault();
      const json = JSON.stringify({
        access_key: api_key,
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
        }
      } catch (error) {
        console.error(error);
      }
      sended = true;
    }
  </script>
  
<hr class="w-5/6 mx-auto opacity-20">
<aside class="w-full pl-[10%]">
  <img src="/images/logo.png" alt="Personal Logo Signature" class="w-48 h-full opacity-20">
</aside>
<section id="contact" class="section -mt-[11rem] mb-10">
  <h2 class="section-title pt-4">&lt;{$nav.contact}/&gt;</h2>
  <article class="max-w-xl mx-auto">
    <form onsubmit={handleSubmit} class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-400">
          {$locale === 'en' ? 'Name' : 'Nombre'}
        </label>
        <input
          type="text"
          id="name"
          bind:value={formData.name}
          required
          class="mt-1 block w-full rounded-md text-elegant shadow-sm border-2 focus:border-caramel focus:ring-0"
        />
      </div>
      
      <div>
        <label for="email" class="block text-sm font-medium text-gray-400">
          {$locale === 'en' ? 'Email' : 'Correo electrónico'}
        </label>
        <input
          type="email"
          id="email"
          bind:value={formData.email}
          required
          class="mt-1 block w-full rounded-md text-elegant shadow-sm border-2 focus:border-caramel focus:ring-0"
        />
      </div>
      
      <div>
        <label for="message" class="block text-sm font-medium text-gray-400">
          {$locale === 'en' ? 'Message' : 'Mensaje'}
        </label>
        <textarea
          id="message"
          bind:value={formData.message}
          rows="4"
          required
          class="mt-1 block w-full rounded-md text-elegant shadow-sm border-2 focus:border-caramel focus:ring-0"
        ></textarea>
      </div>
      
      <button
        type="submit"
        class={`
          ${sended ? 'bg-green-600' : 'bg-ocean'}
          w-full btn-default flex justify-center readex-bold gap-2 text-white hover:bg-gold hover:text-elegant
        `}
      >
        {#if sended}
          {$locale === 'en' ? 'Message sent' : 'Mensaje enviado'}
          <FontAwesomeIcon icon={faCheck} class="text-lg" />
        {:else}
          {$locale === 'en' ? 'Send message' : 'Enviar mensaje'}
        {/if}
      </button>
    </form>
  </article>
</section>