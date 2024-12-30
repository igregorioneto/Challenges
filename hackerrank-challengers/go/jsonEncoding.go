package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
)

type Manager struct {
	FullName       string `json:"full_name,omitempty"`
	Position       string `json:"position,omitempty"`
	Age            int32  `json:"age,omitempty"`
	YearsInCompany int32  `json:"years_in_company,omitempty"`
}

func EncodeManager(manager *Manager) (io.Reader, error) {
	buf := new(bytes.Buffer)
	err := json.NewEncoder(buf).Encode(manager)
	if err != nil {
		return nil, err
	}
	return buf, nil

}

func main() {
	manager := &Manager{
		FullName:       "Jack Oliver",
		Position:       "CEO",
		Age:            44,
		YearsInCompany: 8,
	}
	// Codificar o Manager para JSON
	jsonReader, err := EncodeManager(manager)
	if err != nil {
		fmt.Println("Erro:", err)
		return
	}

	// Lendo e imprimindo o JSON resultante
	jsonData := jsonReader.(*bytes.Buffer).String()
	fmt.Println(jsonData)
}
