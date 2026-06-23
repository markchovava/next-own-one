"use client"

import { useContactStore } from "@/_store/useContactStore"
import Heading2 from "../headings/Heading2"
import TextInput from "../forms/inputs/TextInput"
import TextArea from "../forms/textareas/TextArea"
import Button from "../buttons/Button"
import ContactForm from "../forms/ContactForm"
import IconDefault from "../icons/IconDefault"
import { AppInfoData } from "@/_data/sample/AppinfoData"
import CardIcon from "../cards/CardIcon"
import { useAppInfoStore } from "@/_store/useAppInfoStore"
import { useEffect } from "react"




interface Props {
    dbData: any
}


export default function ContactSection({ dbData }: Props) {
    const { data, setData } = useAppInfoStore()

    console.log('dbData', dbData)

    useEffect(() => {
        setData(dbData.data)
    }, [setData, dbData.data])



    return (
        <>
            <section className='w-full'>
                <div className='container__primary grid lg:grid-cols-2 grid-cols-1 gap-8'>
                    <ContactForm />
                    <div>
                        <Heading2 name="Our Contact Details" />
                        <div className="border-t border-gray-200 my-4 py-4 space-y-4">
                            <p className="">
                                We value our customers and encourage you to visit us during normal
                                business hours to explore our expert consulting solutions. Our team is
                                dedicated to enhancing your operational efficiency.
                            </p>
                            {data?.phone &&
                                <CardIcon
                                    name={data.phone}
                                    iconType='phone' />
                            }
                            {data?.email &&
                                <CardIcon
                                    name={data.email}
                                    iconType='email' />
                            }
                            {data?.address &&
                                <CardIcon
                                    name={AppInfoData.address}
                                    iconType='address' />
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
