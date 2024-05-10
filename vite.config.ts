import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'WayForPayAPI',
            fileName: 'wayforpay',
        },
        rollupOptions: {
            external: ['axios'],
            output: {
                globals: {
                    axios: 'axios',
                },
            },
        },
    },
    plugins: [dts({ rollupTypes: true })],
});
