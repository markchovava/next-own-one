import React from 'react'
import IconDefault from '../icons/IconDefault'
import Heading1 from '../headings/Heading1'
import { AppInfoData } from '@/_data/sample/AppinfoData'

export default function AboutSection() {
    return (
        <>
            <section>
                <div className="container__primary grid lg:grid-cols-3 grid-cols-1 gap-8">
                    <div className='space-y-6'>
                        <IconDefault type='info' css='text-6xl text-amber-500' />
                        <Heading1 name='Who we are?' />
                        <p className=''>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Dolorum distinctio id fuga provident expedita eaque error
                            adipisci odio eius sequi.
                        </p>
                    </div>

                    <div className='col-span-2 space-y-6'>
                        {AppInfoData.about.intro}
                    </div>
                </div>

            </section>
        </>
    )
}
