export const initTheme = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return 'dark';
    }

    const savedTheme = localStorage.getItem('simpati_theme') || 'dark';

    if (savedTheme === 'dark') {
        document.documentElement?.classList.add('dark');
    } else {
        document.documentElement?.classList.remove('dark');
    }

    return savedTheme;
};

export const toggleTheme = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return 'dark';
    }

    const isDark = document.documentElement?.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';

    if (newTheme === 'dark') {
        document.documentElement?.classList.add('dark');
    } else {
        document.documentElement?.classList.remove('dark');
    }

    localStorage.setItem('simpati_theme', newTheme);

    return newTheme;
};

export const currentTheme = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return 'dark';
    }

    return document.documentElement?.classList.contains('dark')
        ? 'dark'
        : 'light';
};
