"use client"

import TitleOne from '../titles/TitleOne'
import { BrandData } from '@/_data/sample/BrandData'
import CardBrand from '../cards/CardBrand'



export default function BrandSection() {
    return (
        <>
            <section className='w-full py-24 bg-gray-100'>
                <div className='container__primary'>
                    <TitleOne
                        name="Our Brands"
                        btnName="View More"
                        href="/buy-a-car"
                    />
                    <div className='w-full grid lg:grid-cols-10 grid-cols-4 gap-6 mt-6'>
                        {BrandData.map((i, key) => (
                            <CardBrand
                                image={i.image}
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
