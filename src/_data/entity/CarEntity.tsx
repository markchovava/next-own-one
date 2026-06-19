

export interface CarPropertyInterface {
    name: string
    value: string | number
}

export interface CarInterface {
    id: number
    name: string
    image?: string
    year: string
    condition: string
    mileage?: string
    engineCapacity: string
    description: string
    fuel?: string
    transmission?: string
    price: string
    createdAt?: string
    properties: CarPropertyInterface[]
}


export const CarEntity: CarInterface = {
    id: 0,
    name: "",
    image: '',
    year: "",
    description: '',
    condition: "",
    mileage: "",
    engineCapacity: "",
    fuel: "",
    transmission: '',
    price: "",
    createdAt: '',
    properties: []
}