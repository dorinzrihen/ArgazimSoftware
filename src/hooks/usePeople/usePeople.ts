import { useQuery } from '@tanstack/react-query';
import { PeopleRes, UsePeopleReturn } from './usePeople.types';


const usePeople = (pageSize: number, page: number) => {
    const calculateAge = (birthday: string): number => {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    return useQuery<UsePeopleReturn>({
        queryKey: ["people", pageSize, page],
        queryFn: async () => {
            const res = await fetch(
                `http://10.100.102.13:5283/api/people?pageSize=${pageSize}&pageNumber=${page}`
            );
            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            const totalCount  = Number(res.headers.get('x-total-count'));
            const rawData: PeopleRes[] = await res.json();

            const data = rawData.map((person) => ({
                ...person,
                age: calculateAge(person.birthday),
            }));

            return { data, totalCount }
        },
    });
};

export default usePeople;