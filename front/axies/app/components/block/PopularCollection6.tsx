"use client";
import { product4 } from "@/data/product";
import ProductCard16 from "../card/ProductCard16";
import Link from "next/link";

export default function PopularCollection6(): JSX.Element {
    return (
        <>
            <section className="tf-section live-auctions style4 home4 live-auctions-style7">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-box-12">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title pb-40 text-left">
                                    Popular Collection
                                </h2>
                                <Link
                                    href="/explore-3"
                                    className="exp style2 mg-t-23"
                                >
                                    EXPLORE MORE
                                </Link>
                            </div>
                        </div>
                        {product4.slice(2, 6).map((item) => (
                            <div
                                key={item.id}
                                className="fl-collection col-box-4"
                            >
                                <ProductCard16 data={item} />
                            </div>
                        ))}

                        <div className="col-md-12 wrap-inner load-more text-center mg-t9">
                            <Link
                                href="/authors-1"
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
