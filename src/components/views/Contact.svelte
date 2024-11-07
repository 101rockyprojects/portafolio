<script lang="ts">
    import { locale } from 'svelte-i18n';
    import { i18nStores } from '@App/components/stores/i18n-data.ts';
    
    const { nav, about } = i18nStores;
    let formData = $state({
      name: '',
      email: '',
      message: ''
    });
    
    function handleSubmit() {
      const myemail = $about.email;
      const subject = `Vi tu Portafolio - ${formData.name}`;
      const body = formData.message;
      window.location.href = `mailto:${myemail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  </script>
  
  <section id="contact" class="section">
    <h2 class="section-title">{$nav.contact}</h2>
    <div class="max-w-xl mx-auto">
      <form onsubmit={handleSubmit} class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$locale === 'en' ? 'Name' : 'Nombre'}
          </label>
          <input
            type="text"
            id="name"
            bind:value={formData.name}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-blue-400 dark:focus:ring-orange-600 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$locale === 'en' ? 'Email' : 'Correo electrónico'}
          </label>
          <input
            type="email"
            id="email"
            bind:value={formData.email}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-blue-400 dark:focus:ring-orange-600 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {$locale === 'en' ? 'Message' : 'Mensaje'}
          </label>
          <textarea
            id="message"
            bind:value={formData.message}
            rows="4"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-blue-400 dark:focus:ring-orange-600 dark:bg-gray-700 dark:border-gray-600"
          ></textarea>
        </div>
        
        <button type="submit" class="w-full btn-primary flex justify-center readex-bold">
          {$locale === 'en' ? 'Send message' : 'Enviar mensaje'}
        </button>
      </form>
    </div>
  </section>