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
			
			break;
		}

		this.empty = options.empty;
		this.raw = input.slice(0);
		this.vertical = void(0);
		this.horizontal = void(0);
		this.block = void(0);
		this.side = Math.sqrt(input.length);
		this.square_size = Math.sqrt(this.side);

		this.value = this.generate_value(input);

		this.vertical = this._make_vertical(input); 
		this.horizontal = this._make_horizontal(input);
		this.block = this._make_blocks(this.vertical);
		this.solved = this.solve(input);

	}

	_make_vertical(arr) {
		const vertical = this._get_2d_array(this.side);

		for(let i = this.side - 1; i >= 0; i--) {
			for(let j = this.side - 1; j >= 0; j--) {
				vertical[i][j] = arr[i * this.side + j];
			}
		}

		return vertical;
	}

	_make_horizontal(arr) {
		const horizontal = this._get_2d_array(this.side);

		for(let i = this.side - 1; i >= 0; i--) {
			for(let j = this.side - 1; j >= 0; j--) {
				horizontal[j][i] = arr[i * this.side + j];
			}
		}

		return horizontal;
	
	}

	_make_blocks(vertical) {
		const block = this._get_2d_array(this.square_size).map(x => x.map(x => []));

		for(let i = this.side - 1; i >= 0; i--) {
			for(let j = this.side - 1; j >= 0; j--) {
				block[Math.floor(i / this.square_size)][Math.floor(j / this.square_size)].push(vertical[i][j]);
			}
		}

		return block;
	}

	find_last_empty(arr, empty) {
		let result;
		arr.forEach(x => {
			const res = x.indexOf(empty);
			if (res)
				result = res;
		});
		return result;
	}

	find_next_empty(arr, empty, ignore) {
		if(empty === void(0))
			empty = 0;
		let result = arr.indexOf(empty);
		if(ignore === result){
			const temp = arr[result];
			const temp_result = result;
			arr[result] = 99;
			result = arr.indexOf(empty);
			arr[temp_result] = temp;
		}
		return result;
	}


	generate_value(arr){
		return arr.reduce(
			(total, val) => total + val
		);
	}

	solve(input, last_empty) {
		let solved = {vertical: this._make_vertical(input), horizontal:this._make_horizontal(input), block: this._make_blocks(this._make_vertical(input))};
		let next_empty = this.find_next_empty(input, this.empty, last_empty);
		let solution;

		if(next_empty === -1)
			return input;

		const x = next_empty % this.side;
		const y = (next_empty - x) / this.side;

		let res = this._get_possibility(x,y, solved);
		if (res[0] === void(0)) {
			return false;
		}

		res.forEach((sol, i) => {
			const new_input = input.slice(0);
			new_input[next_empty] = sol;
			let result = this.solve(new_input, next_empty);
			if(result)
				solution = result;
		});

		return solution;

	}

	/**
	 * get possability
	 * @args {int} x, y
	 */
	_get_possibility(x,y, solved) {
		// figure out the number its supposed to be using magic
		let res = [];
		for(let i = 1; i < 10; i++) {
			if (solved.block[Math.floor(y / this.square_size)][Math.floor(x / this.square_size)].indexOf(i) === -1){
				if (solved.vertical[y].indexOf(i) === -1){
					if (solved.horizontal[x].indexOf(i) === -1) {
						res.push(i);
					}
				}
			}
		}
		return res;
	}

	_get_2d_array(size) {
		// make a new 2d array filled with zeros and return it
		return new Array(size).fill(0).map(() => new Array(size).fill(0));
	}

}
// neatly formatted sodoku input which is solvable
const input = [
	9, 0, 0, 1, 0, 8, 6, 0, 2,
	0, 1, 7, 0, 2, 0, 3, 5, 0,
	2, 8, 0, 0, 7, 3, 9, 0, 0,
	8, 0, 0, 0, 6, 7, 1, 0, 5,
	5, 6, 0, 8, 0, 0, 0, 2, 7,
	1, 0, 2, 4, 9, 0, 8, 0, 0,
	0, 0, 1, 6, 8, 0, 0, 3, 9,
	0, 2, 8, 3, 0, 9, 0, 4, 0,
	0, 9, 5, 0, 0, 4, 2, 8, 0];

const sudoku = new Sudoku(input);

console.log(`solving a sudoku of ${sudoku.side} by ${sudoku.side}`); 

console.log('solved: ');
console.log(sudoku.solved);
console.log(sudoku._make_vertical(sudoku.solved));
