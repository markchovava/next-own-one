import BreadCrumb from '@/_components/breadcrumbs/BreadCrumb'
import Heading1 from '@/_components/headings/Heading1'
import ShopSection from '@/_components/sections/ShopSection'
import Spacer from '@/_components/spacers/Spacer'
import SpacerOne from '@/_components/spacers/SpacerOne'



const CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Buy A Car', href: '/buy-a-car' },
]


export default function page() {
    return (
        <>
            <main className='bg-gray-50'>
                <BreadCrumb data={CrumbsData} />

                <div className="container__primary mb-8 pb-4 border-b border-gray-300">
                    <Spacer />
                    <Heading1 name="Buy A Car" />
                </div>

                <ShopSection />

                <Spacer />
            </main>
        </>
    )
}
