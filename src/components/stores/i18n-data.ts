import { derived } from 'svelte/store';
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

type DataSection<T> = {
  [K in keyof typeof data]: T;
};

// Helper function to create an i18n store
export function createI18nStore<T>(section: keyof (typeof data)['es']): Readable<T> {
  return derived(locale, ($locale = 'es') => {
    return data[$locale ?? 'es']?.[section] as T;
  });
}

// Stores for each section
export const i18nStores = {
  nav: createI18nStore<Nav>('nav'),
  about: createI18nStore<About>('about'),
  projects: createI18nStore<Project[]>('projects'),
  experiences: createI18nStore<Experience[]>('experience'),
  educations: createI18nStore<Education[]>('education'),
  hobbies: createI18nStore<Hobby[]>('hobbies'),
  achievements: createI18nStore<Achievement[]>('achievements'),
} as const;

// Helper function to get a section store in type-safe
export function getI18nSection<K extends keyof (typeof data)['en']>(section: K): Readable<(typeof data)['es'][K]> {
  return createI18nStore(section);
}