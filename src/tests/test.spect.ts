import {server} from '../server';

let request = require('supertest');
describe('loading express', () => {
    beforeEach(() => {
    });
    afterEach(() => {
        server.close()
    });
    it('responds to /', function testSlash(done) {
        request(server).get('/').expect(200, done);
    });
    it('404 everything else', function testPath(done) {
        request(server).get('/foo/bar').expect(404, done);
    });
});
