import { readable } from 'svelte/store';
import infoData from '@Shared/Domain/data.ts';

const info = readable({
  ...infoData.info,
  api_key: import.meta.env.VITE_SVELTEMAIL_API_KEY,
});

export default info;

