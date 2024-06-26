import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import websocketAdapter from './src/adapter/WebsocketAdapter.ts';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: websocketAdapter,
    integrations: [tailwind()]
});
