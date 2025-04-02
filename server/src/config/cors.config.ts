export function createCorsConfig() {
  return {
    origin: [
      `http://localhost:${process.env.CLIENT_PORT ?? 3000}`,
      'http://localhost',
      'http://bbilokin.stud.shpp.me',
      'https://bbilokin.stud.shpp.me',
      'http://bbilokin.duckdns.org/',
      'https://bbilokin.duckdns.org/',
    ],
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  };
}
