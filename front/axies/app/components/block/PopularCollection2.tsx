"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard5 from "../card/ProductCard5";
import { product4 } from "@/data/product";
import Link from "next/link";

export default function PopularCollection2(): JSX.Element {
    return (
        <>
            <section className="tf-section top-seller home3">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-md-12 mg-bt-3">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title text-left">
                                    Popular Collection
                                </h2>
                                <Link href="/explore-3" className="exp">
                                    EXPLORE MORE
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                className="mySwiper swiper-container show-shadow carousel3 pad-t-20 button-arow-style"
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
                                {product4.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <ProductCard5 data={item} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
