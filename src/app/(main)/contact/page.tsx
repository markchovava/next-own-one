"use client"

import BreadCrumb from "@/_components/breadcrumbs/BreadCrumb"
import Heading1 from "@/_components/headings/Heading1"
import ContactSection from "@/_components/sections/ContactSection"
import Spacer from "@/_components/spacers/Spacer"


const CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Contact Us', href: '/contact' },
]

export default function page() {
    return (
        <>
            <BreadCrumb data={CrumbsData} />

            <div className="container__primary mb-12 pb-4 border-b border-gray-300">
                <Spacer />
                <Heading1 name="Contact Us" />
            </div>

            <ContactSection />
            <Spacer />

        </>
    )
}
