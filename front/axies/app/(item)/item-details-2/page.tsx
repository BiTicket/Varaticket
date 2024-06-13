import ItemDetails2 from "@/app/components/block/ItemDetails2";
import LiveAuction from "@/app/components/block/LiveAuction";
import Breadcrumb from "@/app/components/breadcrumb";
import LiveAuctionModal from "@/app/components/modal/LiveAuctionModal";
import { Metadata } from "next";

const item = {
    title: "Item Details 2",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Explore",
            path: "/item-details-2",
        },
        {
            name: "Item Details 2",
        },
    ],
};

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Item Details 2",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <ItemDetails2 />
            <LiveAuction />

            {/* live auction product modal */}
            <LiveAuctionModal />
        </>
    );
}
