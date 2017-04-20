import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IBook } from "app/ibook";
import { DataService } from "app/data.service";
import { MdSnackBar} from '@angular/material';

@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  providers: [DataService]
})
export class BookDetailComponent implements OnInit, OnDestroy {
  bookId: number;

  book: IBook;

  sub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dataService: DataService,
    private _snackBar: MdSnackBar) {}

  ngOnInit(): void {
    if (!this.bookId) {
      this.sub = this._route.params.subscribe(
        params => {
          let id = +params['id'];
          this.getBook(id);
        });
      return;
    }
    this.getBook(this.bookId);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getBook(id: number): void {
    this._dataService.getBook(id).subscribe(
      book => this.book = book,
      error => this.updateMessage(<any>error, 'Error'));
  }

  onRatingClicked(message: string): void {
    this.updateMessage(message, 'INFO');
  }

  updateMessage(message:string, type:string, actionText:string = 'DISMISS') {
    if (message) {
      this._snackBar.open(`${type}: ${message}`, actionText, {
        duration: 3000
      });
    }
  }

  return(): void {
    this._router.navigate(['/collection']);
  }

}
