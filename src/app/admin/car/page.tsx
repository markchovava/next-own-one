import BreadCrumbDefault from "../_components/bread-crumbs/BreadCrumbDefault"
import { _brandAllAction } from "../_data/actions/BrandActions"
import { _carListAction } from "../_data/actions/CarActions"
import CarAddModal from "./_components/CarAddModal"
import CarPage from "./_components/CarPage"



const CrumbsData = [
    { id: 1, name: 'Admin', href: '/admin' },
    { id: 2, name: 'Cars', href: '/admin/car' },
]

export default async function page() {
    const [carData, brandData] = await Promise.all([
        _carListAction(),
        _brandAllAction()
    ]);

    return (
        <>
            <BreadCrumbDefault data={CrumbsData} />

            {/* PAGE */}
            <CarPage dbData={carData} />

            <CarAddModal brandData={brandData} />
        </>
    )
} 
