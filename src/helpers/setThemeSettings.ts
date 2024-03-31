import { onUnmounted, ref } from "vue";
enum AppThemes {
    dark = 'dark',
    white = 'white'
}
const name = ref<keyof typeof AppThemes>(AppThemes.dark)
export default function themeProvider() {
    const THEME_TOKEN = 'theme_token'

    function getToken(): keyof typeof AppThemes{
        return localStorage.getItem(THEME_TOKEN) as keyof typeof AppThemes || AppThemes.dark
    }

    function toggle() {
        const nextTheme = name.value === AppThemes.dark ? AppThemes.white : AppThemes.dark
        name.value = nextTheme
        localStorage.setItem(THEME_TOKEN, nextTheme)
    }

    function storage(event: StorageEvent) {
        if(event.key === THEME_TOKEN) {
            name.value = event.newValue as keyof typeof AppThemes
        }
    }

    window.addEventListener('storage', storage)
    onUnmounted(() => {
        window.removeEventListener('storage', storage)
    })

    name.value = getToken()

    return {
        name,
        names: AppThemes,
        toggle,
    }
}