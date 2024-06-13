"use client";
import { author } from "@/data/author";
import AuthorCard4 from "../card/AuthorCard4";
import { useState } from "react";
import Link from "next/link";

const tab: string[] = ["24 Hours", "Week", "Month"];

export default function TopSeller7(): JSX.Element {
    const [getCurrentTab, setCurrentTab] = useState<number>(0);

    const tabHandler = (select: number) => {
        setCurrentTab(select);
    };

    return (
        <>
            <section className="tf-section top-seller home7 bg-style">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title pb-23">Top Seller</h2>
                                <Link
                                    href="/explore-3"
                                    className="exp style2 see-all"
                                >
                                    SEE ALL
                                </Link>
                            </div>
                            <div className="flat-tabs seller-tab style2">
                                <ul className="menu-tab">
                                    {tab.map((item, index) => (
                                        <li
                                            onClick={() => tabHandler(index)}
                                            key={index}
                                            className={`item-title ${
                                                index === getCurrentTab
                                                    ? "active"
                                                    : ""
                                            }`}
                                        >
                                            <span className="inner">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="content-tab mg-t-16">
                                    <div className="row">
                                        {author
                                            .slice(
                                                0,
                                                getCurrentTab === 0
                                                    ? 12
                                                    : getCurrentTab === 1
                                                    ? 6
                                                    : getCurrentTab === 2
                                                    ? 4
                                                    : getCurrentTab
                                            )
                                            .map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="col-lg-6"
                                                >
                                                    <AuthorCard4 data={item} />
                                                </div>
                                            ))}
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
