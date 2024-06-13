import Explore1 from "@/app/components/block/Explore1";
import Breadcrumb from "@/app/components/breadcrumb";
import LiveAuctionModal from "@/app/components/modal/LiveAuctionModal";
import { Metadata } from "next";

const item = {
    title: "Explore 1",
    breadcrumb: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Explore",
            path: "/explore-1",
        },
        {
            name: "Explore 1",
        },
    ],
};

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Explore 1",
};

export default function page(): JSX.Element {
    return (
        <>
            <Breadcrumb data={item} />
            <Explore1 />

            {/* live auction product modal */}
            <LiveAuctionModal />
        </>
    );
}
