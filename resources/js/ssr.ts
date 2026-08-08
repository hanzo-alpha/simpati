import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { renderToString } from '@vue/server-renderer';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createSSRApp, h } from 'vue';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) =>
            title
                ? `${title} | SIMPATI Kab. Soppeng`
                : 'SIMPATI - Presensi ASN Kab. Soppeng',
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.vue`,
                import.meta.glob<DefineComponent>('./Pages/**/*.vue'),
            ),
        setup({ App, props, plugin }) {
            return createSSRApp({ render: () => h(App, props) }).use(plugin);
        },
    }),
);
