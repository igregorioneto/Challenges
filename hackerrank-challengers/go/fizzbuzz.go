package main

import "fmt"

func fizzBuzz(n int32) {
	for i := 1; i <= int(n); i++ {
		multiple3 := i%3 == 0
		multiple5 := i%5 == 0

		if multiple3 && multiple5 {
			fmt.Println("FizzBuzz")
		} else if multiple3 && !multiple5 {
			fmt.Println("Fizz")
		} else if !multiple3 && multiple5 {
			fmt.Println("Buzz")
		} else {
			fmt.Println(i)
		}
	}
}

func main() {
	fizzBuzz(15)
	return
}
