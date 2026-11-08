import { Link, useParams } from "react-router";
import { drinks } from "../data/drinks";
import { useFavoriteStore } from "../stores/useFavoriteStore";
import DrinkArt from "../components/DrinkArt";
import NotFoundPage from "./NotFoundPage";

export default function DrinkDetailPage() {
  const { drinkId } = useParams();
  const drink = drinks.find((item) => item.id === drinkId);
  const isFavorite = useFavoriteStore((state) =>
    state.favoriteIds.includes(drinkId),
  );
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  if (!drink) return <NotFoundPage />;
  return (
    <main>
      <Link className="back" to="/">
        ← 전체 메뉴로 돌아가기
      </Link>
      <section className="detail-card">
        <DrinkArt color={drink.color} />
        <div className="detail-body">
          <span className="tag">{drink.tag}</span>
          <h1>{drink.title}</h1>
          <p className="description">{drink.description}</p>
          <p className="tasting-note">
            TASTING NOTE <span>{drink.note}</span>
          </p>
          <strong className="price">
            {drink.price.toLocaleString("ko-KR")}원
          </strong>
          <button
            className={isFavorite ? "button saved" : "button"}
            type="button"
            aria-pressed={isFavorite}
            onClick={() => toggleFavorite(drink.id)}
          >
            {isFavorite ? "♥ 찜 해제하기" : "♡ 찜하기"}
          </button>
          <Link className="text-link" to="/favorites">
            찜한 메뉴 보러 가기 →
          </Link>
        </div>
      </section>
    </main>
  );
}
