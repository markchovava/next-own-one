import { ComfortaaBold, ComfortaaMedium } from '@/_assets/fonts/comfortaa/ComfortaaFont'
import { NoImageData } from '@/_data/sample/NoImage'
import React from 'react'
import CardIcon from '../cards/CardIcon'
import RowDual from '../tables/rows/RowDual'
import Heading1 from '../headings/Heading1'
import ImageOne from '../images/ImageOne'
import Link from 'next/link'
import { CarData } from '@/_data/sample/CarData'
import { CarInterface } from '@/_data/entity/CarEntity'



interface Props {
    id: number | string
}

export default function CarViewSection({ id }: Props) {
    const numId = Number(id)
    const i = CarData.find((i) => numId == i.id)
    const data = i


    return (
        <>
            <section className='w-full'>
                <div className='container__primary grid lg:grid-cols-8 grid-cols-1 gap-6'>
                    <div className='lg:col-span-5'>
                        {/* IMAGE */}
                        <div className='w-full mb-4'>
                            <div className='w-full bg-gray-300 drop-shadow rounded-lg overflow-hidden mb-3'>
                                <img src={data?.image ?? NoImageData} className='w-full h-100 object-cover' alt='Image' />
                            </div>
                            <div className='grid lg:grid-cols-7 grid-cols-4 gap-4'>
                                {[...Array(4)].map((i, key) => (
                                    <div key={key} className='bg-gray-300 h-16 drop-shadow overflow-hidden rounded w-full'>
                                        <img src={data?.image ?? NoImageData} className='w-full h-16 object-cover' alt='Image' />
                                    </div>
                                ))}

                            </div>
                        </div>
                        {/* INFO */}
                        <div className='bg-white drop-shadow rounded-lg px-4 pt-6 pb-8'>
                            <div className='w-full flex items-start justify-between gap-6 mb-3'>
                                <p className={`text-xl ${ComfortaaBold.className} `}>
                                    {data?.name}
                                </p>
                                <p className='text-sm'>
                                    Last Updated: 09-06-2026
                                </p>
                            </div>
                            <div className='grid grid-cols-2 gap-3 bg-gray-100 px-4 py-3 mb-6'>
                                <CardIcon name={data?.fuel ?? 'Not Added'} iconType='gas-station' />
                                <CardIcon name={data?.condition ?? 'Not Added'} iconType='gas-station' />
                                <CardIcon name={data?.engineCapacity ?? 'Not Added'} iconType='engine' />
                                <CardIcon name={data?.mileage ?? ''} iconType='dashboard' />
                                <CardIcon name={data?.transmission ?? ''} iconType='gearbox' />
                                <CardIcon name={data?.year ?? ''} iconType='calendar' />

                            </div>
                            <div className='w-full mb-4'>
                                <p className={`${ComfortaaMedium.className} text-xl mb-1`}>
                                    Vehicle Description
                                </p>
                                <p>
                                    {data?.description}
                                </p>
                            </div>

                            <div className='w-full text-sm border-t border-t-gray-200 pt-4'>
                                {data?.properties.map((i, key) => (
                                    <RowDual
                                        key={key}
                                        name={i.name}
                                        value={i.value}
                                    />
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className='lg:col-span-3 space-y-4'>
                        <div className='bg-white drop-shadow rounded-lg px-4 pb-8 pt-6 overflow-hidden'>
                            <Heading1 name={data?.price ?? 'Not Listed'} />
                            <p>{data?.name}</p>
                        </div>
                        <div className='bg-white drop-shadow rounded-lg px-4 pb-8 pt-6 gap-4 flex flex-col items-center justify-start'>
                            <div className='group w-40 h-40 rounded-full bg-gray-200 drop-shadow overflow-hidden '>
                                <ImageOne image={NoImageData} />
                            </div>
                            <p className='text-2xl'>Marcus Jones</p>
                            <Link href='#' className='w-full'>
                                <button className='w-full bg-white hover:drop-shadow-md cursor-pointer transition__effect rounded-lg px-4 py-3 border border-gray-300 hover:border hover:border-gray-500'>
                                    Call Now
                                </button>
                            </Link>
                            <Link href='#' className='w-full'>
                                <button className='w-full text-white hover:drop-shadow-md cursor-pointer transition__effect rounded-lg px-4 py-3 bg-blue-600 hover:bg-blue-700'>
                                    Email Now
                                </button>
                            </Link>
                            <Link href='#' className='w-full'>
                                <button className='w-full text-white hover:drop-shadow-md bg-green-600 hover:bg-green-700 cursor-pointer transition__effect rounded-lg px-4 py-3 '>
                                    WhatsApp Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
