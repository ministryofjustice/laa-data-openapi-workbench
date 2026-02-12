# Serve static docs with a minimal Node HTTP server
FROM node:25-alpine

WORKDIR /app

# Copy server and content
COPY server.js /app/server.js
COPY docs/    /app/public/
COPY openapi/ /app/public/openapi/

EXPOSE 8080
CMD ["node", "server.js"]
