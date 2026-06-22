import BreadCrumbDefault from "../_components/bread-crumbs/BreadCrumbDefault"
import BrandAddModal from "./_components/BrandAddModal"
import BrandPage from "./_components/BrandPage"
import { _brandListAction } from "../_data/actions/BrandActions"



const CrumbsData = [
  { id: 1, name: 'Admin', href: '/admin' },
  { id: 2, name: 'Brands', href: '/admin/brand' },
]


export default async function page() {
  const [brandData] = await Promise.all([_brandListAction()])

  return (
    <>
      <BreadCrumbDefault data={CrumbsData} />

      {/* PAGE */}
      <BrandPage dbData={brandData} />

      {/* MODAL */}
      <BrandAddModal />

    </>
  )
}
