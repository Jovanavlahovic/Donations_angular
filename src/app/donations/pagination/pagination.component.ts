import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
@Input() numbOfItems: number;
@Input() pageSize: number;
pageNumbers: number[];
numbOfPages: number;
activePage:number = 1;
@Output() activePageNumb: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges():void{
    this.setPageNumbers();
    

  }

  setPageNumbers():void{
    this.numbOfPages = Math.ceil(this.numbOfItems/this.pageSize);
    this.pageNumbers = [];
     
    for(let i = 1; i <= this.numbOfPages; i++){
      this.pageNumbers.push(i);
    }
  }

  setActivePage(page:number){
    if(page > 0 && page <= this.numbOfPages){
      this.activePage = page;
      this.activePageNumb.emit(this.activePage);
    }
  }

}
