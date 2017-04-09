'use strict'

const sudoku = [
	0, 0, 1, 0, 0, 0, 2, 0, 0,
	0, 3, 0, 0, 0, 0, 0, 4, 0,
	5, 0, 0, 0, 3, 0, 0, 0, 6,
	0, 0, 0, 1, 0, 7, 0, 0, 0,
	0, 4, 0, 0, 0, 0, 0, 8, 0,
	0, 0, 0, 9, 0, 2, 0, 0, 0,
	3, 0, 0, 0, 0, 0, 0, 0, 8,
	0, 6, 0, 0, 5, 0, 0, 3, 0,
	0, 0, 2, 0, 0, 0, 7, 0, 0]

const value = x => x.reduce(
	(total, val) => total + val
)


const findToSolve = x => x.indexOf(0)


const getColumns = (x, size) => {
	let acc = []
	for (let i = 0; i < size; i++) {
	acc.push(x.slice(i*size, i*size+size))
} return acc
} 

const getRows = (x, size) => {
	let acc = []
	getColumns(x, size).forEach(
		(x,i) => {
			let temp = [] 
			x.forEach(
			(x,i1) => {temp[i1] = x
			acc[i]=temp
			})
	})
 return acc
} 

const check = (el,i) => el === i 

let toSolve = findToSolve(sudoku)

// const findMissing = (el,i) => 

// sudoku.forEach((x,i)=>console.log(findMissing(x,i)))

// actual code starts here :p

const size = Math.sqrt(sudoku.length)

console.log(value(sudoku))

console.log(`solving a sudoku of ${size} by ${size}`) 

console.log(toSolve)
console.log(getColumns(sudoku,size))
console.log(getRows(sudoku,size))
