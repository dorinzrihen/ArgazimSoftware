type PeopleGender = "Male" | "Female"

const Headers = {
    firstName: 'firstName',
    lastName: 'lastName',
    gender: 'gender',
    birthday: 'birthday',
    age: 'age'
} as const

export type PeopleRes = {
    [Headers.firstName]: string;
    [Headers.lastName]: string;
    [Headers.gender]: PeopleGender;
    [Headers.birthday]: string;
    [Headers.age]: number
}

export type UsePeopleReturn = {
    data: PeopleRes[];
    totalCount: number;
};

export type Columns = keyof typeof Headers