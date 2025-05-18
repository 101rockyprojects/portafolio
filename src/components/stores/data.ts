import { derived, writable } from 'svelte/store';
import { locale } from 'svelte-i18n';
import data from '@Shared/Domain/data.ts';
import type { Readable } from 'svelte/store';
import type { Nav } from '@App/Shared/Domain/types/nav.ts';
import type { About } from '@App/Shared/Domain/types/about.ts';
import type { Project } from '@App/Shared/Domain/types/project.ts';
import type { Experience } from '@App/Shared/Domain/types/experience.ts';
import type { Education } from '@App/Shared/Domain/types/education.ts';
import type { Hobby } from '@App/Shared/Domain/types/hobby.ts';
import type { Achievement } from '@App/Shared/Domain/types/achievement.ts';
import type { Recommendation } from '@App/Shared/Domain/types/recommendation.ts';

// Helper function to create an i18n store
export function createStore<T>(section: keyof (typeof data)['es']): Readable<T> {
  return derived(locale, ($locale = 'es') => {
    return data[$locale ?? 'es']?.[section] as T;
  });
}

// Stores for each section
export const i18nStores = {
  nav: createStore<Nav>('nav'),
  about: createStore<About>('about'),
  projects: createStore<Project[]>('projects'),
  experiences: createStore<Experience[]>('experience'),
  educations: createStore<Education[]>('education'),
  hobbies: createStore<Hobby[]>('hobbies'),
  achievements: createStore<Achievement[]>('achievements'),
  recommendations: createStore<Recommendation[]>('recommendations'),
} as const;

// Helper function to get a section store in type-safe
export function getSection<K extends keyof (typeof data)['en']>(section: K): Readable<(typeof data)['es'][K]> {
  return createStore(section);
}

export const tool = writable<string>('Tools');
locale.subscribe(($locale) => {
  tool.set($locale === 'es' ? 'Herramientas' : 'Tools');
});

export const categories: Readable<Record<string, string>> = derived(tool, ($tool) => ({
  "Back": "Backend",
  "Front": "Frontend",
  "Tool": $tool,
}));