import { readable } from 'svelte/store';
import infoData from '@Shared/Domain/data.ts';

infoData.info.api_key = import.meta.env.VITE_SVELTEMAIL_API_KEY;
const info = readable(infoData.info);

export default info;