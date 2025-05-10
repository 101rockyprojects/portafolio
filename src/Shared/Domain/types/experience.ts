export interface Experience {
    title: string;
    company: string;
    companyLink: string;
    description: string[] | string;
    initialDate: string;
    finalDate?: string;
    country?: string;
}