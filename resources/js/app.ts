import '../css/app.css';
// import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { initTheme } from './Utils/theme';

initTheme();

const appName = import.meta.env.VITE_APP_NAME || 'SIMPATI';

createInertiaApp({
    title: (title) =>
        title
            ? `${title} | SIMPATI Kab. Soppeng`
            : 'SIMPATI - Presensi ASN Kab. Soppeng',
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        const vueApp = createApp({ render: () => h(App, props) }).use(plugin);

        if (el) {
            vueApp.mount(el);
        }

        return vueApp;
    },
    progress: {
        color: '#0dccf2',
    },
});
