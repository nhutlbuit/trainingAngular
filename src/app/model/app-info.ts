import { Scope } from './scope';

export class AppInfo {
    id: string;
    clientSecrets: string;
    clientName: string;
    redirectUrl: string;
    resourceIds: string;
    grantTypes: string;
    scopes: Scope[];
    isActive: number;
}
