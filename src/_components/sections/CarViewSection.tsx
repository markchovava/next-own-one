"use client"
import { ComfortaaBold, ComfortaaMedium } from '@/_assets/fonts/comfortaa/ComfortaaFont'
import { NoImageData } from '@/_data/sample/NoImage'
import { useEffect } from 'react'
import CardIcon from '../cards/CardIcon'
import RowDual from '../tables/rows/RowDual'
import Heading1 from '../headings/Heading1'
import ImageOne from '../images/ImageOne'
import Link from 'next/link'
import { CarInterface } from '@/_data/entity/CarEntity'
import { useCarStore } from '@/_store/useCarStore'
import { baseURL } from '@/_api/baseURL'
import { motion } from 'motion/react'
import { formatDate } from '@/_utils/formatDate'
import { useAppInfoStore } from '@/_store/useAppInfoStore'
import { useOrderStore } from '@/app/admin/_data/store/useOrderStore'




interface Props {
    id: number | string
    dbData: any
    appData: any
}

export default function CarViewSection({ appData, dbData, id }: Props) {
    const { setToggleModal, toggleModal } = useOrderStore()
    const {
        data: appDataDb,
        setData: setAppDataDb
    } = useAppInfoStore()
    const { setData, data, setCurrentImage, currentImage, images, properties } = useCarStore()
    const numId = Number(id)

    console.log('carData', dbData)

    useEffect(() => {
        if (appData.data) {
            setAppDataDb(appData.data)
        }

        setData(dbData.data)
        if (dbData.data.images[0] && dbData.data.images[0].image) {
            setCurrentImage(dbData.data.images[0].image)
        }
    }, [setCurrentImage, dbData.data, appData.data, setAppDataDb])

    const handleImageClick = (i: string) => {
        setCurrentImage(i)
    }

    console.log('currentImage', currentImage)

    return (
        <>
            <section className='w-full'>
                <div className='container__primary grid lg:grid-cols-8 grid-cols-1 gap-6'>
                    <div className='lg:col-span-5'>
                        {/* IMAGE */}
                        <div className='w-full mb-4'>
                            <div className='group w-full bg-gray-300 drop-shadow rounded-lg overflow-hidden mb-3'>
                                <img
                                    src={currentImage ? currentImage : NoImageData}
                                    className='w-full h-100 object-cover transition__effect hover:scale-110' alt='Image' />
                            </div>
                            <div className='group grid lg:grid-cols-7 grid-cols-4 gap-4'>
                                {images.map((i, key) => (
                                    <div
                                        key={key}
                                        onClick={() => handleImageClick(i.image)}
                                        className='bg-gray-300 h-16 drop-shadow overflow-hidden rounded w-full'>
                                        <motion.img
                                            alt='Image'
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            src={i.image ? baseURL + i.image : NoImageData}
                                            className='w-full h-16 object-cover transition__effect hover:scale-110' />
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
                                    Last Updated: {formatDate(data.updatedAt)}
                                </p>
                            </div>
                            <div className='grid grid-cols-2 gap-3 bg-gray-100 px-4 py-3 mb-6'>
                                <CardIcon name={data?.fuel ?? 'Not Added'} iconType='gas-station' />
                                <CardIcon name={data?.condition ?? 'Not Added'} iconType='gas-station' />
                                <CardIcon name={data?.engineCapacity ?? 'Not Added'} iconType='engine' />
                                <CardIcon name={data?.mileage ? data?.mileage + 'km' : ''} iconType='dashboard' />
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
                            <Heading1 name={data?.price ? `$${data?.price.toString()}` : 'Not Listed'} />
                            <p>{data?.name}</p>
                        </div>
                        <div className='bg-white drop-shadow rounded-lg px-4 pb-8 pt-6 gap-4 flex flex-col items-center justify-start'>
                            <div className='group w-40 h-40 rounded-full bg-gray-200 drop-shadow overflow-hidden '>
                                <ImageOne image={NoImageData} />
                            </div>
                            <p className='text-2xl'>{appDataDb?.name}</p>
                            {appDataDb?.phone &&
                                <Link target='_blank' href={`tel:${appDataDb?.phone}`} className='w-full'>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className='w-full bg-white hover:drop-shadow-md cursor-pointer transition__effect rounded-lg px-4 py-3 border border-gray-300 hover:border hover:border-gray-500'>
                                        Call Now
                                    </motion.button>
                                </Link>
                            }
                            {appDataDb?.email &&
                                <Link target='_blank' href={appDataDb?.email ? `mailto:${appDataDb?.email}` : '#'}
                                    className='w-full'>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className='w-full text-white hover:drop-shadow-md cursor-pointer transition__effect rounded-lg px-4 py-3 bg-blue-600 hover:bg-blue-700'>
                                        Email Now
                                    </motion.button>
                                </Link>
                            }
                            {appDataDb?.whatsapp &&
                                <Link href={appDataDb?.whatsapp ?? '#'} className='w-full' target='_blank'>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className='w-full text-white hover:drop-shadow-md bg-green-600 hover:bg-green-700 cursor-pointer transition__effect rounded-lg px-4 py-3 '>
                                        WhatsApp Now
                                    </motion.button>
                                </Link>
                            }

                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setToggleModal(true)}
                                className='w-full text-white hover:drop-shadow-md bg-amber-600 hover:bg-amber-700 cursor-pointer transition__effect rounded-lg px-4 py-3 '>
                                Write to us
                            </motion.button>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
