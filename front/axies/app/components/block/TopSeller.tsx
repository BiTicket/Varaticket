"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import AuthorCard1 from "../card/AuthorCard1";
import { author } from "@/data/author";

export default function TopSeller(): JSX.Element {
    return (
        <>
            <section className="tf-section live-auctions style2 no-pt-mb tl-pb-0">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title">Top Seller</h2>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="swiper-container seller style2 seller-slider2 button-arow-style">
                                <Swiper
                                    slidesPerView={9}
                                    spaceBetween={30}
                                    navigation={{
                                        prevEl: ".top-seller-next",
                                        nextEl: ".top-seller-prev",
                                    }}
                                 
                                    modules={[Navigation]}
                                    className="mySwiper swiper-container show-shadow carousel pad-t-17 auctions"
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 2,
                                        },
                                        499: {
                                            slidesPerView: 3,
                                        },
                                        640: {
                                            slidesPerView: 4,
                                        },
                                        768: {
                                            slidesPerView: 5,
                                        },
                                        1070: {
                                            slidesPerView: 7,
                                        },
                                        1400: {
                                            slidesPerView: 9,
                                        },
                                    }}
                                >
                                    {author.map((item) => (
                                        <SwiperSlide key={item.id}>
                                            <AuthorCard1 data={item} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="swiper-button-next top-seller-next btn-slide-next active" />
                                <div className="swiper-button-prev top-seller-prev btn-slide-prev " />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
