export class Constants {
  public static readonly OAUTH2_PATH = 'http://localhost:9999/auth';
  public static readonly CLIENT_ID = 'adminAcount-client';
  public static readonly RESPONSE_TYPE = 'code';
  // public static readonly ADMIN_UI_PATH = 'http://localhost:8080';
  public static readonly ADMIN_UI_PATH = '';
  public static readonly ASSIGNED_ROLE_PATH =
    '?projection=inlineSlAssignedUserRole';

  // FOR REFRESH TOKEN
  public static readonly _1MINUTE = 60 * 1000;
  public static readonly _9MINUTES = 9 * 60;
}
