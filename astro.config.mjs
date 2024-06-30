import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import bun from './src/adapter/bun-adapter';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: bun({
    }),
    integrations: [tailwind()]
});
