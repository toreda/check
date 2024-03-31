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

import {Fate} from '@toreda/fate';
import {type ExecutorParams} from './executor/params';
import {type ExecutionContext} from './execution/context';
import {type Executable} from './executable';
import {executorMkContext} from './executor/mk/context';
import {numberValue} from '@toreda/strong-types';
import Defaults from './defaults';

/**
 *
 * @param params
 *
 * @category Executor
 */
export async function executor<ValueT, CollectionT extends Executable>(
	params: ExecutorParams<ValueT, CollectionT>
): Promise<Fate<ExecutionContext>> {
	const ctx = executorMkContext({
		name: params.name
	});

	const fate = new Fate<ExecutionContext>({
		data: ctx
	});

	if (!fate.data) {
		return fate.setErrorCode('bad_fate_init');
	}

	try {
		const ctx = fate.data;
		ctx.summary.counts.total = params.collection.length;

		for (const item of params.collection) {
			const subResult = await item.execute(params.value);

			if (subResult.data) {
				fate.data?.results.push(subResult.data);
			}

			switch (subResult.data?.outcome) {
				case 'fail':
					ctx.summary.counts.fail++;
					break;
				case 'pass':
					ctx.summary.counts.pass++;
					break;
				case 'error':
					ctx.summary.counts.error++;
					break;
				case 'skip':
					ctx.summary.counts.skip++;
					break;
			}
		}

		const maxFails = numberValue(params?.flags?.maxFails, Defaults.Executor.MaxFails);
		const maxErrors = numberValue(params?.flags?.maxErrors, Defaults.Executor.MaxErrors);

		if (ctx.summary.counts.error > maxErrors) {
			ctx.outcome = 'error';
		} else if (ctx.summary.counts.fail > maxFails) {
			ctx.outcome = 'fail';
		} else {
			ctx.outcome = 'pass';
		}

		fate.setSuccess(true);
	} catch (e: unknown) {
		const msg = e instanceof Error ? e.message : 'nonerror_type';
		ctx.outcome = 'error';
		fate.setErrorCode(`executor_exception:${msg}`);
	}

	return fate;
}
