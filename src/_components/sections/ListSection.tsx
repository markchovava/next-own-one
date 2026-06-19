"use client"

import TitleOne from "../titles/TitleOne"
import CardOne from "../cards/CardOne"
import { CarData } from "@/_data/sample/CarData"
import { NoImageData } from "@/_data/sample/NoImage"


export default function ListSection() {
    return (
        <>
            <section className='w-full py-28 bg-gray-50'>
                <div className='container__primary space-y-6'>
                    <TitleOne
                        name="Recent Imports"
                        btnName="View More"
                        href="/buy-a-car"
                    />

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">

                        {CarData.slice(0, 8).map((i, key) => (
                            <CardOne
                                key={key}
                                data={i}
                                image={i.image ?? NoImageData}
                                href={`/buy-a-car/${i.id}`}
                            />
                        ))}

                    </div>
                </div>
            </section>
        </>

    )
}
