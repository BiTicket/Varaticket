import { product1 } from "@/data/product";
import ProductCard6 from "../card/ProductCard6";
import Link from "next/link";
import FilterSection from "../element/FilterSection";

export default function TodaysPicks2(): JSX.Element {
    return (
        <>
            <section className="tf-section today-picks">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-md-12 mb-24">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title text-left">
                                    Today's Picks
                                </h2>
                                <Link href="/explore-3" className="exp">
                                    EXPLORE MORE
                                </Link>
                            </div>
                        </div>
                        <FilterSection />
                        {product1.slice(7, 15).map((item) => (
                            <div
                                key={item.id}
                                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                            >
                                <ProductCard6 data={item} />
                            </div>
                        ))}

                        <div className="col-md-12 wrap-inner load-more text-center">
                            <Link
                                href="/explore-2"
                                id="loadmore"
                                className="sc-button loadmore fl-button pri-3"
                            >
                                <span>Load More</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
