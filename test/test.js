const {spawn} = require('child_process');
const request = require('request');
const test = require('tape');

const env = Object.assign({}, process.env, {PORT: 5000});

test('main page', (assert) => {
    const server = spawn('node', ['src/server.js'], {env});
    server.stdout.on('data', _ => {
        request('http://127.0.0.1:5000', (error, response, body) => {
            server.kill();
            assert.false(error,"geen errors");
            assert.equal(response.statusCode, 200, "http ok");
            
            assert.notEqual(body.indexOf("<title>Verkeerslicht</title>"), -1, "correcte title");
            assert.notEqual(body.indexOf("Wat is je gevoel vandaag?"), -1, "systeem vraagt om input'");
            assert.end();
        });
    });
});

test('submit emotion', (assert) => {
    const server = spawn('node', ['src/server.js'], {env});
    server.stdout.on('data', _ => {
        request.post({url: 'http://127.0.0.1:5000/submit-form', form:{username:'sander', password:'boompje', emotion:1, timestamp: '20191212' }}, (error, response, body) => {
            server.kill();
            assert.false(error,"geen errors");
            assert.equal(response.statusCode, 200, "http ok");
            
            assert.notEqual(body.indexOf("Dankje!"), -1, "systeem meldt 'dankje!'");
            assert.end();
        });
    });
});

test('get data', (assert) => {
    const server = spawn('node', ['src/server.js'], {env});
    server.stdout.on('data', _ => {
        request.post({url: 'http://127.0.0.1:5000/submit-form', form:{username:'sander', password:'boompje', emotion:1, timestamp: '20191212' }});
        request('http://127.0.0.1:5000/data', (error, response, body) => {
            server.kill();
            assert.false(error,"geen errors");
            assert.equal(response.statusCode, 200, "http ok");

            assert.notEqual(body.indexOf("20191212, sander, 1\n"), -1, "data bevat de juiste waarde");
            assert.end();
        });
    });
});

test('empty submit error', (assert) => {
    const server = spawn('node', ['src/server.js'], {env});
    server.stdout.on('data', _ => {
        request.post({url: 'http://127.0.0.1:5000/submit-form', form:{}}, (error, response, body) => {
            server.kill();
            assert.false(error,"geen errors");
            assert.equal(response.statusCode, 500, "http 500 want form is leeg");
            assert.end();
        });
    });
});

