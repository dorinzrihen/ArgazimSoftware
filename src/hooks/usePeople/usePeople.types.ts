type PeopleGender = "Male" | "Female"

export type PeopleRes = {
    firstName: string;
    lastName: string;
    gender: PeopleGender;
    birthday: string;
    age: number
}

export type UsePeopleReturn = {
    data: PeopleRes[];
    totalCount: number;
};
