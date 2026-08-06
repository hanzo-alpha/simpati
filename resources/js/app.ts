import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, DefineComponent, h } from 'vue';
import { initTheme } from './Utils/theme';

initTheme();

const appName = import.meta.env.VITE_APP_NAME || 'SIMPATI';

createInertiaApp({
    title: (title) => title ? `${title} | SIMPATI Kab. Soppeng` : 'SIMPATI - Presensi ASN Kab. Soppeng',
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .mount(el);
    },
    progress: {
        color: '#0dccf2',
    },
});
