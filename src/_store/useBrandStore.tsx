"use client"

import { BrandInterface } from "@/app/admin/_data/entity/BrandEntity"
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface, ResponseInterface } from "@/app/admin/_data/entity/ResponseEntity"
import { create } from "zustand"

interface Props {
    isLoading: boolean
    dataList: BrandInterface[]
    // Added 'data' here so you can store a single selected brand
    data: BrandInterface | null
    meta: MetaInterface
    links: MetaLinksInterface
    sortDataList: (sortBy: string) => void
    setDataList: (i: ResponseInterface) => void
    setData: (i: BrandInterface) => void
}

export const useBrandStore = create<Props>((set, get) => ({
    isLoading: true,
    dataList: [],
    data: null, // Initialized as null
    meta: MetaEntity,
    links: MetaLinksEntity,

    setDataList: (i) => {
        const { data, links, meta } = i;
        set({
            dataList: data || [],
            meta: meta || MetaEntity,
            links: links || MetaLinksEntity,
            isLoading: false,
        });
    },

    setData: (i) => {
        set({
            data: i,
            isLoading: false,
        })
    },

    // Implemented the missing sort method
    sortDataList: (sortBy) => {
        const { dataList } = get();
        // Simple client-side alphabetical sort example (adjust logic as needed)
        const sorted = [...dataList].sort((a, b) => {
            if (sortBy === 'asc') return a.name > b.name ? 1 : -1;
            return a.name < b.name ? 1 : -1;
        });

        set({ dataList: sorted });
    },
}))