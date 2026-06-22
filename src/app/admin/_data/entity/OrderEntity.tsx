export interface OrderInterface {
    id: string | number
    carId: string | number
    userId: string | number
    orderRef: string
    priority: string | number
    carName: string
    carPrice: number
    customerName: string
    customerPhone: string
    customerEmail: string
    status: string
    notes: string
    createdAt: string
    updatedAt: string
}


export const OrderEntity: OrderInterface = {
    id: '',
    carId: '',
    userId: '',
    orderRef: '',
    priority: '',
    carName: '',
    carPrice: 0,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    status: '',
    notes: '',
    createdAt: '',
    updatedAt: '',
}