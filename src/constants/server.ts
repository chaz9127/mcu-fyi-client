const SERVER_PORT = (() => {
  switch(import.meta.env.VITE_NODE_ENV) {
    case 'development':
      return ':3001';  
    default:
      return '';
  }
})();

const domain = import.meta.env.VITE_SERVER_URL || 'http://localhost';

const SERVER_URL = (() => {
  switch(import.meta.env.VITE_NODE_ENV) {
    case 'development':
      return `${domain}${SERVER_PORT}`;  
    default:
      return `${domain}${SERVER_PORT}`;
  }
})();

export {
  SERVER_PORT,
  SERVER_URL,
}