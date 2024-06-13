"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
import { product2 } from "@/data/product";
import ProductCard12 from "../card/ProductCard12";
import Link from "next/link";

export default function PopularCollection4(): JSX.Element {
    return (
        <>
            <section className="tf-section live-auctions style4 home5 mobie-style bg-style2">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title pb-23 text-left">
                                    Popular Collection
                                </h2>
                                <Link href="/explore-3" className="exp style2">
                                    EXPLORE MORE
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="ui-silder">
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={{
                                        prevEl: ".live-auction-next",
                                        nextEl: ".live-auction-right",
                                    }}
                                   
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper swiper-container show-shadow carousel pad-t-17 auctions"
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1,
                                        },
                                        768: {
                                            slidesPerView: 2,
                                        },
                                        992: {
                                            slidesPerView: 3,
                                        },
                                        1200: {
                                            slidesPerView: 4,
                                        },
                                    }}
                                >
                                    {product2.slice(0, 7).map((item) => (
                                        <SwiperSlide key={item.id}>
                                            <ProductCard12 data={item} />
                                        </SwiperSlide>
                                    ))}
                                    <div className="swiper-button-next live-auction-next btn-slide-next active" />
                                    <div className="swiper-button-prev live-auction-right btn-slide-prev" />
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
