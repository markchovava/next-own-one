import BreadCrumb from '@/_components/breadcrumbs/BreadCrumb'
import Heading1 from '@/_components/headings/Heading1'
import AboutSection from '@/_components/sections/AboutSection'
import ContactSection from '@/_components/sections/ContactSection'
import Spacer from '@/_components/spacers/Spacer'
import { appInfoViewAction } from '@/app/admin/_data/actions/AppInfoActions'



const CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'About Us', href: '/about' },
]

export default async function page() {
    const [appData] = await Promise.all([
        appInfoViewAction()
    ])

    return (
        <>
            <main>
                <BreadCrumb data={CrumbsData} />

                <Spacer />
                <div className="container__primary mb-12 pb-4 border-b border-gray-300">
                    <Heading1 name="About Us" />
                </div>
                <AboutSection />
                <Spacer />
            </main>

            <main className='bg-gray-50'>
                <Spacer />
                <ContactSection dbData={appData} />
                <Spacer />
            </main>
        </>
    )
}
