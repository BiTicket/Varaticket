export default function SubscribeForm() {
  return (
    <>
      <form className="form-submit">
        <input
          name="email"
          className="email"
          type="email"
          placeholder="info@yourgmail.com"
          required
        />
        <button id="submit" name="submit" type="submit">
          <i className="icon-fl-send" />
        </button>
      </form>
    </>
  );
}
