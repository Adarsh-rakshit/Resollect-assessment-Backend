import app from './index.js';

export default async function handler(request, response) {
    return app(request, response);
}