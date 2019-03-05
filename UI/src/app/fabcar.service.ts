import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
export interface BlockchainInfo {
  height: number;
  currentBlockHash: string;
  previousBlockHash: string;
}
@Injectable({
  providedIn: 'root'
})

export class FabcarService {
  private dsBlockHeight = new BehaviorSubject<number>(0);
  BlockHeight = this.dsBlockHeight.asObservable();

  private dsAssetCount = new BehaviorSubject<number>(0);
  AssetCount = this.dsAssetCount.asObservable();

  private dsLastTransId = new BehaviorSubject<string>('');
  LastTransId = this.dsLastTransId.asObservable();

  appUrl: string = " http://localhost:8080/api/";
  Payload: any;
  constructor(private http: HttpClient) {
  }

  updatedBlockHeight(data: number) {
    this.dsBlockHeight.next(data);
  }
  updatedAssetCount(data: number) {
    this.dsAssetCount.next(data);
  }
  updatedLastTransId(data: string) {
    this.dsLastTransId.next(data);
    this.getBlockchainInfo().subscribe((res: any) => {
      this.updatedBlockHeight(res.height.low)
    });
  }
  getCarList() {
    return this.http.get<any>(this.appUrl + 'cars')
      .pipe();
  }
  getCar(carid: string) {
    return this.http.get<any>(this.appUrl + 'car?carid=' + carid)
      .pipe();
  }
  createCar(car: any) {
    return this.http.post<any>(this.appUrl + 'car', car)
      .pipe();
  }
  updateCar(car: any) {
    return this.http.post<any>(this.appUrl + 'car', car)
      .pipe();
  }
  deleteCar(carid: string) {
    return this.http.delete(this.appUrl + 'car?carid=' + carid)
      .pipe();
  }
  HistoryInfo(carid: string) {
    return this.http.get(this.appUrl + 'cars/history?carid=' + carid)
      .pipe();
  }
  getBlockchainInfo() {
    return this.http.get(this.appUrl + 'blockchain')
      .pipe();
  }
  createTokenheaders() {
    return new HttpHeaders().set('authorization', 'Bearer ' + this.Payload.Login.output.token).set("content-type", "application/json");
  }

}
