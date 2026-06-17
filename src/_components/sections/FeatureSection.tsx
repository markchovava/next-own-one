"use client"

import { NoImageData, } from "@/_data/sample/NoImage"
import Card from "../cards/Card"
import { useCarStore } from "@/_store/useCarStore"
import { useEffect } from "react"
import { CarData } from "@/_data/sample/CarData"
import TitleOne from "../titles/TitleOne"




export default function FeatureSection() {
    const { dataList, setDataList } = useCarStore()

    useEffect(() => {
        setDataList(CarData)
    }, [dataList])

    return (
        <>
            <section className='w-full py-28'>
                <div className='container__primary space-y-6'>
                    <TitleOne
                        name="Featured Listings"
                        btnName="View More"
                        href="#"
                    />

                    <div className='w-full grid grid-cols-1 lg:grid-cols-5 gap-4'>
                        {/* Feature/Large item (Spans 2 rows and 2 columns) */}
                        <div className='lg:col-span-2 col-span-1'>
                            {dataList.length > 0 && (
                                <Card
                                    image={NoImageData}
                                    name={dataList[0].name}
                                    year={dataList[0].year}
                                    fuel={dataList[0].fuel}
                                    transmission={dataList[0].transmission}
                                    price={dataList[0].price}
                                    imageCss='h-130'
                                />
                            )}
                        </div>

                        {dataList.length > 1 &&
                            <div className="lg:col-span-3 col-span-1 grid grid-cols-2 gap-4">
                                {
                                    dataList.slice(1, 5).map((i, key) => (
                                        <Card
                                            key={key}
                                            image={NoImageData}
                                            name={i.name}
                                            year={i.year}
                                            fuel={i.fuel}
                                            transmission={i.transmission}
                                            price={i.price}
                                            imageCss='h-50'
                                        />
                                    ))
                                }
                            </div>
                        }

                    </div>

                </div>
            </section >
        </>
    )
}
