export default function createIntegration() {
    return {
        name: 'valantic-CEC-Deutschland-GmbH/bun-adapter',
        hooks: {
            'astro:config:done': ({ setAdapter }) => {
                setAdapter({
                    name: 'valantic-CEC-Deutschland-GmbH/bun-adapter',
                    serverEntrypoint: './src/server/newWsServer.ts',
                    exports: ['handler'],
                    supportedAstroFeatures: {
                        serverOutput: 'stable'
                    }
                });
            },
        },
    };
}