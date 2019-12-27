import { Component, OnInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit,AfterContentChecked {
  
  ngAfterContentChecked(): void {
    throw new Error("Method not implemented.");
  }

  constructor() { }

  ngOnInit() {
  }

}
