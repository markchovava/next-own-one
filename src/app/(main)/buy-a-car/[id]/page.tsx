import BreadCrumb from "@/_components/breadcrumbs/BreadCrumb";
import Heading1 from "@/_components/headings/Heading1";
import CarViewSection from "@/_components/sections/CarViewSection";
import Spacer from "@/_components/spacers/Spacer";
import { carListAction, carViewAction } from "@/app/admin/_data/actions/CarActions";



let CrumbsData = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Buy A Car', href: '/buy-a-car' },
]


interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function page({ params }: Props) {
    const { id } = await params;
    const [carData] = await Promise.all([carViewAction(id)])

    const CrumbsData = [
        { id: 1, name: 'Home', href: '/' },
        { id: 2, name: 'Buy A Car', href: '/buy-a-car' },
        { id: 3, name: 'View Car', href: `/buy-a-car${id}` }
    ]



    return (
        <>
            <main className="bg-gray-100">
                <BreadCrumb data={CrumbsData} />
                <div className="container__primary mb-8 pb-4 border-b border-gray-300">
                    <Spacer />
                    <Heading1 name="View Car" />
                </div>

                <CarViewSection dbData={carData} id={id} />
                <Spacer />
            </main>
        </>
    )
}
