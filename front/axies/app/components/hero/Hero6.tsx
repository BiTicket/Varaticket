"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import "swiper/css/scrollbar";
import { Pagination, Navigation, Scrollbar, Keyboard } from "swiper";
import Link from "next/link";
import Image from "next/image";

interface ImageTpe {
    id: number;
    title: string;
    art: string;
    img: string;
    gallery?: string[];
}

const images: ImageTpe[] = [
    {
        id: 1,
        title: "CYBER ART",
        art: "Graphic Art 3D",
        img: "/assets/images/box-item/img_cart_item3.png",
        gallery: [
            "/assets/images/box-item/img_cart_item5.png",
            "/assets/images/box-item/img_cart_item4.png",
            "/assets/images/box-item/img_cart_item3.png",
        ],
    },
    {
        id: 2,
        title: "HOT lAVA",
        art: "Graphic Art 3D",
        img: "/assets/images/box-item/img_cart_item4.png",
    },
    {
        id: 3,
        title: "LIVE ARTS",
        art: "Graphic Art 3D",
        img: "/assets/images/box-item/img_cart_item5.png",
    },
    {
        id: 4,
        title: "CYBER ART",
        art: "Graphic Art 3D",
        img: "/assets/images/box-item/img_cart_item3.png",
    },
    {
        id: 5,
        title: "HOT lAVA",
        art: "Graphic Art 3D",
        img: "/assets/images/box-item/img_cart_item4.png",
    },
    {
        id: 6,
        title: "LIVE ARTS",
        art: "Graphic Art 3D",
        img: "/assets/images/box-item/img_cart_item5.png",
    },
];

export default function Hero6(): JSX.Element {
    return (
        <>
            <section className="flat-cart_item home6 style2">
                <div className="overlay" />
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={30}
                                pagination={{
                                    el: ".swiper-pagination",
                                    clickable: true,
                                }}
                                navigation={{
                                    prevEl: ".live-auction-next",
                                    nextEl: ".live-auction-right",
                                }}
                              
                                modules={[Pagination, Navigation]}
                                className="swiper-container carousel8 pad-t-17 auctions"
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
                                }}
                                nested={true}
                            >
                                {images.slice(0, 7).map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <div className="slider-item">
                                            <div className="wrap-cart">
                                                <div className="cart_item style2 style3">
                                                    <div className="inner-cart">
                                                        {item.gallery ? (
                                                            <Swiper
                                                                nested={true}
                                                                slidesPerView={
                                                                    1
                                                                }
                                                                scrollbar={{
                                                                    hide: false,
                                                                }}
                                                                modules={[
                                                                    Scrollbar,
                                                                ]}
                                                            >
                                                                {item.gallery?.map(
                                                                    (
                                                                        item2,
                                                                        i
                                                                    ) => (
                                                                        <SwiperSlide
                                                                            key={
                                                                                i
                                                                            }
                                                                        >
                                                                            <div>
                                                                                <Image
                                                                                    height={
                                                                                        500
                                                                                    }
                                                                                    width={
                                                                                        500
                                                                                    }
                                                                                    src={
                                                                                        item2
                                                                                    }
                                                                                    alt="Image"
                                                                                />
                                                                            </div>
                                                                        </SwiperSlide>
                                                                    )
                                                                )}
                                                            </Swiper>
                                                        ) : (
                                                            <Image
                                                                height={500}
                                                                width={500}
                                                                src={item.img}
                                                                alt="Image"
                                                            />
                                                        )}
                                                        <div className="content">
                                                            <div className="fs-16">
                                                                <Link href="/item-details-1">
                                                                    {item.title}
                                                                </Link>
                                                            </div>
                                                            <p>{item.art}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                                <div className="swiper-pagination mg-t22"></div>
                            </Swiper>
                            <div className="swiper-button-next live-auction-next btn-slide-next active" />
                            <div className="swiper-button-prev live-auction-right btn-slide-prev" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
