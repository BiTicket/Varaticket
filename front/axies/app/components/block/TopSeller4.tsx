"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import AuthorCard1 from "../card/AuthorCard1";
import { author } from "@/data/author";

export default function TopSeller4(): JSX.Element {
    return (
        <>
            <section className="tf-section top-seller style-2">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="tf-title style4">Top Seller</h2>
                            <p className="tf-sub-title">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Laborum obcaecati dignissimos
                                quae quo ad iste ipsum officiis deleniti
                                asperiores sit.
                            </p>
                        </div>
                        <div className="col-md-12">
                            <div className="">
                                <Swiper
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={{
                                        prevEl: ".btn-slide-next",
                                        nextEl: ".btn-slide-prev",
                                    }}
                                    modules={[Pagination, Navigation]}
                                    className="swiper-container seller seller-slider"
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 2,
                                        },
                                        500: {
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
                                    <div className="swiper-pagination" />
                                    <div className="swiper-button-next btn-slide-next" />
                                    <div className="swiper-button-prev btn-slide-prev" />
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
