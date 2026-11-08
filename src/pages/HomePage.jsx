import { drinks } from "../data/drinks";
import DrinkCard from "../components/DrinkCard";

export default function HomePage() {
  return (
    <main>
      <section className="page-intro">
        <p className="eyebrow">A MOMENT FOR YOURSELF</p>
        <h1>오늘은 어떤 한 잔인가요?</h1>
        <p className="intro">
          취향에 맞는 메뉴를 발견하고,
          <br />
          마음에 드는 한 잔을 찜해 보세요.
        </p>
      </section>
      <div className="section-heading">
        <h2>
          우리의 메뉴 <span>{drinks.length}</span>
        </h2>
        <p>매일 함께하고 싶은 작은 즐거움</p>
      </div>
      <div className="card-grid">
        {drinks.map((drink) => (
          <DrinkCard key={drink.id} drink={drink} />
        ))}
      </div>
    </main>
  );
}
