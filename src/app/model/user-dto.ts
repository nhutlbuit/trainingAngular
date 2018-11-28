import { Role } from './role';
import { User } from './user';
import { UserInfo } from './user-info';

export class UserDto {
  user: User;
  userInfo: UserInfo;
  roles: Role[];
}
