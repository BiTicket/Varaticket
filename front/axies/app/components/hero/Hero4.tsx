"use client";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Keyboard, Scrollbar } from "swiper";
import Link from "next/link";

export default function Hero4(): JSX.Element {
    return (
        <>
            <section className="flat-cart_item">
                <div className="overlay" />
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="wrap-cart flex">
                                <div className="cart_item item1">
                                    <div className="inner-cart">
                                        <Image
                                            height={500}
                                            width={500}
                                            src="/assets/images/box-item/img_cart_item.jpg"
                                            alt="Image"
                                        />
                                        <div className="content">
                                            <div className="fs-16">
                                                <Link href="/item-details-1">
                                                    "Hamlet Contemplates Hamlet
                                                    Contemplates
                                                </Link>
                                            </div>
                                            <p>Graphic Art 3D</p>
                                        </div>
                                    </div>
                                    <div className="inner-cart">
                                        <div className="overlay" />
                                        <Image
                                            height={500}
                                            width={500}
                                            src="/assets/images/box-item/img_cart_item2.jpg"
                                            alt="Image"
                                        />
                                        <div className="content">
                                            <div className="fs-16">
                                                <Link href="/item-details-1">
                                                    "Hamlet Contemplates ...
                                                </Link>
                                            </div>
                                            <p>Graphic Art 3D</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart_item style2">
                                    <div className="inner-cart">
                                        <Swiper
                                            slidesPerView={1}
                                            grabCursor={true}
                                            keyboard={{
                                                enabled: true,
                                            }}
                                            scrollbar={true}
                                            modules={[Keyboard, Scrollbar]}
                                            className="mySwiper"
                                        >
                                            <SwiperSlide>
                                                <Image
                                                    height={1500}
                                                    width={1500}
                                                    src="/assets/images/box-item/img_cart_item3.png"
                                                    alt="Image"
                                                />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <Image
                                                    height={1500}
                                                    width={1500}
                                                    src="/assets/images/box-item/img_cart_item3.png"
                                                    alt="Image"
                                                />
                                            </SwiperSlide>
                                        </Swiper>
                                        <div className="content">
                                            <div className="fs-16">
                                                <Link href="/item-details-1">
                                                    CYBER ART
                                                </Link>
                                            </div>
                                            <p>Graphic Art 3D</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart_item">
                                    <div className="inner-cart">
                                        <div className="overlay" />
                                        <Image
                                            height={500}
                                            width={500}
                                            src="/assets/images/box-item/img_cart_item4.jpg"
                                            alt="Image"
                                        />
                                        <div className="content">
                                            <div className="fs-16">
                                                <Link href="/item-details-1">
                                                    "Hamlet Contemplates ...
                                                </Link>
                                            </div>
                                            <p>Graphic Art 3D</p>
                                        </div>
                                    </div>
                                    <div className="inner-cart">
                                        <div className="overlay" />
                                        <Image
                                            height={500}
                                            width={500}
                                            src="/assets/images/box-item/img_cart_item5.jpg"
                                            alt="Image"
                                        />
                                        <div className="content">
                                            <div className="fs-16">
                                                <Link href="/item-details-1">
                                                    "Hamlet Contemplates ...
                                                </Link>
                                            </div>
                                            <p>Graphic Art 3D</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart_item">
                                    <div className="inner-cart mg-bt-30">
                                        <div className="overlay" />
                                        <Image
                                            height={500}
                                            width={500}
                                            src="/assets/images/box-item/img_cart_item6.jpg"
                                            alt="Image"
                                        />
                                        <div className="content">
                                            <div className="fs-16">
                                                <Link href="/item-details-1">
                                                    "Hamlet Contemplates ...
                                                </Link>
                                            </div>
                                            <p>Graphic Art 3D</p>
                                        </div>
                                    </div>
                                    <div className="inner-cart">
                                        <div className="overlay" />
                                        <Image
                                            height={500}
                                            width={500}
                                            src="/assets/images/box-item/img_cart_item7.jpg"
                                            alt="Image"
                                        />
                                        <div className="content">
                                            <div className="fs-16">
                                                <Link href="/item-details-1">
                                                    "Hamlet Contemplates ...
                                                </Link>
                                            </div>
                                            <p>Graphic Art 3D</p>
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
