import Link from "next/link";
import HeroRotateSlider from "../element/HeroRotateSlider";

export default function Hero5(): JSX.Element {
    return (
        <>
            <section className="flat-title-page home5">
                <div className="overlay" />
                <div className="ibthemes-container">
                    <div className="wrap-heading flat-slider d-flex align-items-center">
                        <div className="content">
                            <h4 className="mg-bt-11">
                                <span className="fill">NFT MARKETPLACE</span>
                            </h4>
                            <h1 className="heading">
                                Discover, find and sell extraordinary monster
                                NFTs
                            </h1>
                            <p className="sub-heading mg-t-7 mg-bt-39">
                                Marketplace for monster character cllections non
                                fungible token NFTs
                            </p>
                            <div className="flat-bt-slider style2 flex">
                                <Link
                                    href="/create-item"
                                    className="sc-button header-slider style style-1 rocket fl-button pri-1"
                                >
                                    <span>Create</span>
                                </Link>
                                <Link
                                    href="/explore-1"
                                    className="sc-button header-slider style style-1 note fl-button pri-1"
                                >
                                    <span>Explore</span>
                                </Link>
                            </div>
                        </div>
                        <HeroRotateSlider />
                    </div>
                </div>
            </section>
        </>
    );
}
