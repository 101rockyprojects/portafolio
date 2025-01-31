import info from '@Shared/Domain/lang/info.json' assert { type: 'json' };
import es from '@Shared/Domain/lang/es.json' assert { type: 'json' };
import en from '@Shared/Domain/lang/en.json' assert { type: 'json' };
import type { Info } from '@Shared/Domain/types/info.ts';
import type { Nav } from '@Shared/Domain/types/nav.ts';
import type { About } from '@Shared/Domain/types/about.ts';
import type { Project } from '@Shared/Domain/types/project.ts';
import type { Experience } from '@Shared/Domain/types/experience.ts';
import type { Education } from '@Shared/Domain/types/education.ts';
import type { Hobby } from '@Shared/Domain/types/hobby.ts';
import type { Achievement } from '@Shared/Domain/types/achievement.ts';

interface Data {
    [key: string]: any;
    info: Info;
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

const data: Data = {
    info: info.personal,
    es,
    en
};

export default data;