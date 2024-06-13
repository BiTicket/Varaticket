import { product1 } from "@/data/product";
import ProductCard11 from "../card/ProductCard11";
import Link from "next/link";
import FilterSection from "../element/FilterSection";

export default function TodaysPicks4(): JSX.Element {
    return (
        <>
            <section className="tf-section live-auctions style3 home4 pad-b-54 no-pt-mb mobie-pb-70">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions mg-bt-21">
                                <h2 className="tf-title pad-l-7">
                                    Today's Picks
                                </h2>
                                <Link href="/explore-3" className="exp style2">
                                    EXPLORE MORE
                                </Link>
                            </div>
                        </div>
                        <FilterSection />
                        {product1.slice(0, 8).map((item) => (
                            <div
                                key={item.id}
                                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                            >
                                <ProductCard11 data={item} />
                            </div>
                        ))}
                        <div className="col-md-12 wrap-inner load-more text-center mg-t2">
                            <Link
                                href="/explore-4"
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
