"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
import { product1 } from "@/data/product";
import ProductCard1 from "../card/ProductCard1";
import Link from "next/link";

export default function LiveAuction6({
    style,
}: {
    style?: string;
}): JSX.Element {
    return (
        <>
            <section className={`tf-section live-auctions ${style}`}>
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title pb-23">
                                    Live Auctions
                                </h2>
                                <Link href="/explore-3" className="exp style2">
                                    EXPLORE MORE
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Swiper
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={{
                                    prevEl: ".live-auction-next",
                                    nextEl: ".live-auction-right",
                                }}
                              
                                modules={[Pagination, Navigation]}
                                className="swiper-container show-shadow carousel6 pad-t-17 auctions"
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 30,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                }}
                            >
                                {product1.slice(0, 6).map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <ProductCard1 data={item} />
                                    </SwiperSlide>
                                ))}
                                <div className="swiper-pagination mg-t-13" />
                                <div className="swiper-button-next live-auction-next btn-slide-next active" />
                                <div className="swiper-button-prev live-auction-right btn-slide-prev" />
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
