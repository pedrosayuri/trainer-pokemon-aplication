export interface Pokemon {
    id: number;
    name: string;
    order: number;
    base_experience: number;
    weight: number;
    height: number;
    image: string;
    types: Type[];
}

interface Type {
    slot: number;
    type_name: string;
}