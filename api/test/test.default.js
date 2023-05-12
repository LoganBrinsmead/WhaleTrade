// data api smoke test

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let redis = require('redis-mock');

let client = redis.createClient();


chai.use(chaiHttp);

describe('API smoke test', () => {
    describe('/GET default', () => {
        it('default api route should return response 200 \'ok\' ', (done) => {
            chai.request(server)
                .get('/api/v1')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});
