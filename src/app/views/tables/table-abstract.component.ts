import { EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/models/page.model';
import { Language } from 'src/app/tools/language';
import {
  IConverter,
  IPromiseConverter,
} from '../../interfaces/converter.interface';

export abstract class PagedTableAbstractComponent<T> {
  abstract widths: Array<string | undefined>;
  abstract load?: EventEmitter<any>;
  get table_height() {
    if (this.page) {
      return `${(this.page.RecordCount / this.pageSize) * 100}%`;
    }
    return undefined;
  }
  Language = Language;
  datas: T[] = [];
  page: Page = new Page();
  loading = false;
  pageSize = 9;

  getPaged(count: number, size: number): Page {
    let current = size % count;
    if (current === 0) {
      current = size;
    }

    let page = {
      PageSize: size,
      PageCount: Math.ceil(count / size),
      PageIndex: Math.ceil(count / size),
      RecordCount: current,
      TotalRecordCount: count,
    };
    return page;
  }

  abstract loadData(index: number, size: number, ...args: any[]): void;

  pageEvent(page: PageEvent) {
    this.loadData(page.pageIndex + 1, this.pageSize);
  }
}

export abstract class ListAbstractComponent<
  TData,
  TSource
> extends PagedTableAbstractComponent<TData> {
  override pageSize = 15;
  list: TSource[] = [];
  abstract converter:
    | IConverter<TData[], TSource[]>
    | IPromiseConverter<TData[], TSource[]>;
}
