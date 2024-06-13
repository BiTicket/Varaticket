"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import AuthorCard1 from "../card/AuthorCard1";
import { author } from "@/data/author";
import { useState } from "react";

const tab: string[] = ["1 Day", "1 Week", "1 Month"];

export default function TopSeller6(): JSX.Element {
    const [getCurrentTab, setCurrentTab] = useState<number>(0);

    // tab handler
    const tabHandler = (select: number) => {
        setCurrentTab(select);
    };

    return (
        <>
            <section className="tf-section top-seller home6 s2 mobie-style">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2
                                className="tf-title style2 mb-25 text-left"
                                style={{ textAlign: "left" }}
                            >
                                Top Seller
                            </h2>
                            <div className="flat-tabs seller-tab style3 tablet-30">
                                <ul className="menu-tab">
                                    {tab.map((item, index) => (
                                        <li
                                            onClick={() => tabHandler(index)}
                                            key={index}
                                            className={
                                                getCurrentTab === index
                                                    ? "item-title active"
                                                    : "item-title"
                                            }
                                        >
                                            <span className="inner">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="content-tab mg-t-24">
                                    <div className="content-inner">
                                        <div className="swiper-container seller seller-slider3 button-arow-style">
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
                                                        <AuthorCard1
                                                            data={item}
                                                        />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                            <div className="swiper-button-next top-seller-next btn-slide-next active" />
                                            <div className="swiper-button-prev top-seller-prev btn-slide-prev " />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
