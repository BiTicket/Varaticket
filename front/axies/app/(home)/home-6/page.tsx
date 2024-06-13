import LiveAuction6 from "@/app/components/block/LiveAuction6";
import NftInfo from "@/app/components/block/NftInfo";
import PopularCollection5 from "@/app/components/block/PopularCollection5";
import TodaysPicks from "@/app/components/block/TodaysPicks";
import TopSeller6 from "@/app/components/block/TopSeller6";
import Hero6 from "@/app/components/hero/Hero6";
import LiveAuctionModal from "@/app/components/modal/LiveAuctionModal";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Home 6",
};

export default function page(): JSX.Element {
    return (
        <>
            <Hero6 />
            <LiveAuction6 style="style3 home5 mobie-pb-70 bg-style3" />
            <TopSeller6 />
            <TodaysPicks style="home5 bg-style3 style3" />
            <PopularCollection5 />
            <NftInfo style="home-6" />

            {/* live auction product modal */}
            <LiveAuctionModal />
        </>
    );
}
