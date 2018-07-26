import App from '../app';
import * as http from "http";

const request = require('supertest');
let server = http.createServer(App);
App.set('port', 0);
server.listen(0);

describe('test all features', () => {
    after(() => {
        if (server) server.close();
    });
    afterEach(() => {
        server.close()
    });

    describe('Trying CRUD',  () => {
        it('Create /', done => {
            request(server).post('/test').expect(201, done);
        });
        it('Read /', done => {
            request(server).get('/test').expect(200, done);
        });
        it('Update /', done => {
            request(server).put('/test').expect(200, done);
        });
        it('Delete /', done => {
            request(server).delete('/test').expect(204, done);
        });
    });
    describe('Expect error', ()=> {
        it('Bad Request', done => {
            request(server).get('/test/bad-request').expect(400, done);
        });
        it('Unauthorized', done => {
            request(server).get('/test/unauthorized').expect(401, done);
        });
        it('Forbidden', done => {
            request(server).get('/test/forbidden').expect(403, done);
        });
        it('Not Found', done => {
            request(server).get('/test/not-found').expect(404, done);
        });
        it('Internal Server Error', done => {
            request(server).get('/test/internal-server-error').expect(500, done);
        });
    });
    describe('Using @Expect', () => {
        it('Expect a username in "path"', done => {
            request(server).get('/test/http-expect/twf').expect(200, done);
        });
        it('Expect a "search" in "query"', done => {
            request(server).get('/test/http-expect-query-string').query({search : 1}).expect(200, done);
        });
        it('Expect a email field in "body"', done => {
            request(server).post('/test/http-expect-body').send({email : 'example@example.com'}).expect(200, done);
        });
        it('Expect a "_ga" as cookie in "cookie"', done => {
            request(server).get('/test/http-expect-cookie').set('Cookie', ['_ga=example']).expect(200, done);
        });
        it('Expect a "x-auth-token" in "header"', done => {
            request(server).get('/test/http-expect-header').set('X-Auth-Token', 'Example').expect(200, done);
        });
        it('Expect Simple', done => {
            request(server).get('/test/http-expect-simple').query({
                name : 'example'
            }).expect(200, done);
        });
        it('Expect Multi-Rule(header, cookie, query and body)', done => {
            request(server).post('/test/http-expect-multiple')
                .set('x-auth-token', 'example')
                .set('Cookie', ['_ga=example'])
                .query({fullname : 'Olaf Erlandsen'})
                .send({age : 26})
                .expect(200, done);
        });

        it('POST as application/x-www-form-urlencoded', done => {
            request(server).post('/test/http-expect-x-www-form-urlencoded')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({example: 'example'})
                .expect(200, done);
        });

        it('POST as application/json', done => {
            request(server).post('/test/http-expect-application-json')
                .set('Content-Type', 'application/json')
                .send({example: 'example'})
                .expect(200, done);
        });

        it('Expected a specific content-type as application/json(send text/plain)', done => {
            request(server).get('/test/http-expect-content-type')
                .set('content-type', 'text/plain')
                .expect(400, done);
        });
        it('Expected a specific content-type as application/json', done => {
            request(server).get('/test/http-expect-content-type')
                .set('content-type', 'application/json')
                .expect(200, done);
        });

    });

});
