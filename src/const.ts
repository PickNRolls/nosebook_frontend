export const DOMAIN = false ? 'localhost' : '192.168.1.75';
export const PORT = parseInt(process.env.PORT || "8000", 10);
export const HOST = `${DOMAIN}:${PORT}`;

