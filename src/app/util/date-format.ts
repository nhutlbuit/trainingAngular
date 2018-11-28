import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const VN_DATE_FORMATS = {
    parse: {
        dateInput: 'L',
    },
    display: {
        dateInput: 'L',
    },
};

export const VN_DATE_PROVIDER = [
    { provide: MAT_DATE_LOCALE, useValue: 'vi' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: VN_DATE_FORMATS }
];
