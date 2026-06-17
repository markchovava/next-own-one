"use client"

import { CarInterface } from "@/_data/entity/CarEntity"
import { ShopEntity, ShopInterface } from "@/_data/entity/ShopEntity"
import { create } from "zustand"


interface Props {
    data: ShopInterface
    isLoading: boolean
    errors: ShopInterface
    carsList: CarInterface[]
    setData: (name: string, value: string | number) => void
    setCarsList: (i: CarInterface[]) => void
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> |
            React.ChangeEvent<HTMLTextAreaElement> |
            React.ChangeEvent<HTMLSelectElement>
    ) => void
}

export const useShopStore = create<Props>((set, get) => ({
    data: ShopEntity,
    isLoading: false,
    carsList: [],
    errors: ShopEntity,
    setData: (name, value) => {
        const i = get().data
        set({
            data: { ...i, [name]: value }
        })
    },
    setCarsList: (i) => {
        set({
            carsList: i,
            isLoading: false
        })
    },
    setInputValue: (e) => {
        const { name, value } = e.target;
        const currentData = get().data;
        const currentErrors = get().errors;
        set({
            data: {
                ...currentData,
                [name]: value
            },
            // Clear error for this field if it exists
            errors: currentErrors[name as keyof typeof currentErrors]
                ? { ...currentErrors, [name]: "" }
                : currentErrors
        });
    },
}));