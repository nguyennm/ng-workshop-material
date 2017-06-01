import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IBook } from "app/ibook";
import 'rxjs/add/operator/do';

@Injectable()
export class DataService {

  private _booksUrl = 'assets/api/books.json';

  constructor(private _http: Http) { }

  getBooks(): Observable<IBook[]> {
    let localBooks = localStorage.getItem('books');
    if (localBooks) {
      return Observable.create(observer => {
        observer.next(JSON.parse(localBooks));
      });
    }
    return this._http.get(this._booksUrl)
      .map((response: Response) => {
        let data: IBook[] = <IBook[]>response.json();
        localStorage.setItem('books', JSON.stringify(data));
        return data;
      })
      .catch(this.handleError);
  }

  getBook(id: number): Observable<IBook> {
    return this.getBooks()
      .map((books: IBook[]) => books.find(b => b.id === id))
      //.do(data => console.log( JSON.stringify(data)))
      .catch(this.handleError);
  }

  addBook(book: IBook): Observable<IBook[]> {
    const local:string = localStorage.getItem('books');
    if (!local) return Observable.throw('Local storage not found.');
    let localBooks:IBook[] = JSON.parse(local);
    localBooks.push(book);
    localStorage.setItem('books', JSON.stringify(localBooks));
    return Observable.create(observer => {
      observer.next(localBooks);
    });
  }

  updateBook(book: IBook): Observable<IBook[]> {
    const local:string = localStorage.getItem('books');
    if (!local) return Observable.throw('Local storage not found.');
    let localBooks:IBook[] = JSON.parse(local);
    localBooks = localBooks.map(b => {
      if (b.id === book.id) {
        return Object.assign(b, book);
      }
      return b;
    });
    localStorage.setItem('books', JSON.stringify(localBooks));
    return Observable.create(observer => {
      observer.next(localBooks);
    });
  }

  private handleError(error:any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
