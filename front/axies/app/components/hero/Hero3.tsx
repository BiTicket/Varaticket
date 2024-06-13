import Image from "next/image";
import HeroSlider3 from "../slider/HeroSlider3";

export default function Hero3(): JSX.Element {
    return (
        <>
            <section className="flat-title-page style2">
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
                <div className="shape item-w-22" />
                <div className="shape item-w-32" />
                <div className="shape item-w-48" />
                <div className="shape style2 item-w-51" />
                <div className="shape style2 item-w-51 position2" />
                <div className="shape item-w-68" />
                <div className="overlay" />
                <HeroSlider3 />

                <div className="swiper-button-next btn-slide-next active" />
                <div className="swiper-button-prev btn-slide-prev" />
            </section>
        </>
    );
}
