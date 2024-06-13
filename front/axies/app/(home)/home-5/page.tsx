import BrowByCategory from "@/app/components/block/BrowByCategory";
import LiveAuction6 from "@/app/components/block/LiveAuction6";
import NftInfo from "@/app/components/block/NftInfo";
import PopularCollection4 from "@/app/components/block/PopularCollection4";
import TodaysPicks from "@/app/components/block/TodaysPicks";
import TopSeller5 from "@/app/components/block/TopSeller5";
import Hero5 from "@/app/components/hero/Hero5";
import LiveAuctionModal from "@/app/components/modal/LiveAuctionModal";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Home 5",
};

export default function page() {
    return (
        <>
            <Hero5 />
            <BrowByCategory />
            <LiveAuction6 style="home5 style2" />
            <TopSeller5 />
            <TodaysPicks style="style3 home5" />
            <PopularCollection4 />
            <NftInfo style="home-2" />

            {/* live auction product modal */}
            <LiveAuctionModal />
        </>
    );
}
