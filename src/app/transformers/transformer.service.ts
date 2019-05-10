import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {catchError} from 'rxjs/internal/operators/catchError';
import {of} from 'rxjs/internal/observable/of';
import {Faction, Trans, VehicleTypes} from './transformer';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransformerService {
  private transformersUrl = '/api/transformers';
  private vehicleTypesUrl = '/api/vehicleTypes';
  private factionsUrl = '/api/factions';
  private transformers: Trans[];
  private transformer: Trans;
  private vehicleTypes: VehicleTypes[];
  private factions: Faction[];
  private selectedTransformerSource = new BehaviorSubject<Trans| null>(null);
  selectedTransformerChanges$ = this.selectedTransformerSource.asObservable();

  constructor(private http: HttpClient) { console.log('constructor in service'); }

  changeSelectedTransformer(selectedTransformer: Trans | null): void {
    console.log('changeSelectedTransformer');
    this.selectedTransformerSource.next(selectedTransformer);
  }

  getTransformers(): Observable<Trans[]> {
    if (this.transformers) {
      return of(this.transformers);
    }
    return this.http.get<Trans[]>(this.transformersUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.transformers = data),
        catchError(this.handleError)
      );
  }
  getTransformer(id: number): Observable<Trans> {
    return this.http.get<Trans>(this.transformersUrl + '/' + id)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.transformer = data),
        catchError(this.handleError)
      );
  }
  getVehicleTypes(): Observable<VehicleTypes[]> {
    if (this.vehicleTypes) {
      return of(this.vehicleTypes);
    }
    return this.http.get<VehicleTypes[]>(this.vehicleTypesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.vehicleTypes = data),
        catchError(this.handleError)
      );
  }
  getFactions(): Observable<Faction[]> {
    if (this.factions) {
      return of(this.factions);
    }
    return this.http.get<Faction[]>(this.factionsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.factions = data),
        catchError(this.handleError)
      );
  }
  // Return an initialized transformer
  newTransformer(id: number): Trans {
    console.log('newTransformer');
    const idNumber = id;
    return {
      id: idNumber,
      name: 'New',
      vehicleGroup: '',
      vehicleType: '',
      vehicleModel: '',
      gear: [''],
      status: ''
    };
  }
  createTransformer(transformer: Trans): Observable<Trans> {
    console.log('create Transformer');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    transformer.id = null;
    return this.http.post<Trans>(this.transformersUrl, transformer, { headers: headers })
      .pipe(
        tap(data => console.log('createTransformer: ' + JSON.stringify(data))),
        tap(data => {
          this.transformers.push(data);
        }),
        catchError(this.handleError)
      );
  }


  updateTransformer(transformer: Trans): Observable<Trans> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.transformersUrl}/${transformer.id}`;
    return this.http.put<Trans>(url, transformer, { headers: headers })
      .pipe(
        tap(() => console.log('updateTransformer: ' + transformer.id)),
        // Update the item in the list
        // This is required because the selected transformer that was edited
        // was a copy of the item from the array.
        tap(() => {
          const foundIndex = this.transformers.findIndex(item => item.id === transformer.id);
          if (foundIndex > -1) {
            this.transformers[foundIndex] = transformer;
          }
        }),
        // Return the transformer on an update
        map(() => transformer),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}

