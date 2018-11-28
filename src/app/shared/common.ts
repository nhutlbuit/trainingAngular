import { Injectable } from '@angular/core';

@Injectable()
export class Common {

    constructor() { }

    public static getParameterByName = function (name: any) {
        const url = window.location.href;
        name = name.replace(/[[]]/g, '\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
        if (!results) {
          return null;
        }
        if (!results[2]) {
          return '';
        }
        return decodeURIComponent(results[2].replace('/+/g', ' '));
      };

}
