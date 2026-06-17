"use client"
import BreadCrumb from '@/_components/breadcrumbs/BreadCrumb'
import Heading1 from '@/_components/headings/Heading1'
import AboutSection from '@/_components/sections/AboutSection'
import Spacer from '@/_components/spacers/Spacer'



const CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'About Us', href: '/about' },
]

export default function page() {
    return (
        <>
            <BreadCrumb data={CrumbsData} />

            <Spacer />
            <div className="container__primary mb-12 pb-4 border-b border-gray-300">
                <Heading1 name="About Us" />
            </div>
            <AboutSection />
            <Spacer />
        </>
    )
}
