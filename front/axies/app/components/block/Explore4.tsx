import { product1 } from "@/data/product";
import Explore4Slidebar from "../sidebar/Explore4Slidebar";
import ProductCard6 from "../card/ProductCard6";
import Link from "next/link";

export default function Explore4() {
    return (
        <>
            <section className="tf-explore tf-section">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-12">
                            <Explore4Slidebar />
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-12">
                            <div className="box-epxlore">
                                {product1.slice(0, 6).map((item) => (
                                    <ProductCard6 key={item.id} data={item} />
                                ))}
                            </div>
                            <div className="btn-auction center">
                                <Link
                                    href="/live-auctions"
                                    className="sc-button loadmore fl-button pri-3"
                                >
                                    <span>Load More</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
