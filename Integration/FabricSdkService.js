var refDataHelper = require('./refDataHelper');
var Fabric_Client = require('fabric-client');

var fabric_client = new Fabric_Client();

var channel = fabric_client.newChannel('commonchannel');

var bnk1peer = fabric_client.newPeer('grpc://localhost:5051');
channel.addPeer(bnk1peer);
var bnk2peer = fabric_client.newPeer('grpc://localhost:6051');
channel.addPeer(bnk2peer);
var cmp1peer = fabric_client.newPeer('grpc://localhost:7051');
channel.addPeer(cmp1peer);
var cmp2peer = fabric_client.newPeer('grpc://localhost:8051');
channel.addPeer(cmp2peer);
var rgl1peer = fabric_client.newPeer('grpc://localhost:9051');
channel.addPeer(rgl1peer);

var order = fabric_client.newOrderer('grpc://localhost:7050')
channel.addOrderer(order);

var path = require('path');

var store_path = path.join(__dirname, 'hfc-key-store');

module.exports = {

    setUser: async (fabricclient, username) => {
        console.log(username)
        return new Promise((resolve, reject) => {
            Fabric_Client.newDefaultKeyValueStore({ path: store_path })
                .then((state_store) => {
                    fabricclient.setStateStore(state_store);
                    var crypto_suite = Fabric_Client.newCryptoSuite();
                    var crypto_store = Fabric_Client.newCryptoKeyStore({ path: store_path });
                    crypto_suite.setCryptoKeyStore(crypto_store);
                    fabricclient.setCryptoSuite(crypto_suite);
                    fabricclient.getUserContext(username, true).then((user_from_store) => {
                        if (user_from_store && user_from_store.isEnrolled()) {
                            resolve(true);
                        } else {
                            reject(false);
                        }
                    }).catch((err) => {
                        console.error('Failed to enroll and persist admin. Error: ' + err.stack ? err.stack : err);
                        throw new Error('Failed to setuser');
                      });
                });
        });
    },

    attachFabricClient: (req) => {
        req.fabricClient = fabric_client;
        req.channel = channel;
        req.Fabric_Client = Fabric_Client;
        req.org = refDataHelper.getOrgByUser(req.headers.username)
        if (req.org == "bnk1")
            req.peer = bnk1peer;
        else if (req.org == "bnk2")
            req.peer = bnk2peer;
        else if (req.org == "cmp1")
            req.peer = cmp1peer;
        else if (req.org == "cmp2")
            req.peer = cmp2peer;
        else if (req.org == "rgl1")
            req.peer = rgl1peer;


    }


}