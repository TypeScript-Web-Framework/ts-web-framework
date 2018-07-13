import App from '../app';
import * as http from "http";
import {Manifiest} from "../core/Manifiest";
const request = require('supertest');
let server = http.createServer(App);
App.set('port', 0);
server.listen(0);

describe('loading', () => {
    after(() => {
        if (server) server.close();
    });
    afterEach(() => {
        server.close()
    });
    it('responds to /', (done) => {
        request(server).get('/').expect(200, done);
    });
    it('404 everything else',  (done) => {
        request(server).get('/foo/bar').expect(404, done);
    });
    it ("Manifiest", (done) => {
        Manifiest.settings ? done() : null;
    });

    it ("Manifiest: get", (done) => {
        Manifiest.get("mode", false) ? done() : null;
    });

    it ("Manifiest: get String", (done) => {
        Manifiest.getString("mode") ? done() : null;
    });

});
