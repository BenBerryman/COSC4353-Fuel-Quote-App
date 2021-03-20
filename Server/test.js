const assert = require('assert');
const fetch = require('node-fetch');

async function mainProfile() {

    let target = "address1";
    let field = "street";
    let data = "4734 Apple Avenue";

    let resp = await fetch('http://localhost:5000/mainProfile',
        {method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                client: 'null',
                target: target,
                field: field,
                data: data
            })});
    return resp.status;
}

describe('Update info on Main Profile', function() {
    it('should return status code 200 to indicate successful PUT request', function() {
        mainProfile().then((respCode) => {
            assert.strictEqual(respCode, 200);
        })
    });
});

