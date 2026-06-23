"use client"

import TitleOne from "../titles/TitleOne"
import CardOne from "../cards/CardOne"
import { NoImageData } from "@/_data/sample/NoImage"
import { useCarStore } from "@/_store/useCarStore"
import { useEffect } from "react"
import { baseURL } from "@/_api/baseURL"



interface Props {
    dbData: any
}

export default function ListSection({ dbData }: Props) {
    const { dataList, setDataList } = useCarStore()

    useEffect(() => {
        if (dbData.data) {
            setDataList(dbData)
        }
    }, [setDataList])

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

                        {dataList.map((i, key) => (
                            <CardOne
                                key={key}
                                data={i}
                                image={i.images[0]?.image ? baseURL + i.images[0]?.image : NoImageData}
                                href={`/buy-a-car/${i.id}`}
                            />
                        ))}

                    </div>
                </div>
            </section>
        </>

    )
}
