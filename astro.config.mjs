import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import websocketAdapter from './src/adapter/WebsocketAdapter.ts';
import bun from 'astro-bun-adapter';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: bun({
        server: websocketAdapter
    }),
    integrations: [tailwind()]
});
