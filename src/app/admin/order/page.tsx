import BreadCrumbDefault from "../_components/bread-crumbs/BreadCrumbDefault"
import { _orderListAction } from "../_data/actions/OrderActions"
import OrderAddModal from "./_components/OrderAddModal"
import OrderPage from "./_components/OrderPage"

const CrumbsData = [
    { id: 1, name: 'Admin', href: '/admin' },
    { id: 3, name: 'Orders', href: '/admin/order' },
]

export default async function page() {
    const [orderData] = await Promise.all([_orderListAction()])
    return (
        <>
            <BreadCrumbDefault data={CrumbsData} />

            {/* PAGE */}
            <OrderPage dbData={orderData} />

            {/* MODAL */}
            <OrderAddModal />
        </>
    )
}