#!/usr/bin/env node
'use strict';

class Sudoku{
	constructor(input, options = {empty: 0}){
		// identify the input
		switch(typeof(input)){
		case('undefined'):
			// if no input is given, we just generate it ourselves
			this.generate();
			break;
		case('number'):
			// if its one number, we can generate a sudoku of its size if its acceptable
			this.generate(input);
			break;
		default:
			if(!input.length){
				console.error('unacceptable input!');
				process.exit(1);
			}
			this.solved = this.solve(input);
			
			break;
		}

		this.empty = options.empty;
		this.raw = input;
		this.vertical = void(0);
		this.horizontal = void(0);
		this.side = Math.sqrt(input.length);

		this.value = this.generate_value(input);

		this._make_vertical(input);
		this._make_horizontal(input);
	}

	_make_vertical(arr) {
		const vertical = this._get_2d_array(this.side);

		for(let i = this.side - 1; i >= 0; i--) {
			for(let j = this.side - 1; j >= 0; j--) {
				vertical[i][j] = arr[i * this.side + j];
			}
		}

		this.vertical = vertical;
	}

	_make_horizontal(arr) {
		const horizontal = this._get_2d_array(this.side);

		for(let i = this.side - 1; i >= 0; i--) {
			for(let j = this.side - 1; j >= 0; j--) {
				console.log('length:', i * this.side + j);
				console.log('x and y:', i,j);
				console.log('should match below:', arr[i * this.side + j]);
				horizontal[j][i] = arr[i * this.side + j];
				console.log('horizontal content:', horizontal[j][i]);
			}
		}

		console.log(horizontal);
		this.horizontal = horizontal;
	
	}

	_make_blocks(arr) {
		// get the square size
		const square_size = Math.sqrt(this.side);

		const block = this._get_2d_array(this.side);

		for(let i = this.side - 1; i >= 0; i--) {
			for(let j = this.side - 1; j >= 0; j--) {
				block[(i/square_size)][j] = this.vertical[i];
			}
		}

		this.squares = block;
	}

	find_next_empty(arr, empty) {
		if(empty === void(0))
			empty = 0;
		return arr.indexOf(empty);
	}

	generate_value(arr){
		return arr.reduce(
			(total, val) => total + val
		);
	}

	solve(arr) {
		// make a 2d array filled with zeros
		const solved = this._get_2d_array(this.side);

		return arr;
	}

	_get_2d_array(size) {
		// make a new 2d array filled with zeros and return it
		return new Array(size).fill(0).map(() => new Array(size).fill(0));
	}

}

// lets assume we just get an array of 81 numbers as input
// let input = new Array(81);
// input.fill(0);
// input = input.map(() => Math.ceil(10 * Math.random()));


// TODO: split code below off in unit tests

// neatly formatted sodoku input which is solvable
const input = [
	0, 0, 1, 0, 0, 0, 2, 0, 0,
	0, 3, 0, 0, 0, 0, 0, 4, 0,
	5, 0, 0, 0, 3, 0, 0, 0, 6,
	0, 0, 0, 1, 0, 7, 0, 0, 0,
	0, 4, 0, 0, 0, 0, 0, 8, 0,
	0, 0, 0, 9, 0, 2, 0, 0, 0,
	3, 0, 0, 0, 0, 0, 0, 0, 8,
	0, 6, 0, 0, 5, 0, 0, 3, 0,
	0, 0, 2, 0, 0, 0, 7, 0, 0];

const sudoku = new Sudoku(input);

console.log(`solving a sudoku of ${sudoku.size} by ${sudoku.size}`); 

console.log('raw: ', sudoku.raw);
console.log('vertical: ');
console.log(sudoku.vertical);
console.log('horizontal: ');
console.log(sudoku.horizontal);
console.log('solved: ', sudoku.solved);
