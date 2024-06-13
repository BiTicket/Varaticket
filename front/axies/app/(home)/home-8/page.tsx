import HomeRightSide from "@/app/components/block/HomeRightSide";
import LiveAuctionModal from "@/app/components/modal/LiveAuctionModal";
import Home8Sidebar from "@/app/components/sidebar/Home8Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Axies | NFT Marketplace React/Next Js Template | Home 8",
};

export default function page(): JSX.Element {
    return (
        <>
            <section className="tf-item tf-section">
                <div className="ibthemes-container px-0">
                    <div className="ui-home-8">
                        <Home8Sidebar />
                        <HomeRightSide />
                    </div>
                </div>
            </section>

            {/* live auction product modal */}
            <LiveAuctionModal />
        </>
    );
}
