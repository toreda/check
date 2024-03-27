/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2024 Toreda, Inc.
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:

 * 	The above copyright notice and this permission notice shall be included in all
 * 	copies or substantial portions of the Software.
 *
 * 	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * 	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * 	SOFTWARE.
 *
 */

import type {BlockFlags} from './flags';
import {matcherMkDivisible} from '../matcher/mk/divisible';
import {matcherEmptyMk} from '../matcher/empty/mk';
import {Statement} from '../statement';
import {Block} from '../block';
import {MatcherFactory} from '../matcher/factory';
import {BlockLink} from './link';
import {matcherMkGreaterThan} from '../matcher/mk/greater/than';
import {matcherMkLessThan} from '../matcher/mk/less/than';
import {matcherMkEqual} from '../matcher/mk/equal';
import {matcherMkType} from '../matcher/mk/type';

/**
 * @category Statement Blocks
 */
export class BlockIs extends Block<Statement> {
	public readonly lessThan: MatcherFactory<number, BlockLink>;
	public readonly greaterThan: MatcherFactory<number, BlockLink>;
	public readonly equalTo: MatcherFactory<number, BlockLink>;
	public readonly empty: MatcherFactory<never, BlockLink>;
	public readonly notEmpty: MatcherFactory<never, BlockLink>;
	public readonly divisibleBy: MatcherFactory<number, BlockLink>;
	public readonly type: MatcherFactory<string, BlockLink>;

	constructor(stmt: Statement, flags?: BlockFlags) {
		super(stmt, 'is');
		this.empty = matcherEmptyMk({
			stmt: stmt,
			flags: flags
		});
		this.notEmpty = matcherEmptyMk({
			stmt: stmt,
			flags: flags
		});
		this.lessThan = matcherMkLessThan({
			stmt: stmt,
			flags: flags
		});
		this.greaterThan = matcherMkGreaterThan({
			stmt: stmt,
			flags: flags
		});
		this.equalTo = matcherMkEqual({
			stmt: stmt,
			flags: flags
		});
		this.divisibleBy = matcherMkDivisible({
			stmt: stmt,
			flags: flags
		});
		this.type = matcherMkType({
			stmt: stmt,
			flags: flags
		});
	}
}
