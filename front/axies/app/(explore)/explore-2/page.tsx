import Explore2 from "@/app/components/block/Explore2";
import Breadcrumb from "@/app/components/breadcrumb";
import LiveAuctionModal from "@/app/components/modal/LiveAuctionModal";
import { Metadata } from "next";

const item = {
    title: "Explore 2",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Explore",
            path: "/explore-2",
        },
        {
            name: "Explore 2",
        },
    ],
};

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Explore 2",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <Explore2 />

            {/* live auction product modal */}
            <LiveAuctionModal />
        </>
    );
}
