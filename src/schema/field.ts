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

import {Ruleset} from '../ruleset';
import {type SchemaFieldData} from './field/data';
import {type SchemaFieldType} from './field/type';

/**
 * @category		Schema – Field
 */
export class SchemaField<InputT = unknown> {
	public readonly name: string;
	public readonly key: keyof InputT;
	public readonly types: SchemaFieldType<InputT>[];
	public readonly defaultValue: unknown;
	public readonly ruleset: Ruleset<InputT>;

	constructor(data: SchemaFieldData<InputT>) {
		this.key = data.name;
		this.name = data.name.toString();
		this.ruleset = new Ruleset<InputT>();

		if (Array.isArray(data.rules)) {
			this.ruleset.add(...data.rules);
		}

		if (Array.isArray(data.types)) {
			this.types = data.types;
		} else if (typeof data.types === 'string') {
			this.types = [data.types];
		} else {
			this.types = [];
		}

		this.defaultValue = typeof data.defaultValue !== 'undefined' ? data.defaultValue : undefined;
	}
}
