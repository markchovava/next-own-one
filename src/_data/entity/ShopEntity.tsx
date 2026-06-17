export interface ShopInterface {
    orderBy: string
    minPrice: string | number
    maxPrice: string | number
    minYear: string | number
    maxYear: string | number
    mileage: string | number
    condition: string
    fuel: string
    transmission: string
    engine: string
    driveType: string
}

export const ShopEntity: ShopInterface = {
    orderBy: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    mileage: '',
    condition: '',
    fuel: '',
    transmission: '',
    engine: '',
    driveType: '',
}