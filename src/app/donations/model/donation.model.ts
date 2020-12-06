export class Donation{
    _id: number;
    name:string;
    description: string;
    charity_date: Date;
    categories: string[];
    estimated_value: number;

    constructor(obj?:any){
        this._id  = obj && obj._id || '';
        this.name = obj && obj.name || '';
        this.description = obj && obj.description || '';
        this.charity_date = obj && new Date(obj.charity_date) || null;
        this.categories = obj && obj.categories || '';
        this.estimated_value = obj && obj.estimated_value || '';
    }
}

export class DonationList{
    count: number;
    donors: Donation[];

    constructor(obj?:any){
        this.count = obj && obj.count;
        this.donors = obj && obj.donors.map(x => new Donation(x));
    }
}