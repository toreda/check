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

import {type Id, idMake, stringValue} from '@toreda/strong-types';
import {type TracerInit} from './tracer/init';
import Defaults from './defaults';
import {type Primitive} from '@toreda/types';

/**
 * Create a readable string to uniquely identify element instances based on their
 * position in the schema tree relative to the root schema.
 * @example
 * `schemaA.someObj.id`
 * `schemaA.someObj.subObj.name`
 *
 * @remark
 * Property name and parent element aren't specific enough to uniquely identify elements
 * in recursively verified schemas, which may contain multiple sub-schemas with the same
 * element names. e.g. schemaA.text and schemaA.schemaA.text would both look similar
 * without the full path.
 *
 * @category Tracer
 */
export class Tracer {
	public readonly path: string[];
	public readonly pathSeparator: string;
	public readonly targetObjName: Id;
	public readonly targetPropName: Id;
	public readonly params: Primitive[];

	constructor(init?: TracerInit) {
		this.path = this.mkPath(init?.path);
		this.pathSeparator = stringValue(init?.pathSeparator, Defaults.Tracer.PathSeparator);
		this.targetObjName = idMake(Defaults.Tracer.TargetObjName, init?.targetObjName);
		this.targetPropName = idMake(Defaults.Tracer.TargetPropName, init?.targetPropName);
		this.params = Array.isArray(init?.params) ? init.params : [];
	}

	public current(): string {
		return this.path.join(this.pathSeparator);
	}

	public explain(): string {
		return `${this.targetObjName()} ${this.path.join(' ')} ${this.params.join(', ')}`;
	}

	private mkPath(parts?: string | string[]): string[] {
		if (Array.isArray(parts)) {
			return parts;
		}

		if (typeof parts === 'string') {
			return [parts];
		}

		return [];
	}

	public child(id: string): Tracer {
		if (typeof id !== 'string' || !id) {
			return this;
		}

		return new Tracer({
			path: [...this.path, id],
			pathSeparator: this.pathSeparator
		});
	}

	public addParam(param: Primitive): void {
		this.params.push(param);
	}

	public clearTarget(): void {
		this.targetObjName.reset();
		this.targetPropName.reset();
	}
}
