import { Component, Input, OnInit } from '@angular/core';
import { Donation } from '../model/donation.model';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit {
@Input() donations: Donation[];

  constructor() { }

  ngOnInit(): void {
  }

}
