import { author } from "@/data/author";
import AuthorCard5 from "../card/AuthorCard5";

export default function TopSeller2(): JSX.Element {
    return (
        <>
            <section className="tf-section top-seller home3 s2 mobie-style">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="style2 mb-25 text-left">
                                Top Seller
                            </h2>
                        </div>
                        <div className="col-md-12">
                            <div className="tf-box">
                                {author.slice(0, 10).map((item) => (
                                    <AuthorCard5 key={item.id} data={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
