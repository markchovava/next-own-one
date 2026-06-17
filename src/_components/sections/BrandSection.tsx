"use client"

import TitleOne from '../titles/TitleOne'
import { BrandData } from '@/_data/sample/BrandData'
import CardBrand from '../cards/CardBrand'



export default function BrandSection() {
    return (
        <>
            <section className='w-full py-28 bg-gray-100'>
                <div className='container__primary'>
                    <TitleOne
                        name="Our Brands"
                        btnName="View More"
                        href="#"
                    />
                    <div className='grid grid-cols-10 gap-6 mt-6'>
                        {BrandData.map((i, key) => (
                            <CardBrand
                                key={key}
                                data={i}
                                href='#' />
                        ))}
                        <div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
