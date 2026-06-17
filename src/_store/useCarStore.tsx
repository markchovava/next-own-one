"use client"

import { CarEntity, CarInterface } from "@/_data/entity/CarEntity"
import { create } from "zustand/react"



interface Props {
    isLoading: boolean
    data: CarInterface
    dataList: CarInterface[]
    setData: (i: CarInterface) => void
    setDataList: (i: CarInterface[]) => void
}


export const useCarStore = create<Props>((set, get) => ({
    isLoading: false,
    data: CarEntity,
    dataList: [],
    setData: (i) => {
        set({
            data: i
        })
    },
    setDataList: (i) => {
        set({
            dataList: i
        })
    },
}))