"use client"
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
                            {AppInfoData.about.intro}
                        </p>
                    </div>

                    <div className='col-span-2 space-y-6'>
                        {AppInfoData.about.main}
                    </div>
                </div>

            </section>
        </>
    )
}
