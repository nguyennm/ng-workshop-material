import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() rating: number;
  @Output() ratingClicked: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    //console.log("ngOnInit called for: " + this.rating.toString());
  }

  ngOnChanges(): void {
    //console.log("The rating was just set to: " + this.rating.toString());
  }

  click(rating:number): void {
    this.rating = rating;
    this.ratingClicked.emit(this.rating);
  }

}
