printf "\n chain code install and instanciation in bnk start\n"
docker exec -e "CORE_PEER_LOCALMSPID=bnk1msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/bnk1.tradefinance.com/users/Admin@bnk1.tradefinance.com/msp" cli peer chaincode install -n tradefinancecc -v 1.0 -p "$CC_SRC_PATH" -l "$LANGUAGE"
printf "\n chain code install in bnk end \n"
docker exec -e "CORE_PEER_LOCALMSPID=bnk1msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/bnk1.tradefinance.com/users/Admin@bnk1.tradefinance.com/msp" cli peer chaincode instantiate -o orderer.tradefinance.com:7050 -C commonchannel -n tradefinancecc -l "$LANGUAGE" -v 1.0 -c '{"Args":[""]}' -P "OR ('bnk1msp.member','bnk2msp.member','cmp1msp.member','cmp2msp.member','rgl1msp.member')"
printf "\n chain code install and instanciation in bnk end. \n"

sleep 4

printf "\n chain code install and instanciation in bnk2 start \n"
docker exec -e "CORE_PEER_LOCALMSPID=bnk2msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/bnk2.tradefinance.com/users/Admin@bnk2.tradefinance.com/msp" -e "CORE_PEER_ADDRESS=peer0.bnk2.tradefinance.com:7051" cli peer chaincode install -n tradefinancecc -v 1.0 -p "$CC_SRC_PATH" -l "$LANGUAGE"
printf "\n chain code install in bnk2 end \n"
docker exec -e "CORE_PEER_LOCALMSPID=bnk2msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/bnk2.tradefinance.com/users/Admin@bnk2.tradefinance.com/msp" -e "CORE_PEER_ADDRESS=peer0.bnk2.tradefinance.com:7051" cli peer chaincode instantiate -o orderer.tradefinance.com:7050 -C commonchannel -n tradefinancecc -l "$LANGUAGE" -v 1.0 -c '{"Args":[""]}' -P "OR ('bnk1msp.member','bnk2msp.member','cmp1msp.member','cmp2msp.member','rgl1msp.member')"
printf "\n chain code install and instanciation in bnk2 end \n"


sleep 4

printf "\n chain code install and instanciation in cmp1 start \n"
docker exec -e "CORE_PEER_LOCALMSPID=cmp1msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/cmp1.tradefinance.com/users/Admin@cmp1.tradefinance.com/msp" -e "CORE_PEER_ADDRESS=peer0.cmp1.tradefinance.com:7051" cli peer chaincode install -n tradefinancecc -v 1.0 -p "$CC_SRC_PATH" -l "$LANGUAGE"
printf "\n chain code install in cmp1 end \n"
docker exec -e "CORE_PEER_LOCALMSPID=cmp1msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/cmp1.tradefinance.com/users/Admin@cmp1.tradefinance.com/msp" -e "CORE_PEER_ADDRESS=peer0.cmp1.tradefinance.com:7051" cli peer chaincode instantiate -o orderer.tradefinance.com:7050 -C commonchannel -n tradefinancecc -l "$LANGUAGE" -v 1.0 -c '{"Args":[""]}' -P "OR ('bnk1msp.member','bnk2msp.member','cmp1msp.member','cmp2msp.member','rgl1msp.member')"
printf "\n chain code install and instanciation in cmp1 end \n"

sleep 4

printf "\n chain code install and instanciation in cmp2 start \n"
docker exec -e "CORE_PEER_LOCALMSPID=cmp2msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/cmp2.tradefinance.com/users/Admin@cmp2.tradefinance.com/msp" -e "CORE_PEER_ADDRESS=peer0.cmp2.tradefinance.com:7051" cli peer chaincode install -n tradefinancecc -v 1.0 -p "$CC_SRC_PATH" -l "$LANGUAGE"
printf "\n chain code install in cmp2 end \n"
docker exec -e "CORE_PEER_LOCALMSPID=cmp2msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/cmp2.tradefinance.com/users/Admin@cmp2.tradefinance.com/msp" -e "CORE_PEER_ADDRESS=peer0.cmp2.tradefinance.com:7051" cli peer chaincode instantiate -o orderer.tradefinance.com:7050 -C commonchannel -n tradefinancecc -l "$LANGUAGE" -v 1.0 -c '{"Args":[""]}' -P "OR ('bnk1msp.member','bnk2msp.member','cmp1msp.member','cmp2msp.member','rgl1msp.member')"
printf "\n chain code install and instanciation in cmp2 end \n"

sleep 4

printf "\n chain code install and instanciation in rgl start \n"
docker exec -e "CORE_PEER_LOCALMSPID=rgl1msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/rgl1.tradefinance.com/users/Admin@rgl1.tradefinance.com/msp" -e "CORE_PEER_ADDRESS=peer0.rgl1.tradefinance.com:7051" cli peer chaincode install -n tradefinancecc -v 1.0 -p "$CC_SRC_PATH" -l "$LANGUAGE"
printf "\n chain code install in rgl end \n"
docker exec -e "CORE_PEER_LOCALMSPID=rgl1msp" -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/rgl1.tradefinance.com/users/Admin@rgl1.tradefinance.com/msp" -e "CORE_PEER_ADDRESS=peer0.rgl1.tradefinance.com:7051" cli peer chaincode instantiate -o orderer.tradefinance.com:7050 -C commonchannel -n tradefinancecc -l "$LANGUAGE" -v 1.0 -c '{"Args":[""]}' -P "OR ('bnk1msp.member','bnk2msp.member','cmp1msp.member','cmp2msp.member','rgl1msp.member')"
printf "\n chain code install and instanciation in rgl end \n"

