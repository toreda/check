/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2023 Toreda, Inc.
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

import {ChkChainRoot} from '../../../chk/chain/root';
import {EqualToCall} from './call';
import type {Matcher} from '../../../matcher';
import type {MatcherFunc} from '../../../matcher/func';
import type {NodeFlags} from '../../../node/flags';
import {NodeLink} from '../../../node/link';
import {equalTo} from '../../../equal/to';

/**
 *
 * @param next
 * @returns
 *
 * @category Matcher Factories
 */
export function matcherEqualToMk<ValueT>(
	root: ChkChainRoot<ValueT>,
	flags?: NodeFlags
): Matcher<ValueT, unknown> {
	return (right: unknown) => {
		// Link object MUST BE created during matcher func invocation. Moving it out into the surrounding closure
		// will cause infinite recursion & stack overflow.
		const link = new NodeLink<ValueT>(root);

		const fn: MatcherFunc<ValueT, EqualToCall> = async (
			value?: ValueT | null,
			params?: EqualToCall
		): Promise<boolean> => {
			return equalTo(value, params);
		};

		root.addMatcher<EqualToCall>({
			fn: fn,
			params: {
				right: right
			},
			flags: flags
		});

		return link;
	};
}
