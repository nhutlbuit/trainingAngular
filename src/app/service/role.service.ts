import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Role } from '../model/role';
import { UIService } from './uiservice.service';

@Injectable()
export class RoleService {
  private ROOT_URL;

  constructor(private httpClient: HttpClient, private uIService: UIService) {
    this.ROOT_URL = this.uIService.baseAccountURL;
  }

  getAll(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(
      this.ROOT_URL + '/slRoles' + '?page=' + page + '&size=' + size
    );
  }

  findAll(): Observable<any> {
    return this.httpClient.get<any>(this.ROOT_URL + '/slRoles');
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
