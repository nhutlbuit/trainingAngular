
export class Student {
    id: string;
    classCode: string;
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    studentCode: string;
    isAddNew?: boolean;
    address: string;

    constructor(row: any) {
        this.id = row.id;
        this.classCode = row.trainingClass ? row.trainingClass.classCode : '';
        this.dateOfBirth = row.dateOfBirth;
        this.firstName = row.firstName;
        this.lastName = row.lastName;
        this.middleName = row.middleName;
        this.phoneNumber = row.phoneNumber;
        this.studentCode = row.studentCode;
        this.address  = row.address;
    }
}
