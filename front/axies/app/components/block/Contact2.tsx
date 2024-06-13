export default function Contact2(): JSX.Element {
    return (
        <>
            <section className="tf-contact tf-section">
                <div className="ibthemes-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="flat-form">
                                <h2 className="tf-title-heading ct style-2 mg-bt-12">
                                    Drop Up A Message
                                </h2>
                                <h5 className="sub-title ct style-1 pad-0-15">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Laborum obcaecati
                                    dignissimos quae quo ad iste ipsum officiis
                                    deleniti asperiores sit.
                                </h5>
                                <div className="form-inner">
                                    <form className="form-submit">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Your Full Name"
                                        />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Your Email Address"
                                        />
                                        <div className="row-form style-2">
                                            <select id="subject">
                                                <option value={1}>
                                                    Select subject
                                                </option>
                                                <option value={2}>
                                                    Select subject
                                                </option>
                                                <option value={3}>
                                                    Select subject
                                                </option>
                                            </select>
                                            <i className="icon-fl-down" />
                                        </div>
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Message"
                                        />
                                        <button
                                            type="button"
                                            className="submit"
                                        >
                                            Send message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
