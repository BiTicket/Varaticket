import { product1 } from "@/data/product";
import ProductCard15 from "../card/ProductCard15";
import Link from "next/link";
import FilterSection from "../element/FilterSection";

export default function TodaysPicks5(): JSX.Element {
    return (
        <>
            <section className="tf-section live-auctions top-picks style3 home7 mobie-pb-70">
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
                        <div className="col-md-12">
                            <div className="top-pick-box">
                                {product1.slice(0, 12).map((item) => (
                                    <ProductCard15 key={item.id} data={item} />
                                ))}
                            </div>
                        </div>

                        <div className="col-md-12 wrap-inner load-more text-center mg-t2">
                            <Link
                                href="/explore-1"
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
