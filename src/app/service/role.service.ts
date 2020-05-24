import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Role } from '../model/role';
import { UIService } from './uiservice.service';
@Injectable({providedIn: 'root'})
export class RoleService {
  private ROOT_URL;

  constructor(private httpClient: HttpClient, private uIService: UIService) {
    this.ROOT_URL = this.uIService.baseAccountURL;
  }

  getAll(page: number, size: number): Observable<any> {
    const url = 'http://5bed92d27839000013e6f9c7.mockapi.io/api/role';
    return this.httpClient.get<any>(url);
  }

  findAll(): Observable<any> {
    const url = 'http://5bed92d27839000013e6f9c7.mockapi.io/api/role';
    return this.httpClient.get<any>(url);
  }

  getByRoleName(roleName: string): Observable<any> {
    return this.httpClient.get<any>(
      this.ROOT_URL + '/slUsers/search/findByRoleNameContainingIgnoreCase',
      {
        params: new HttpParams().set('roleName', roleName)
      }
    );
  }

  createRole(role: Role): Observable<any> {
    return this.httpClient.post(this.ROOT_URL + '/slRoles', role);
  }

  updateRole(id: number, request: any): Observable<any> {
    return this.httpClient.patch(
      this.ROOT_URL + '/slRoles' + '/' + id,
      request
    );
  }
}
