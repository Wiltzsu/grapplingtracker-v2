import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

/**
 * How this works:
 *
 * For example when 'Inertia::render('Positions/CreatePosition') is called in the code:
 * - The string 'Positions/CreatePosition' is passed to Inertia
 * - Inertia converts this to a file path: './Pages/Positions/CreatePosition.jsx'
 * - The 'resolvePageComponent' method looks for this file in the configured pages directory
 *
 * The actual file should exist at:
 * - resources/js/Pages/Positions/CreatePosition.jsx, so the path above is relative to
 * resources/js/Pages
 */
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            // Looks for page components in ./Pages directory with .jsx extension
            `./Pages/${name}.jsx`,
            /**
             * import.meta.glob is a Vite-specific feature that scans 'Pages' directory
             * for all .jsx files. It also loads pages only when needed.
             */
            import.meta.glob('./Pages/**/*.jsx'), // **/* global pattern
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
