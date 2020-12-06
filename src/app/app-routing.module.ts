import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDonationComponent } from './donations/add-donation/add-donation.component';
import { DonationsComponent } from './donations/donations.component';

const routes: Routes = [
  {path: "donors", component: DonationsComponent},
  {path: 'donors/add', component: AddDonationComponent},
  {path: 'donors/add/:id', component: AddDonationComponent},
  {path: '', redirectTo: 'donors', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
