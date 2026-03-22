import { derived, writable } from 'svelte/store';
import { locale } from 'svelte-i18n';
import data from '@Shared/Domain/data.ts';
import type { Readable } from 'svelte/store';
import type { Nav } from '@Shared/Domain/types/nav.ts';
import type { About } from '@Shared/Domain/types/about.ts';
import type { Project } from '@Shared/Domain/types/project.ts';
import type { Experience } from '@Shared/Domain/types/experience.ts';
import type { Education } from '@Shared/Domain/types/education.ts';
import type { Hobby } from '@Shared/Domain/types/hobby.ts';
import type { Achievement } from '@Shared/Domain/types/achievement.ts';
import type { Recommendation } from '@Shared/Domain/types/recommendation.ts';

export function createStore<T>(section: keyof (typeof data)['es']): Readable<T> {
  return derived(locale, ($locale = 'es') => {
    return data[$locale ?? 'es']?.[section] as T;
  });
}

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

export function getSection<K extends keyof (typeof data)['en']>(section: K): Readable<(typeof data)['es'][K]> {
  return createStore(section);
}

export const tool = writable<string>('Tools');
locale.subscribe(($locale) => {
  tool.set($locale === 'es' ? 'Herramientas' : 'Tools');
});

export const categories: Readable<Record<string, string>> = derived(tool, ($tool) => ({
  Back: 'Backend',
  Front: 'Frontend',
  Tool: $tool,
}));

