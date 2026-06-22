import BreadCrumbDefault from "../../_components/bread-crumbs/BreadCrumbDefault"
import { _orderViewAction } from "../../_data/actions/OrderActions";
import OrderEditModal from "./_components/OrderEditModal";
import OrderViewPage from "./_components/OrderViewPage";



interface PropInterface {
    params: Promise<{
        id: string
    }>
}

export default async function page({ params }: PropInterface) {
    const { id } = await params;
    const [orderData] = await Promise.all([_orderViewAction(id)]);

    const CrumbsData = [
        { id: 1, name: 'Admin', href: '/admin' },
        { id: 3, name: 'Orders', href: '/admin/order' },
        { id: 4, name: 'View Order', href: `/admin/order/${id}` },
    ];

    return (
        <>
            <BreadCrumbDefault data={CrumbsData} />

            {/* VIEW DETAILS SECTION */}
            <OrderViewPage dbData={orderData} id={id} />

            {/* EDIT MODAL DIALOG */}
            <OrderEditModal id={id} />
        </>
    )
}