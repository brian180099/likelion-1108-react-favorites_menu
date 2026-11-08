import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main>
      <section className="empty">
        <p className="eyebrow">404 · NOT FOUND</p>
        <h1>페이지를 찾을 수 없어요.</h1>
        <p>주소를 확인하거나 전체 메뉴에서 다시 골라 주세요.</p>
        <Link className="button" to="/">
          메뉴 둘러보기 →
        </Link>
      </section>
    </main>
  );
}
