import { Metadata } from "next";
import CreateSellNft from "../components/block/CreateSellNft";
import LiveAuction from "../components/block/LiveAuction";
import PopularCollection from "../components/block/PopularCollection";
import TopSeller from "../components/block/TopSeller";
import Hero1 from "../components/hero/Hero1";
import LiveAuctionModal from "../components/modal/LiveAuctionModal";
import TodaysPicks from "../components/block/TodaysPicks";

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Home 1",
};

export default function page(): JSX.Element {
    return (
        <>
            <Hero1 />
            <LiveAuction />
            <TopSeller />
            <TodaysPicks style="pad-b-54 no-pt-mb" />
            <PopularCollection />
            <CreateSellNft />

            {/* live auction product modal */}
            <LiveAuctionModal />
        </>
    );
}
