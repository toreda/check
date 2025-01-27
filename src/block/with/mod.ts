/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2025 Toreda, Inc.
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

import {type Constructor} from '@toreda/types';
import {Block} from '../../block';
import {Statement} from '../../statement';
import {type BlockInit} from '../init';
import {type BlockFlags} from '../flags';

/**
 * Interface for modifiers which wrap a `BlockT` and inject `ModKeyT` property.
 *
 * @category Rule Block Modifiers
 */
export type BlockWithMod<BlockT, ModKeyT extends string> = BlockT & Record<ModKeyT, BlockT>;

/**
 * Create a modifier that changes flags for subsequent blocks, altering block behavior or output.
 * @param 		CTOR
 * @param 		init
 * @param 		modFlags
 * @param 		modKey
 *
 * @category Rule Block Modifiers
 */
export function blockWithMod<InputT, BlockT extends Block<Statement<InputT>>, ModKeyT extends string>(
	CTOR: Constructor<BlockT>,
	init: BlockInit<InputT>,
	modFlags: BlockFlags,
	modKey: ModKeyT
): BlockWithMod<BlockT, ModKeyT> {
	const o = new CTOR(init);

	const initMod: BlockInit<InputT> = {
		...init,
		flags: modFlags
	};

	return Object.assign(
		{
			[modKey]: new CTOR(initMod)
		},
		o
	) as BlockWithMod<BlockT, ModKeyT>;
}
