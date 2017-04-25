import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { IBook } from 'app/ibook';

@Component({
  selector: 'my-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() rating: number;
  @Input() book: IBook;
  @Output() ratingClicked: EventEmitter<IBook> = new EventEmitter<IBook>();

  ngOnInit(): void {
    //console.log("ngOnInit called for: " + this.rating.toString());
  }

  ngOnChanges(): void {
    //console.log("The rating was just set to: " + this.rating.toString());
  }

  click(rating:number): void {
    this.rating = rating;
    this.book.rating = rating;
    this.ratingClicked.emit(this.book);
  }

}
