
#channel creating
docker exec cli peer channel create -o orderer.tradefinance.com:7050 -c commonchannel -f /etc/hyperledger/configtx/commonchannel.tx
#channel created

#bnk1 joining channel
docker exec cli peer channel join -b commonchannel.block
#bnk1 joined channel
#bnk2 joining channel
docker exec -e "CORE_PEER_LOCALMSPID=bnk2msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/bnk2.tradefinance.com/users/Admin@bnk2.tradefinance.com/msp" -e "CORE_PEER_ADDRESS=peer0.bnk2.tradefinance.com:7051" cli peer channel join -b commonchannel.block
#bnk2 joined channel
#cmp1 joining channel
docker exec -e "CORE_PEER_LOCALMSPID=cmp1msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/cmp1.tradefinance.com/users/Admin@cmp1.tradefinance.com/msp" -e "CORE_PEER_ADDRESS=peer0.cmp1.tradefinance.com:7051" cli peer channel join -b commonchannel.block
#cmp1 joined channel
#cmp2 joining channel
docker exec -e "CORE_PEER_LOCALMSPID=cmp2msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/cmp2.tradefinance.com/users/Admin@cmp2.tradefinance.com/msp" -e "CORE_PEER_ADDRESS=peer0.cmp2.tradefinance.com:7051" cli peer channel join -b commonchannel.block
#cmp2 joined channel
#rgl1 joining channel
docker exec -e "CORE_PEER_LOCALMSPID=rgl1msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/rgl1.tradefinance.com/users/Admin@rgl1.tradefinance.com/msp" -e "CORE_PEER_ADDRESS=peer0.rgl1.tradefinance.com:7051" cli peer channel join -b commonchannel.block
#rgl1 joined channel

#all peers joined the commonchannel
