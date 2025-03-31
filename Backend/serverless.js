import app from './index.js';

export default async function handler(request, response) {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
    
    return app(request, response);

}