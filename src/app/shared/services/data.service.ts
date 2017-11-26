import 'rxjs/add/operator/map';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as qs from 'qs';

import { Configuration } from '../../app.constants';


@Injectable()
export class DataService {

    private baseUrl: string;
    private headers: Headers;

    constructor(private http: Http, private _configuration: Configuration) {
        this.baseUrl = _configuration.baseUrl;
    }

    //-------------------------METODOS HTTP-----------------------------//
    public findAll(
      path?: string,
      params?: any,
      headers?: Headers,
    ): Observable<any> {

      const options: RequestOptions = this.getOptions(headers);
      const url: string = this.buildUrl(path, params, undefined );

      return this.http.get(url, options).map(this.extractData);
    }

    public findOne(
      path?: string,
      id?: string,
      params?: any,
      headers?: Headers,
    ): Observable<any> {

      const options: RequestOptions = this.getOptions(headers);
      const url: string = this.buildUrl(path, params, id);

      return this.http.get(url, options).map(this.extractData);
    }


    //---------------FUNCIONES PRIVADAS Y HELPERS-----------------------//


    //devvuelve los datos en json
    private extractData(res: Response) {
        let headers = res.headers;
        let body = res.json();
        let data = {headers, body};
        return data;
    }

    // Pilla las options y las devuelve
    private getOptions(customHeaders?: Headers): RequestOptions {
      const requestHeaders = new Headers();

      requestHeaders.set('Accept', 'application/vnd.api+json');
      requestHeaders.set('Content-Type', 'application/vnd.api+json');
      if (this.headers) {
        this.headers.forEach((values, name) => {
          if (name !== undefined) {
            requestHeaders.set(name, values);
          }
        });
      }
      return new RequestOptions({ headers: requestHeaders });
    }

    //Construye lal URL con todo el path necesario para la petición
    private buildUrl(
      path?: string,
      params?: any,
      id?: string,
    ):string {
      const queryParams: string = this._toQueryString(params);
      const url: string = [this.baseUrl, path, id].filter((x) => x).join('/');

      return queryParams ? `${url}?${queryParams}` : url;
    }

    //stringify
    private _toQueryString(params: any): string {
      return qs.stringify(params, { arrayFormat: 'brackets' });
    }

}
