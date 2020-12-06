import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DonationService } from 'src/app/service/donation.service';
import { Donation } from '../model/donation.model';

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.css'],
})
export class AddDonationComponent implements OnInit {
  donation: Donation;
  id: number;
  categories: string[];
  categoryValues: string[];
  formValidator: FormGroup;
  date;

  constructor(
    private route: ActivatedRoute,
    private service: DonationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.generateFormValidator();
    this.getCategories();

    if (this.id) {
      this.service.getDonation(this.id).subscribe(x => {
        this.donation = x;
        this.date = {year: this.donation.charity_date.getFullYear(), month: this.donation.charity_date.getMonth()+1, day: this.donation.charity_date.getDate()}
        this.formValidator.patchValue(this.donation);
        this.formValidator.get('charity_date').patchValue(this.date);
      })
    } else{
      this.donation = new Donation();
    }
  }

  getCategories(): void {
    this.service.getCategories().subscribe((x) => {
      this.categories = x;

      this.categoryValues = [];
      for (var c of this.categories) {
        if (c == 'donations') {
          this.categoryValues.push('donation');
        } else {
          this.categoryValues.push(c);
        }
      }
    });
  }

  generateFormValidator():void{
    this.formValidator = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      charity_date: ['', Validators.required],
      categories: ['', Validators.required],
      estimated_value: ['', Validators.required],
    });
  }

  setDate():void{
   let date = this.formValidator.get('charity_date').value;
   this.donation.charity_date = new Date(date.year, date.month-1, date.day);
  }

  onSubmit():void{
    this.donation = this.formValidator.value;
    this.setDate();

    if(this.id){
      this.donation._id = this.id;
      this.service.updateDonation(this.donation).subscribe(x => {
        this.donation = x;
        console.log(this.donation);
      })
    } else{
      this.service.addDonation(this.donation).subscribe(x => {
        this.donation = x;
        console.log(this.donation);
      })
    }
  }
}
