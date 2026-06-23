"use client"

import TitleOne from '../titles/TitleOne'
import { BrandData } from '@/_data/sample/BrandData'
import CardBrand from '../cards/CardBrand'
import { useBrandStore } from '@/_store/useBrandStore'
import { useEffect } from 'react'
import { baseURL } from '@/_api/baseURL'


interface Props {
    dbData: any
}

export default function BrandSection({ dbData }: Props) {
    const { dataList, setDataList } = useBrandStore()
    useEffect(() => {
        setDataList(dbData)
    }, [setDataList])
    return (
        <>
            <section className='w-full py-24 bg-gray-100'>
                <div className='container__primary'>
                    <TitleOne
                        name="Our Brands"
                        btnName="View More"
                        href="/car-brand"
                    />
                    <div className='w-full grid lg:grid-cols-10 grid-cols-4 gap-6 mt-6'>
                        {dataList.map((i, key) => (
                            <CardBrand
                                image={baseURL + i.image}
                                key={key}
                                data={i}
                                href={`/car-brand/${i.id}`} />
                        ))}
                        <div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
