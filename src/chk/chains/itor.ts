import type {Itor, ItorItem} from '@toreda/types';

import {ChkChain} from '../chain';
import {chkChainsItorItemMk} from './itor/item/mk';

export class ChkChainsItor<ValueT> implements Itor<ChkChain<ValueT> | null> {
	public ndx: number;
	private readonly _items: ChkChain<ValueT>[];

	constructor(items: ChkChain<ValueT>[]) {
		this._items = items;
		this.ndx = 0;
	}

	public next(): ItorItem<ChkChain<ValueT> | null> {
		if (!this._items.length) {
			return chkChainsItorItemMk<ChkChain<ValueT> | null>(null, true);
		}

		const value = this._items[this.ndx];
		const done = this.ndx === this._items.length;

		this.ndx++;
		return chkChainsItorItemMk<ChkChain<ValueT> | null>(value, done);
	}
}