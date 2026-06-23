"use client"

import { useEffect } from 'react'
import CardSelect from '../cards/CardSelect'
import SelectInput2 from '../forms/selects/SelectInput2'
import CardTwo from '../cards/CardTwo'
import CardSelect2 from '../cards/CardSelect2'
import { ShopOrderByData } from '@/_data/sample/ShopData'
import { NoImageData } from '@/_data/sample/NoImage'
import { PriceData } from '@/_data/sample/PriceData'
import { getPastNumberedYears } from '@/_utils/formatDate'
import { useCarStore } from '@/_store/useCarStore'
import LoaderPrimary from '@/app/admin/_components/loaders/LoaderPrimary'
import { baseURL } from '@/_api/baseURL'
import PlaceholderDefault from '@/app/admin/_components/placeholders/PlaceholderDefault'

interface Props {
    dbData: any
}

export default function ShopSection({ dbData }: Props) {
    const {
        priceRange,
        yearRange,
        setDataList,
        setPriceRange,
        setYearRange,
        getDataListByPrice,
        getDataListByYear,
    } = useCarStore()

    useEffect(() => {
        setDataList(dbData)
    }, [setDataList, dbData]) // Added dbData dependency safely

    // Fixed handling here to use fresh values immediately instead of waiting on next render cycle
    const handlePriceUpdate = async (updatedMin: string | number, updatedMax: string | number) => {
        const currentMin = updatedMin !== '' ? updatedMin : priceRange.min;
        const currentMax = updatedMax !== '' ? updatedMax : priceRange.max;

        if (!currentMin && !currentMax) return;

        await getDataListByPrice(currentMin, currentMax)
    }

    const handleYearUpdate = async (updatedMin: string | number, updatedMax: string | number) => {
        // 1. Fix: Ensure you are referencing your year state fallback, not priceRange
        const currentMin = updatedMin !== '' ? updatedMin : yearRange.min;
        const currentMax = updatedMax !== '' ? updatedMax : yearRange.max;

        // 2. Fix: Remove the restrictive early return so empty inputs can clear the filter
        await getDataListByYear(currentMin, currentMax);
    }


    console.log('yearRange:', yearRange)

    return (
        <section className='w-full'>
            <div className='container__primary grid lg:grid-cols-4 grid-cols-1 gap-6'>
                <aside className='col-span-1 space-y-6'>
                    <CardSelect2
                        name='Price'
                        css='z-200'
                        value1={priceRange.min} // Pass the live Zustand store values here
                        value2={priceRange.max}
                        onChange1={(i) => {
                            setPriceRange('min', i)
                            handlePriceUpdate(i, '')
                        }}
                        onChange2={(i) => {
                            setPriceRange('max', i)
                            handlePriceUpdate('', i)
                        }}
                        data={PriceData}
                    />
                    <CardSelect
                        name='Year'
                        css='z-190'
                        onChange1={(i) => {
                            setYearRange('min', i)
                            handleYearUpdate('i', '')

                        }}
                        onChange2={(i) => {
                            setYearRange('max', i)
                            handleYearUpdate('', i)
                        }}
                        data={getPastNumberedYears(20)}
                    />
                </aside>
                <main className='col-span-3'>
                    <MainSection />
                </main>
            </div>
        </section>
    )
}

function MainSection() {
    const { dataList, sortValue, isLoading, sortDataList } = useCarStore()

    if (isLoading) return <LoaderPrimary />

    return (
        <>
            <div className='w-full flex items-center justify-between bg-gray-100 rounded-lg p-4'>
                <SelectInput2
                    name='orderBy'
                    value={sortValue}
                    data={ShopOrderByData}
                    onChange={(e) => sortDataList(e.target.value)}
                    error={``}
                />
                <p className='text-sm'>Viewing {dataList.length} cars.</p>
            </div>

            <section className='w-full pt-4 space-y-6'>
                {dataList.length > 0 ? dataList.map((i, key) => (
                    <CardTwo
                        key={key}
                        data={i}
                        image={i.images[0]?.image ? baseURL + i.images[0]?.image : NoImageData}
                        href={`/buy-a-car/${i.id}`}
                    />
                )) :
                    <PlaceholderDefault />
                }
            </section>
        </>
    )
}