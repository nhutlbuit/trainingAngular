import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Scope } from '../model/scope';
import { UIService } from './uiservice.service';

@Injectable()
export class ScopeService {

  private scopeUrl;

  constructor(private httpClient: HttpClient,
              private uIService: UIService) {

        this.scopeUrl = this.uIService.baseAccountURL + '/slScopes';
  }

  findAllScopes(): Observable<any> {
    return this.httpClient.get<any>(this.scopeUrl);
  }

  addScope(scope: Scope): Observable<any> {
    return this.httpClient.post(this.scopeUrl, scope);
  }

  updateScope(id: number, scopeValue: string): Observable<any> {
    const scopeUrl = this.scopeUrl + `/${id}`;
    return this.httpClient.patch(scopeUrl, {scopeValue: scopeValue});
  }

  deleteScope(id: number): Observable<any> {
    const scopeUrl = this.scopeUrl + `/${id}`;
    return this.httpClient.delete(scopeUrl);
  }
}
