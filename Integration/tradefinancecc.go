package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)


type TradeFinance struct {
	TFId         	string    `json:"tfId"`
	Importer     	string    `json:"importer"`
	ImporterBank 	string    `json:"importerBank"`
	Exporter     	string    `json:"exporter"`
	ExporterBank 	string    `json:"exporterBank"`
	TradeValue   	int       `json:"tradeValue"`
	TFStatus     	string    `json:"tfStatus"`
	TFStatusDt		time.Time `json:"tfStatusDt"`
	LCStatus     	string    `json:"lcStatus"`
	LCStatusDt   	time.Time `json:"lcStatusDt"`

}

func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "PlaceTradeOrder" {
		return s.PlaceTradeOrder(APIstub, args)
	} else if function == "UpdateTFStatus" {
		return s.UpdateTFStatus(APIstub, args)
	} else if function == "requestLC" {
		return s.requestLC(APIstub, args)
	} else if function == "issueOrRejectLCRequest" {
		return s.issueOrRejectLCRequest(APIstub, args)
	} else if function == "acceptsOrRejectLC" {
		return s.acceptsOrRejectLC(APIstub, args)	
	} else if function == "TFDetail" {
		return s.TFDetail(APIstub, args)
	} else if function == "TFHistory" {
		return s.TFHistory(APIstub, args)
	} else if function == "ProductDelivered" {
		return s.ProductDelivered(APIstub, args)
	} else if function == "initLedger" {
			return s.initLedger(APIstub)

	return shim.Error("Invalid Smart Contract function name.")
}
// Importer places purchase order to the exporter
func (s *SmartContract) PlaceTradeOrder(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	TFId  			:=args[0]
	Importer     	:=args[1]
	Exporter     	:=args[2]
	TradeValue, err := strconv.Atoi(args[3])
	if err != nil {
		return shim.Error("Invalid Trade Value")
	}
	TFStatus     	:="ORDERPLACED"
	t, errt := time.Parse("2006-01-02", args[4])
	if errt != nil {
		return shim.Error("error in parsing date")
	}
	TFStatusDt	:=t

	tf := TradeFinance{TFId: TFId, Importer: Importer, Exporter: Exporter, TradeValue: TradeValue,TFStatus: TFStatus,TFStatusDt:TFStatusDt}
	tfBytes, err := json.Marshal(tf)
	APIstub.PutState(TFId, tfBytes)
	return shim.Success(nil)
}
// Exporter Confirms the Trade Order
func (s *SmartContract) UpdateTFStatus(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}
	TFId :=args[0]
	tfAsBytes, _ := APIstub.GetState(TFId)
	tf := TradeFinance{}
	err :=json.Unmarshal(tfAsBytes, &tf)
	
	if err != nil {
		return shim.Error("error in parsing object")
	}
	tf.TFStatus := args[1]
	t, errt := time.Parse("2006-01-02", args[2])
	if errt != nil {
		return shim.Error("error in parsing date")
	}
	tf.TFStatusDt	:=t

	if args[1] == "CLOSED" {
		tf.LCStatus := args[1]
		tf.LCStatusDt	:=t
	}
	APIstub.PutState(TFId, tfBytes)
	return shim.Success(nil)
}
// Importer request LC from his Bank
func (s *SmartContract) requestLC(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}
	TFId :=args[0]
	tfAsBytes, _ := APIstub.GetState(TFId)
	tf 	:= TradeFinance{}
	err :=	json.Unmarshal(tfAsBytes, &tf)	
	if err != nil {
		return shim.Error("error in parsing object")
	}
	tf.ImporterBank := args[1]
	tf.ExporterBank := args[2]
	tf.LCStatus 	:= "REQUESTED"
	t, errt := time.Parse("2006-01-02", args[3)
	if errt != nil {
		return shim.Error("error in parsing date")
	}
	tf.LCStatusDt	:=t

	APIstub.PutState(TFId, tfBytes)
	return shim.Success(nil)
}
// Importer's Bank Issues or rejects the LC request
func (s *SmartContract) issueOrRejectLCRequest(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}
	TFId :=args[0]
	tfAsBytes, _ := APIstub.GetState(TFId)
	tf 	:= TradeFinance{}
	err :=	json.Unmarshal(tfAsBytes, &tf)	
	if err != nil {
		return shim.Error("error in parsing object")
	}
	tf.LCStatus 	:= args[1]
	t, errt := time.Parse("2006-01-02", args[2])
	if errt != nil {
		return shim.Error("error in parsing date")
	}
	tf.LCStatusDt	:=t

	APIstub.PutState(TFId, tfBytes)
	return shim.Success(nil)
}
// Exporter's Bank Accepts / Rejects the LC
func (s *SmartContract) acceptsOrRejectLC(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}
	TFId :=args[0]
	tfAsBytes, _ := APIstub.GetState(TFId)
	tf 	:= TradeFinance{}
	err :=	json.Unmarshal(tfAsBytes, &tf)	
	if err != nil {
		return shim.Error("error in parsing object")
	}
	tf.LCStatus 	:= args[1]
	t, errt := time.Parse("2006-01-02", args[2])
	if errt != nil {
		return shim.Error("error in parsing date")
	}
	tf.LCStatusDt	:=t

	APIstub.PutState(TFId, tfBytes)
	return shim.Success(nil)
}
func (s *SmartContract) TFDetail(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}
	TFId := args[0]
	tfAsBytes, _ := APIstub.GetState(TFId)
	return shim.Success(tfAsBytes)
}
func (s *SmartContract) TFHistory(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	TFId := args[0]

	resultsIterator, err := APIstub.GetHistoryForKey(TFId)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"TxId\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.TxId)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")

		if queryResponse.IsDelete == true {
			buffer.WriteString("\"\"")
		}
		if queryResponse.IsDelete == false {
			buffer.WriteString(string(queryResponse.Value))
		}
		//buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString(",\"Timestamp\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Timestamp.String())
		buffer.WriteString("\"")

		buffer.WriteString(",\"IsDelete\":")
		buffer.WriteString("\"")
		buffer.WriteString(strconv.FormatBool(queryResponse.IsDelete))
		buffer.WriteString("\"")

		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- History:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}
func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	tfs := []TradeFinance{
		TradeFinance{Importer: "cmp!", ImporterBank: "bnk1", TradeValue: 10000, TFStatus: "ORDERPLACED",TFStatusDt: time.Now()},
		TradeFinance{Importer: "cmp!", ImporterBank: "bnk1", Exporter: "cmp2", ExporterBank: "bnk2",TradeValue: 10000, TFStatus: "ORDERCONFIRMED",TFStatusDt: time.Now()},	
	}
	
	APIstub.PutState("cmp1cmp2"+fmt.Println(time.Now().Format("20060102150405")), json.Marshal(tfs[0]))
	APIstub.PutState("cmp1cmp2"+fmt.Println(time.Now().Format("20060102150405")), json.Marshal(tfs[1]))

	return shim.Success(nil)
}
// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
