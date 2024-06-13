import Image from "next/image";
import HeroSlider2 from "../slider/HeroSlider2";

export default function Hero2(): JSX.Element {
    return (
        <>
            <section className="flat-title-page style-3">
                <Image
                    width={528}
                    height={327}
                    className="bgr-gradient gradient1"
                    src="/assets/images/backgroup-secsion/bg-gradient1.png"
                    alt="Gradient 1"
                />
                <Image
                    width={315}
                    height={195}
                    className="bgr-gradient gradient2"
                    src="/assets/images/backgroup-secsion/bg-gradient2.png"
                    alt="Gradient 2"
                />
                <Image
                    width={178}
                    height={110}
                    className="bgr-gradient gradient3"
                    src="/assets/images/backgroup-secsion/bg-gradient3.png"
                    alt="Gradient 3"
                />
                <div className="shape item-w-16" />
                <div className="shape item-w-32" />
                <div className="shape item-w-51 style2" />
                <div className="shape item-w-51 style2" />
                <div className="overlay" />
                <HeroSlider2 />
                <div className="swiper-button-next btn-slide-next active" />
                <div className="swiper-button-prev btn-slide-prev" />
            </section>
        </>
    );
}
