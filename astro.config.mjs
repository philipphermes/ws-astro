import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import wsServer from './src/server/newWsServer';
import bun from 'astro-bun-adapter';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: bun({
        server: wsServer,
    }),
    integrations: [tailwind()]
});
