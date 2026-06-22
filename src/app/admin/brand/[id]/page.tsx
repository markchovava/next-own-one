import BreadCrumbDefault from "../../_components/bread-crumbs/BreadCrumbDefault"
import { _brandViewAction } from "../../_data/actions/BrandActions";
import BrandEditModal from "./_components/BrandEditPage";

import BrandViewPage from "./_components/BrandViewPage"



interface Props {
  params: Promise<{
    id: string
  }>
}


export default async function page({ params }: Props) {
  const { id } = await params;
  const [brandData] = await Promise.all([_brandViewAction(id)])

  const CrumbsData = [
    { id: 1, name: 'Admin', href: '/admin' },
    { id: 3, name: 'Brands', href: '/admin/brand' },
    { id: 4, name: 'View Brand', href: `/admin/brand/${id}` },
  ]

  return (
    <>
      <BreadCrumbDefault data={CrumbsData} />

      {/* PAGE */}
      <BrandViewPage dbData={brandData} />

      {/* MODAL */}
      <BrandEditModal id={id} />

    </>
  )
}
