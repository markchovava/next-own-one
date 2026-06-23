"use client"

import { baseURL } from "@/_api/baseURL"
import { CarEntity, CarImageEntity, CarImageInterface, CarInterface, CarPropertyEntity, CarPropertyInterface } from "@/_data/entity/CarEntity"
import { carByPriceAction, carByYearAction } from "@/app/admin/_data/actions/CarActions"
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface, ResponseInterface } from "@/app/admin/_data/entity/ResponseEntity"
import { create } from "zustand/react"



interface Props {
    isLoading: boolean
    sortValue: string
    currentImage: string
    images: CarImageInterface[]
    properties: CarPropertyInterface[]
    data: CarInterface
    dataList: CarInterface[]
    meta: MetaInterface
    links: MetaLinksInterface
    yearRange: { min: string | number, max: string | number }
    setYearRange: (name: string, year: string | number) => void
    priceRange: { min: string | number, max: string | number }
    setPriceRange: (name: string, price: string | number) => void
    sortDataList: (i: string) => void
    setCurrentImage: (i: string) => void
    setDataList: (i: ResponseInterface) => void
    setData: (i: CarInterface) => void
    getDataListByPrice: (min: string | number, max: string | number) => Promise<void>
    getDataListByYear: (min: string | number, max: string | number) => Promise<void>
}


export const useCarStore = create<Props>((set, get) => ({
    isLoading: true,
    data: CarEntity,
    sortValue: '',
    images: [],
    properties: [],
    currentImage: '',
    meta: MetaEntity,
    links: MetaLinksEntity,
    dataList: [],
    priceRange: { min: '', max: '' },
    yearRange: { min: '', max: '' },
    setYearRange: (name, year) => {
        const i = get().yearRange
        set({
            yearRange: { ...i, [name]: year }
        })
    },
    setPriceRange: (name, price) => {
        const i = get().priceRange
        set({
            priceRange: { ...i, [name]: price }
        })
    },
    sortDataList: (i: string) => {
        const list = get().dataList;
        // Safeguard if dataList is empty or undefined
        if (!list || list.length === 0) return;
        set({
            sortValue: i
        })
        switch (i) {
            case 'priceDesc':
                set({
                    // Sort by price descending (highest to lowest)
                    dataList: [...list].sort((a, b) => Number(b.price || 0) - Number(a.price || 0))
                });
                return;
            case 'priceAsc':
                set({
                    // Sort by price ascending (lowest to highest)
                    dataList: [...list].sort((a, b) => Number(a.price || 0) - Number(b.price || 0))
                });
                return;
            case 'nameAsc':
                set({
                    // Sort by car name alphabetically ascending (A to Z)
                    dataList: [...list].sort((a, b) => (a.name || "").localeCompare(b.name || ""))
                });
                return;
            case 'nameDesc':
                set({
                    // Sort by car name alphabetically descending (Z to A)
                    dataList: [...list].sort((a, b) => (b.name || "").localeCompare(a.name || ""))
                });
                return;
            default:
                set({
                    // Fallback default: Sort by car name alphabetically ascending (A to Z)
                    dataList: [...list].sort((a, b) => (a.name || "").localeCompare(b.name || ""))
                });
                return;
        }
    },
    setCurrentImage: (i) => {
        set({
            currentImage: baseURL + i
        })
    },
    setData: (i) => {
        set({
            data: i,
            images: i.images,
            properties: i.properties,
            isLoading: false,
        })
    },
    setDataList: (i) => {
        const { data, links, meta } = i;
        set({
            dataList: data || [],
            meta: meta || MetaEntity,
            links: links || MetaLinksEntity,
            isLoading: false,
        });
    },
    getDataListByPrice: async (min, max) => {
        set({ isLoading: true });
        try {
            const res = await carByPriceAction(min, max);
            console.log('carByPriceAction: ', res)
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isLoading: false,
            });
        }
    },
    getDataListByYear: async (min, max) => {
        set({ isLoading: true });
        try {
            const res = await carByYearAction(min, max);
            console.log('carByYearAction res: ', res);

            // 3. Fix: Safely handle if res is null or undefined
            if (!res) {
                set({
                    dataList: [],
                    meta: MetaEntity,
                    links: MetaLinksEntity,
                    isLoading: false,
                });
                return;
            }

            if (res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error in store: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isLoading: false,
            });
        }
    },
}))