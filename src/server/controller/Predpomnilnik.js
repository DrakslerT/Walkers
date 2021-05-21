const memjs = require('memjs');

var memClient = memjs.Client.create();

const getPasmeCache = async() => {
    var promisedResult = new Promise((resolve, reject) => {
        memClient.get('pasme', function(err, val) {
            if (err) {
                console.log(err);
                resolve(false);
            } else if (val) {
                var retVal = JSON.parse(val.toString()); 
                resolve(retVal);
            } else {
                resolve(false);
            }
        });
    });
    return promisedResult;
}

const setPasmeCache = async(breeds) => {
    var promisedResult = new Promise((resolve, reject) => {
        memClient.set('pasme', JSON.stringify(breeds), {expires:86400}, function(err, val) {
            if (err) {
                console.log(err);
                resolve(false);
            } else if (val) {
                resolve(val);
            } else {
                resolve(false);
            }
        });
    });
    return promisedResult;
}

module.exports = {
    memClient,
    getPasmeCache,
    setPasmeCache
}