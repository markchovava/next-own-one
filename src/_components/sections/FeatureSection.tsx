"use client"

import { useCarStore } from "@/_store/useCarStore"
import TitleOne from "../titles/TitleOne"




export default function FeatureSection() {
    const { dataList, setDataList } = useCarStore()

    /*  useEffect(() => {
         setDataList(CarData)
     }, [dataList])
  */
    return (
        <>
            <section className='w-full py-28'>
                <div className='container__primary space-y-6'>
                    <TitleOne
                        name="Featured Listings"
                        btnName="View More"
                        href="/buy-a-car"
                    />

                    {/* <div className='w-full grid grid-cols-1 lg:grid-cols-5 gap-4'>
                        <div className='lg:col-span-2 col-span-1'>
                            {dataList.length > 0 && (
                                <Card
                                    image={dataList[0].image ?? NoImageData}
                                    data={dataList[0]}
                                    href={`/buy-a-car/${dataList[0].id}`}
                                    imageCss='h-134'
                                />
                            )}
                        </div>

                        {dataList.length > 1 &&
                            <div className="lg:col-span-3 col-span-1 grid grid-cols-2 gap-4">
                                {
                                    dataList.slice(1, 5).map((i, key) => (
                                        <Card
                                            key={key}
                                            image={i.image ?? NoImageData}
                                            data={dataList[key]}
                                            href={`/buy-a-car/${dataList[key].id}`}
                                            imageCss='h-52'
                                        />
                                    ))
                                }
                            </div>
                        }

                    </div>
 */}
                </div>
            </section >
        </>
    )
}
