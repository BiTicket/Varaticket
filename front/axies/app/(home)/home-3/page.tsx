import LiveAuction3 from "@/app/components/block/LiveAuction3";
import NftInfo from "@/app/components/block/NftInfo";
import PopularCollection3 from "@/app/components/block/PopularCollection3";
import TodaysPicks3 from "@/app/components/block/TodaysPicks3";
import TopSeller3 from "@/app/components/block/TopSeller3";
import Hero3 from "@/app/components/hero/Hero3";
import LiveAuctionModal from "@/app/components/modal/LiveAuctionModal";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Home 3",
};

export default function page(): JSX.Element {
    return (
        <>
            <Hero3 />
            <NftInfo style="home-3" />
            <LiveAuction3 />
            <TopSeller3 />
            <TodaysPicks3 />
            <PopularCollection3 />

            {/* live auction product modal */}
            <LiveAuctionModal />
        </>
    );
}
