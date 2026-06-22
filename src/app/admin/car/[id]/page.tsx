import BreadCrumbDefault from "../../_components/bread-crumbs/BreadCrumbDefault"
import { _brandAllAction } from "../../_data/actions/BrandActions";
import { _carViewAction } from "../../_data/actions/CarActions";
import CarEditModal from "./_components/CarEditModal";
import CarViewPage from "./_components/CarViewPage";




interface Props {
    params: Promise<{
        id: string
    }>
}


export default async function page({ params }: Props) {
    const { id } = await params;
    const [carData, brandData] = await Promise.all([_carViewAction(id), _brandAllAction()])

    const CrumbsData = [
        { id: 1, name: 'Admin', href: '/admin' },
        { id: 3, name: 'Cars', href: '/admin/car' },
        { id: 4, name: 'View Car', href: `/admin/car/${id}` },
    ]

    return (
        <>
            <BreadCrumbDefault data={CrumbsData} />

            {/* PAGE */}
            <CarViewPage dbData={carData} />

            {/* MODAL */}
            <CarEditModal id={id} brandData={brandData} />

        </>
    )
}
