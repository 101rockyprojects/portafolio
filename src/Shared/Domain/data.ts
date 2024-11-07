import dataJson from '@Shared/Domain/lang/languages.json';
import type { Nav } from '@Shared/Domain/types/nav.ts';
import type { About } from '@Shared/Domain/types/about.ts';
import type { Project } from '@Shared/Domain/types/project.ts';
import type { Experience } from '@Shared/Domain/types/experience.ts';
import type { Education } from '@Shared/Domain/types/education.ts';
import type { Hobby } from '@Shared/Domain/types/hobby.ts';
import type { Achievement } from '@Shared/Domain/types/achievement.ts';

interface Data {
    [key: string]: any;
    es: {
      nav: Nav;
      about: About;
      projects: Project[];
      experience: Experience[];
      education: Education[];
      hobbies: Hobby[];
      achievements: Achievement[];
    };
    en: {
      nav: Nav;
      about: About;
      projects: Project[];
      experience: Experience[];
      education: Education[];
      hobbies: Hobby[];
      achievements: Achievement[];
    };
}

const data: Data = dataJson;

export default data;