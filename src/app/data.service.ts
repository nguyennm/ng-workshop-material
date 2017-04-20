import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IBook } from "app/ibook";
import 'rxjs/add/operator/do';

@Injectable()
export class DataService {

  private _booksUrl = 'src/api/books.json';

  constructor(private _http: Http) { }

  getBooks(): Observable<IBook[]> {
    return this._http.get(this._booksUrl)
      .map((response: Response) => <IBook[]>response.json())
      .catch(this.handleError);
  }

  getBook(id: number): Observable<IBook> {
    return this.getBooks()
      .map((books: IBook[]) => books.find(b => b.id === id))
      //.do(data => console.log( JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error:any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
