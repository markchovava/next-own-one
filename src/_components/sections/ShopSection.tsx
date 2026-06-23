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
import IconDefault from '../icons/IconDefault'
import { motion } from "motion/react"



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
    }, [setDataList, dbData])

    const handlePriceUpdate = async (updatedMin: string | number, updatedMax: string | number) => {
        const currentMin = updatedMin !== '' ? updatedMin : priceRange.min;
        const currentMax = updatedMax !== '' ? updatedMax : priceRange.max;
        if (!currentMin && !currentMax) return;
        await getDataListByPrice(currentMin, currentMax)
    }

    const handleYearUpdate = async (updatedMin: string | number, updatedMax: string | number) => {
        const currentMin = updatedMin !== '' ? updatedMin : yearRange.min;
        const currentMax = updatedMax !== '' ? updatedMax : yearRange.max;
        await getDataListByYear(currentMin, currentMax);
    }


    return (
        <section className='w-full'>
            <div className='container__primary grid lg:grid-cols-4 grid-cols-1 gap-6'>
                <aside className='w-full lg:col-span-1 space-y-6'>
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
            <SearchSection />
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



function SearchSection() {
    const {
        search,
        setSearch,
        isSearching,
        setIsSearching,
        getDataListSearch,
    } = useCarStore();

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search) return;
        try {
            setIsSearching(true);
            await getDataListSearch(search);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setIsSearching(false); // 3. Turn off loading state when done
        }
    };

    return (
        <form onSubmit={handleSearch} className='bg-white drop-shadow mb-4 p-4 rounded-lg'>
            <div className='w-full flex items-center justify-start border border-gray-300 rounded-lg'>
                <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='py-2 px-4 h-12 outline-none w-[90%] border-r border-gray-300'
                    placeholder="Search cars..." // Added for better UX
                />
                <motion.button
                    type='submit'
                    whileTap={{ scale: 0.95 }}
                    disabled={isSearching}
                    className='cursor-pointer flex-1 flex items-center justify-center disabled:opacity-50'>
                    {isSearching ? (
                        <span>Loading...</span>
                    ) : (
                        <IconDefault type='search' css='text-xl' />
                    )}
                </motion.button>
            </div>
        </form>
    );
}