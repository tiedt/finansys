import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceModel } from '../base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {

    constructor(private http: HttpClient) { }
    
    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResources)
        )
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResource)
        )
    }

    create(Resources: T): Observable<T> {
        return this.http.post(this.apiPath, Resources).pipe(
            catchError(this.handleError),
            map(this.jsonDataToResource)
        )
    }
    update(Resources: T): Observable<T> {
        const url = `${this.apiPath}/${Resources.id}`;
        return this.http.put(url, Resources).pipe(
            catchError(this.handleError),
            map(() => Resources))
    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            catchError(this.handleError),
            map(() => null))
    }

    protected jsonDataToResources(JsonData: any[]): T[] {
        const resource: T[] = [];
        JsonData.forEach(element => resource.push(element as T));
        return resource;
      }
    
      protected jsonDataToResource(JsonData: any): T {
        return JsonData as T;
      }
    
    
      protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÂO ", error);
        return throwError(error);
      }
    
}