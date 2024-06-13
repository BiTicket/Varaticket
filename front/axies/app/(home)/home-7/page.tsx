import Category from "@/app/components/block/Category";
import CreateSellNft2 from "@/app/components/block/CreateSellNft2";
import LiveAuction7 from "@/app/components/block/LiveAuction7";
import PopularCollection6 from "@/app/components/block/PopularCollection6";
import TodaysPicks5 from "@/app/components/block/TodaysPicks5";
import TopSeller7 from "@/app/components/block/TopSeller7";
import Hero7 from "@/app/components/hero/Hero7";
import LiveAuctionModal from "@/app/components/modal/LiveAuctionModal";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Home 7",
};

export default function page(): JSX.Element {
    return (
        <>
            <Hero7 />
            <LiveAuction7 />
            <Category />
            <TopSeller7 />
            <TodaysPicks5 />
            <CreateSellNft2 />
            <PopularCollection6 />

            {/* live auction product modal */}
            <LiveAuctionModal />
        </>
    );
}
