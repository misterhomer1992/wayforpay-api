import { resolve } from 'path';

export default {
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'WayForPayAPI',
            fileName: 'wayforpay',
        },
        rollupOptions: {
            external: ['axios', 'form-data'],
        },
    },
};
