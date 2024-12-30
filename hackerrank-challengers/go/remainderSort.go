package main

import (
	"fmt"
	"sort"
)

func RemainderSorting(strArr []string) []string {
	// criação de um slice auxiliar para manter os valores e seus restos
	type Pair struct {
		Value     string
		Remainder int
	}

	// Montar um slice de pares
	var pairs []Pair
	for _, str := range strArr {
		remainder := len(str) % 3
		pairs = append(pairs, Pair{Value: str, Remainder: remainder})
	}

	// Ordenar os pares:
	// 1. Pelo Resto
	// 2. Alfabeticamente se os restos forem iguais
	sort.Slice(pairs, func(i, j int) bool {
		if pairs[i].Remainder == pairs[j].Remainder {
			return pairs[i].Value < pairs[j].Value
		}
		return pairs[i].Remainder < pairs[j].Remainder
	})

	// Extrair valores ordenados
	var sortedStrings []string
	for _, pair := range pairs {
		sortedStrings = append(sortedStrings, pair.Value)
	}

	return sortedStrings
}

func main() {
	strArr := []string{"Colorado", "Utah", "Wisconsin", "Oregon"}
	fmt.Println(RemainderSorting(strArr))
}
