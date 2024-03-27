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

import {Primitive} from '@toreda/types';
import {Block} from '../block';
import {MatcherFactory} from '../matcher/factory';
import {Statement} from '../statement';
import {BlockBe} from './be';
import {BlockContains} from './contains';
import type {BlockFlags} from './flags';
import {BlockMatch} from './match';
import {matcherMkEqual} from '../matcher/mk/equal';

/**
 * @category Rule Chains
 */
export class BlockMust extends Block<Statement> {
	public readonly be: BlockBe;
	public readonly match: BlockMatch;
	public readonly equal: MatcherFactory<Primitive, Block<Statement>>;
	public readonly contain: BlockContains;

	constructor(stmt: Statement, flags?: BlockFlags) {
		super(stmt, 'must');
		this.match = new BlockMatch(stmt, flags);
		this.equal = matcherMkEqual({
			stmt: stmt,
			flags: flags
		});
		this.be = new BlockBe(stmt, flags);
		this.contain = new BlockContains(stmt, flags);
	}
}
