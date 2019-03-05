import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface CarlistItem {
  key: string
  owner: string
  make: string,
  model: string,
  colour: string, 
}
export class CarlistDataSource extends DataSource<CarlistItem> {
  data: CarlistItem[];

  constructor(private paginator: MatPaginator, private sort: MatSort, data: CarlistItem[]) {
    super();
    this.data = data;
  }
  connect(): Observable<CarlistItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }
  disconnect() { }

  private getPagedData(data: CarlistItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: CarlistItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'key': return compare(a.key, b.key, isAsc);
        case 'owner': return compare(a.owner, b.owner, isAsc);
        case 'make': return compare(+a.make, +b.make, isAsc);        
        case 'model': return compare(+a.model, +b.model, isAsc);
        case 'colour': return compare(a.colour, b.colour, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
