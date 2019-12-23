import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Category } from './category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath,category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  } 
 // update(category: Category): 

  private jsonDataToCategories(JsonData: any[]): Category[] {
    const categories: Category[] = [];
    JsonData.forEach(element => categories.push(element as Category));
    return categories;
  }

  private jsonDataToCategory(JsonData: any): Category {
    return JsonData as Category;
  }


  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÂO ", error);
    return throwError(error);
  }

}
