import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Donation, DonationList } from '../donations/model/donation.model';

const baseUrl = 'http://localhost:3000/api/donors';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http: HttpClient) { }

  getDonors(params?): Observable<DonationList>{
     let queryParams = {};

     if (params) {
       queryParams = {
         params: new HttpParams()
           .set('page', (params.page && params.page.toString()) || '1')
           .set(
             'pageSize',
             (params.pageSize && params.pageSize.toString()) || '1'
           )
           .set(
             'filter',
             (params.filter && JSON.stringify(params.filter)) || ''
           ),
       };
     }
    return this.http.get(baseUrl, queryParams).pipe(map(x => new DonationList(x)))
  }

  getDonation(id:number): Observable<Donation>{
    return this.http.get(`${baseUrl}/${id}`).pipe(map(x => new Donation(x)))
  }

  updateDonation(donation: Donation): Observable<Donation>{
    return this.http.put(`${baseUrl}/${donation._id}`, donation).pipe(map(x => new Donation(x)))
  }

  addDonation(donation:Donation): Observable<Donation>{
    return this.http.post(baseUrl, donation).pipe(map(x => new Donation(x)))
  }

  getCategories():Observable<string[]>{
    return this.http.get('http://localhost:3000/api/categories').pipe(map((x:any) => x as Array<string>))
  }


}
