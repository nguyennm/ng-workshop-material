import { Component, OnInit } from '@angular/core';
import { IBook } from 'app/ibook';
import { DataService } from 'app/data.service';
import { MdSnackBar, MdDialog } from '@angular/material';
import { BookDetailComponent } from 'app/book-detail/book-detail.component';
import { NewBookComponent } from 'app/new-book/new-book.component';
import { Router } from '@angular/router';

@Component({
  selector: 'my-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  constructor(private _dataService: DataService, private _snackBar: MdSnackBar, private _dialog: MdDialog, private _router: Router) {
    this.startTime = new Date();
    this.startTime.setHours(10, 0);
    this.endTime = new Date();
    this.endTime.setHours(15, 0);
  }

  ngOnInit(): void {
    this.getBooks();
  }

  pageTitle:string = 'Books';

  books:Array<IBook>;

  startTime:Date;

  endTime:Date;

  showOperatingHours:boolean = false;

  updateMessage(message:string, type:string): void {
    if (message) {
      this._snackBar.open(`${type}: ${message}`, 'DISMISS', {
        duration: 3000
      });
    }
  }

  onRatingUpdate(book:IBook): void {
      this.updateBook(book);
  }

  openDialog(bookId:number): void {
    let config = {width: '650px', height: '400x', position: {top: '50px'}};
    let dialogRef = this._dialog.open(BookDetailComponent, config);
    dialogRef.componentInstance.bookId = bookId;
    dialogRef.afterClosed().subscribe(res => {
      this.getBooks();
    });
  }

  openRoute(bookId:number): void {
    this._router.navigate(['/collection', bookId]);
  }

  getBooks(): void {
    this._dataService.getBooks()
      .subscribe(
        books => this.books = books,
        error => this.updateMessage(<any>error, 'ERROR'));
  }

  addBook(): void {
    let config = {width: '650px', height: '650x', position: {top: '50px'}, disableClose: true};
    let dialogRef = this._dialog.open(NewBookComponent, config);
    dialogRef.afterClosed().subscribe(newBook => {
      if (newBook) {
        newBook.id = this.books.length + 1;
        this._dataService.addBook(newBook)
          .subscribe(
            books => this.books = books,
            error => this.updateMessage(<any>error, 'ERROR'));
      }
    });
  }

  updateBook(book: IBook): void {
    this._dataService.updateBook(book)
      .subscribe(
        books => {
          this.books = books;
          this._snackBar.open(`"${book.title}" has been updated!`, 'DISMISS', {
            duration: 3000
          });
        },error => this.updateMessage(<any>error, 'ERROR'));
  }
}
