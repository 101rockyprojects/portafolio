import { mount } from 'svelte'
import './app.css'
import App from '@App/App.svelte'
import { init } from 'svelte-i18n';

init({
  fallbackLocale: 'es',
  initialLocale: 'es',
});

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
