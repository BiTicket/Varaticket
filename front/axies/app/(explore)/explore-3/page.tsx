import Explore3 from "@/app/components/block/Explore3";
import Breadcrumb from "@/app/components/breadcrumb";
import LiveAuctionModal from "@/app/components/modal/LiveAuctionModal";
import { Metadata } from "next";

const item = {
    title: "Explore 3",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Explore",
            path: "/explore-3",
        },
        {
            name: "Explore 3",
        },
    ],
};

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Explore 3",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <Explore3 />

            {/* live auction product modal */}
            <LiveAuctionModal />
        </>
    );
}
