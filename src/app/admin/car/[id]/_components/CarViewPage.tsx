"use client"

import React, { useEffect } from 'react'
import SpacerDefault from '@/_components/spacers/SpacerDefault'
import SpacerPrimary from '@/_components/spacers/SpacerPrimary'
import HeadingDefault from '@/app/admin/_components/headings/HeadingDefault'
import ButtonAdmin from '@/app/admin/_components/buttons/ButtonAdmin'
import RecordDefault from '@/app/admin/_components/records/RecordDefault'
import { useCarStore } from '../../../_data/store/useCarStore'
import { valueWithFallback } from '@/_utils/StringManipulation'
import LoaderPrimary from '@/app/admin/_components/loaders/LoaderPrimary'
import { formatDate } from '@/_utils/formatDate'
import { baseURL } from '@/_api/baseURL'
import { NoImageData } from '@/_data/sample/NoImage'


const title = "View Car"

interface Props {
    dbData: any
}

export default function CarViewPage({ dbData }: Props) {
    const { properties, imagesList, setData, setDbProperties, setDbImages, setToggleModal } = useCarStore()

    console.log('CarViewPage dbData: ', dbData) // Debugging line to check dbData

    useEffect(() => {
        // Hydrate the store with backend data and toggle loading state off
        setData(dbData?.data || null)
        if (dbData.data.images) {
            setDbImages(dbData.data.images)
        }
        if (dbData.data.properties) {
            setDbProperties(dbData.data.properties)
        }
    }, [dbData?.data, setData])

    const handleToggleModal = () => {
        setToggleModal(true)
    }

    return (
        <>
            <SpacerDefault />
            <HeadingDefault title={title} />
            <SpacerPrimary />

            {/* Admin Controls */}
            <section className='container__primary flex items-center justify-end mb-3'>
                <ButtonAdmin
                    type='button'
                    name='Edit Car'
                    onClick={handleToggleModal}
                    css='py-2 px-6'
                />
            </section>

            <DataMainArea />

            <SpacerDefault />
        </>
    )
}

function DataMainArea() {
    const { preData, isLoading, properties, imagesList } = useCarStore()

    console.log('imagesList', imagesList)

    if (isLoading) {
        return <LoaderPrimary />
    }

    // Prepare formatting fallbacks based on your Eloquent relationships
    const authorName = preData?.user?.name ? preData?.user?.name : 'Not Added Yet.'
    const formattedPrice = preData?.price ? `$${Number(preData.price).toLocaleString()}` : '0'
    const formattedMileage = preData?.mileage ? `${Number(preData.mileage).toLocaleString()} km` : '0'
    const lastUpdated = preData?.updatedAt ? formatDate(preData.updatedAt) : 'Not updated yet.'

    return (
        <section className='space-y-6'>
            {/* Core Details Grid */}
            <div className='container__primary bg-white drop-shadow-lg rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-black'>
                <div className='space-y-4'>
                    <RecordDefault label='Car Name' value={valueWithFallback(preData?.name)} />
                    <RecordDefault label='Price' value={valueWithFallback(formattedPrice)} />
                    <RecordDefault label='Mileage' value={valueWithFallback(formattedMileage)} />
                    <RecordDefault label='Engine Capacity' value={valueWithFallback(preData?.engineCapacity)} />
                    <RecordDefault label='Condition' value={valueWithFallback(preData?.condition)} />
                </div>
                <div className='space-y-4'>
                    <RecordDefault label='Transmission' value={valueWithFallback(preData?.transmission)} />
                    <RecordDefault label='Fuel Type' value={valueWithFallback(preData?.fuel)} />
                    <RecordDefault label='Model Year' value={valueWithFallback(preData?.year?.toString())} />
                    <RecordDefault label='Author' value={valueWithFallback(authorName)} />
                    <RecordDefault label='Last Updated' value={valueWithFallback(lastUpdated)} />
                </div>
            </div>

            {/* Description Area */}
            {preData?.description && (
                <div className='container__primary bg-white drop-shadow-lg rounded-2xl p-6 text-black'>
                    <h3 className='text-lg font-medium mb-2 text-gray-500'>Description</h3>
                    <p className='text-gray-800 whitespace-pre-wrap font-light leading-relaxed'>
                        {preData.description}
                    </p>
                </div>
            )}

            {/* Custom Specifications / Car Properties */}
            {properties && properties.length > 0 && (
                <div className='container__primary bg-white drop-shadow-lg rounded-2xl p-6 text-black'>
                    <h3 className='text-lg font-medium mb-3 text-gray-500'>Additional Specifications</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2'>
                        {properties.map((prop: any) => (
                            <div key={prop.id || prop.name} className='flex justify-between border-b border-gray-100 py-2'>
                                <span className='text-gray-500 font-light'>{prop.name}</span>
                                <span className='font-semibold text-gray-800'>{prop.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Attached Vehicle Gallery */}
            {imagesList && imagesList.length > 0 && (
                <div className='container__primary bg-white drop-shadow-lg rounded-2xl p-6 text-black'>
                    <h3 className='text-lg font-medium mb-4 text-gray-500'>Vehicle Images</h3>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        {preData.images.map((imgObj: any) => (
                            <div key={imgObj.id} className='relative aspect-4/3 w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center'>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={imgObj.image ? baseURL + imgObj.image : NoImageData}
                                    alt={preData?.name || "Car asset image"}
                                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                                    onError={(e) => {
                                        // Prevents rendering loops if server base URL adjustments are missing
                                        (e.target as HTMLImageElement).src = 'NoImage';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}