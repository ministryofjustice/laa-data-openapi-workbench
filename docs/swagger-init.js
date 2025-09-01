document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load API list from JSON file in docs/
        const res = await fetch('./swagger-config.json');
        if (!res.ok) throw new Error(`Failed to load config: ${res.status}`);

        const configData = await res.json();
        console.log('Loaded Swagger config:', configData);

        // Merge config from JSON with UI settings
        const config = {
            ...configData,
            dom_id: '#swagger-ui',
            presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
            layout: 'StandaloneLayout'
        };

        // Initialise Swagger UI
        window.ui = SwaggerUIBundle(config);

    } catch (err) {
        console.error('Error loading Swagger config:', err);
    }
});
