
export interface CarInterface {
    id: number
    name: string
    image?: string
    year: string
    condition: string
    mileage?: string
    engineCapacity: string
    fuel?: string
    transmission?: string
    price: string
    createdAt?: string
}


export const CarEntity: CarInterface = {
    id: 0,
    name: "",
    image: '',
    year: "",
    condition: "",
    mileage: "",
    engineCapacity: "",
    fuel: "",
    transmission: '',
    price: "",
    createdAt: ''
}