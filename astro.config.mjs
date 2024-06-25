import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import websocketAdapter from './src/server/WebsocketAdapter.ts';

// https://astro.build/config
export default defineConfig({
    output: 'hybrid',
    adapter: websocketAdapter,
    integrations: [tailwind()]
});
