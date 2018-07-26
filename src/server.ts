import * as http from 'http';
import * as debug from 'debug';
import App from './app';
import { Manifiest } from './core/Manifiest';


debug('ts-express:server');
const port = Manifiest.get('http.defaultPort', process.env.PORT);
App.set('port', port);

http.createServer(App)
    .listen(port)
    .on('error', (error: NodeJS.ErrnoException): void => {
        if (error.syscall !== 'listen') throw error;
        const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    })
    .on('listening', (): any => debug(`Listening on ${port}`));
