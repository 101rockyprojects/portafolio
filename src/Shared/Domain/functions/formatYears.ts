const monthsEs: Record<string, number> = {
    enero: 0,
    febrero: 1,
    marzo: 2,
    abril: 3,
    mayo: 4,
    junio: 5,
    julio: 6,
    agosto: 7,
    septiembre: 8,
    setiembre: 8,
    octubre: 9,
    noviembre: 10,
    diciembre: 11,
};

const monthsEn: Record<string, number> = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
};

function parseMonthYear(value: string, language: string): Date | null {
    const trimmed = value?.trim();
    if (!trimmed) return null;

    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) return null;

    const year = Number(parts[parts.length - 1]);
    if (!Number.isFinite(year)) return null;

    const monthRaw = parts[0].toLowerCase().replace('.', '');
    const monthIndex = (language === 'es' ? monthsEs : monthsEn)[monthRaw];
    if (monthIndex === undefined) return null;

    return new Date(year, monthIndex, 1);
}

function formatYears(initialDate: string, finalDate: string | undefined, language: string): string {
    const start = parseMonthYear(initialDate, language);
    const end = parseMonthYear(finalDate ?? '', language) ?? new Date();
    if (!start) return language === 'en' ? '— years' : '— años';

    const totalMonths =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
    const fullYears = Math.max(0, Math.floor(totalMonths / 12));
    const hasExtra = totalMonths % 12 >= 1;

    if (fullYears === 0) return language === 'en' ? '<1 year' : '<1 año';
    return `${fullYears}${hasExtra ? '+' : ''} ${language === 'en' ? 'years' : 'años'}`;
}

export { formatYears };