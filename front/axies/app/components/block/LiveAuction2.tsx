"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
import { product1 } from "@/data/product";
import ProductCard4 from "../card/ProductCard4";
import Link from "next/link";

export default function LiveAuction2(): JSX.Element {
    return (
        <>
            <section className="tf-section live-auctions home3 bg-style">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title text-left pb-15">
                                    Live Auctions
                                </h2>
                                <Link href="/explore-3" className="exp">
                                    EXPLORE MORE
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Swiper
                                slidesPerGroup={2}
                                slidesPerView={"auto"}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                loop={true}
                                navigation={{
                                    prevEl: ".live-auction-next",
                                    nextEl: ".live-auction-right",
                                }}
                                modules={[Pagination, Navigation]}
                                className="swiper-container carousel-overflow pt-24 auctions"
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 30,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                    1300: {
                                        slidesPerView: 4,
                                        spaceBetween: 30,
                                    },
                                }}
                            >
                                {product1.slice(0, 8).map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <ProductCard4 data={item} />
                                    </SwiperSlide>
                                ))}
                                <div className="swiper-pagination mg-t-6" />
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
