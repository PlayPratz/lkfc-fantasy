const KEY_THEME = "theme";

function saveTheme(themeId: number) {
    localStorage.setItem(KEY_THEME, themeId.toString());
}

function loadTheme(): number {
    return parseInt(localStorage.getItem(KEY_THEME) ?? '0');
}

export const THEME = {
    saveTheme,
    loadTheme
}