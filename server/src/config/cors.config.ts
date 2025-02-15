export function createCorsConfig() {
  return {
    origin: `http://localhost:${process.env.CLIENT_PORT ?? 3000}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
}
