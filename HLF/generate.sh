#!/bin/sh
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
export PATH=$GOPATH/src/github.com/hyperledger/fabric/build/bin:${PWD}/./bin:${PWD}:$PATH
export FABRIC_CFG_PATH=${PWD}
CHANNEL_NAME=commonchannel

# remove previous crypto material and config transactions
rm -fr config/*.
rm -fr crypto-config/*

# generate crypto material
cryptogen generate --config=./crypto-config.yaml
if [ "$?" -ne 0 ]; then
  echo "Failed to generate crypto material..."
  exit 1
fi

# generate genesis block for orderer
configtxgen -profile BlockOrdererGenesis -outputBlock ./config/commongenesis.block
if [ "$?" -ne 0 ]; then
  echo "Failed to generate orderer genesis block..."
  exit 1
fi

# generate channel configuration transaction
configtxgen -profile BlockChannel -outputCreateChannelTx ./config/commonchannel.tx -channelID $CHANNEL_NAME
if [ "$?" -ne 0 ]; then
  echo "Failed to generate channel configuration transaction..."
  exit 1
fi

# generate anchor peer transaction bnk1msp
configtxgen -profile BlockChannel -outputAnchorPeersUpdate ./config/bnk1mspanchors.tx -channelID $CHANNEL_NAME -asOrg bnk1msp
if [ "$?" -ne 0 ]; then
  echo "Failed to generate anchor peer update for bnk1msp..."
  exit 1
fi
# generate anchor peer transaction bnk1msp
configtxgen -profile BlockChannel -outputAnchorPeersUpdate ./config/bnk2mspanchors.tx -channelID $CHANNEL_NAME -asOrg bnk2msp
if [ "$?" -ne 0 ]; then
  echo "Failed to generate anchor peer update for bnk2msp..."
  exit 1
fi

# generate anchor peer transaction cmp1msp
configtxgen -profile BlockChannel -outputAnchorPeersUpdate ./config/cmp1mspanchors.tx -channelID $CHANNEL_NAME -asOrg cmp1msp
if [ "$?" -ne 0 ]; then
  echo "Failed to generate anchor peer update for cmp1msp..."
  exit 1
fi
# generate anchor peer transaction cmp2msp
configtxgen -profile BlockChannel -outputAnchorPeersUpdate ./config/cmp2mspanchors.tx -channelID $CHANNEL_NAME -asOrg cmp2msp
if [ "$?" -ne 0 ]; then
  echo "Failed to generate anchor peer update for cmp2msp..."
  exit 1
fi

# generate anchor peer transaction rgl1msp
configtxgen -profile BlockChannel -outputAnchorPeersUpdate ./config/rgl1mspanchors.tx -channelID $CHANNEL_NAME -asOrg rgl1msp
if [ "$?" -ne 0 ]; then
  echo "Failed to generate anchor peer update for rgl1msp..."
  exit 1
fi