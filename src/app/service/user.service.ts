import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { UserDto } from '../model/user-dto';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../shared/constants';
import { User } from '../model/user';
import { UserInfo } from '../model/user-info';
import { Role } from '../model/role';
import { UIService } from './uiservice.service';
import { Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class UserService {
  private ROOT_URL;

  dialogData: any;
  isAct = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private uIService: UIService) {
    this.ROOT_URL = this.uIService.baseAccountURL;
  }

  getAllUsers(page: number, size: number): Observable<any> {
    const url = 'https://5bed92d27839000013e6f9c7.mockapi.io/api/users';
    return this.httpClient.get<any>(url);
  }

  findByUserName(
    page: number,
    size: number,
    userName: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      this.ROOT_URL +
      '/user/search/findByUserNameContainingIgnoreCase?projection=inlineSlUser' +
      '&page=' +
      page +
      '&size=' +
      size +
      '&userName=' +
      userName
    );
  }

  createUser(userDto: UserDto): Observable<any> {
    return this.httpClient.post(this.ROOT_URL + '/custom/user', userDto);
  }

  createUserInfo(userInfo: UserInfo): Observable<any> {
    return this.httpClient.post(
      this.ROOT_URL + '/user-info',
      userInfo,
      httpOptions
    );
  }

  updateUser(id: number, request: any): Observable<any> {
    return this.httpClient.patch(
      this.ROOT_URL + '/custom/user/' + id,
      request,
      httpOptions
    );
  }

  updateUserInfo(id: number, userInfo: UserInfo): Observable<any> {
    return this.httpClient.patch(
      this.ROOT_URL + '/user-info/' + id,
      userInfo,
      httpOptions
    );
  }

  updateAssignedRoles(userId: number, roles: Role[]): Observable<any> {
    return this.httpClient.put(
      this.ROOT_URL + '/custom/user/' + userId + '/role',
      roles,
      httpOptions
    );
  }

  getAssignedRoles(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }
}
