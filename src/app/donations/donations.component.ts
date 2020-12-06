import { Component, OnInit } from '@angular/core';
import { DonationService } from '../service/donation.service';
import { DonationList } from './model/donation.model';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {
donationList: DonationList;
categories: string[];
categoryValues: string[];

params = {
  page: 1,
  pageSize: 6,
  filter: {
    minValue: '',
    maxValue: '',
    categories: ''
  }

}
  constructor(private service: DonationService) { }

  ngOnInit(): void {
    this.getDonations();
    this.getCategories();
  }

  getDonations():void{
    this.service.getDonors(this.params).subscribe(x => {
      this.donationList = x;
      console.log(this.donationList);
    })
  }


  getCategories():void{
    this.service.getCategories().subscribe(x => {
      this.categories = x;

      this.categoryValues = [];
      for(var c of this.categories){
        if(c == "donations"){
          this.categoryValues.push('donation');
        } else {
          this.categoryValues.push(c);
        }
      }
    })
  }

  setActivePage(page:number):void{
    this.params.page = page;
    this.getDonations();
  }
}
