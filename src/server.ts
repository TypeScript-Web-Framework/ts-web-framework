import * as http from 'http';
import * as debug from 'debug';
import App from './app';
import {Manifiest} from "./core/Manifiest";
debug('ts-express:server');
const port = Manifiest.get("http.defaultPort", process.env.PORT );
App.set('port', port);
export const server = http.createServer(App);
server.listen(port);
server.on('error', (error: NodeJS.ErrnoException): void => {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch(error.code) {
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
});
server.on('listening', () : void => {
    let addr : any = server.address();
    let bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
    debug(`Listening on ${bind}`);
});
