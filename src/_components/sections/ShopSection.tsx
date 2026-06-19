"use client"

import { useShopStore } from '@/_store/useShopStore'
import CardSelect from '../cards/CardSelect'
import { ShopOrderByData } from '@/_data/sample/ShopData'
import SelectInput2 from '../forms/selects/SelectInput2'
import { ComfortaaBold } from '@/_assets/fonts/comfortaa/ComfortaaFont'
import IconDefault from '../icons/IconDefault'
import Link from 'next/link'
import Button from '../buttons/Button'
import LabelOne from '../labels/LabelOne'
import CardTwo from '../cards/CardTwo'
import { useEffect } from 'react'
import { CarData } from '@/_data/sample/CarData'
import { NoImageData } from '@/_data/sample/NoImage'



export default function ShopSection() {
    return (
        <>
            <section className='w-full'>
                <div className='container__primary grid lg:grid-cols-4 grid-cols-1 gap-6'>
                    <aside className='col-span-1 space-y-6'>
                        <CardSelect name='Price' css='z-200' />
                        <CardSelect name='Year' css='z-190' />
                        <CardSelect name='Mileage' css='z-180' />
                        <CardSelect name='Fuel' css='z-170' />
                        <CardSelect name='Transmission' css='z-160' />
                        <CardSelect name='Engine' css='z-150' />
                        <CardSelect name='Drive Type' css='z-140' />
                    </aside>
                    <main className='col-span-3'>

                        <MainSection />
                    </main>
                </div>
            </section>
        </>
    )
}




function MainSection() {
    const { data, errors, carsList, setInputValue, setData, setCarsList } = useShopStore()

    useEffect(() => {
        setCarsList(CarData)
    }, [carsList])

    return (
        <>

            <div className='w-full flex items-center justify-between bg-gray-100 rounded-lg p-4'>
                <SelectInput2
                    name='orderBy'
                    value={data.orderBy}
                    data={ShopOrderByData}
                    onChange={setInputValue}
                    error={errors.orderBy}
                />
                <p className='text-sm'>Viewing 1 - 10 of 1889</p>
            </div>

            <section className='w-full pt-4 space-y-6'>
                {carsList.slice(0, 12).map((i, key) => (
                    <CardTwo
                        key={key}
                        data={i}
                        image={i.image ?? NoImageData}
                        href={`/buy-a-car/${i.id}`}
                    />
                ))}

            </section>

        </>
    )
}
