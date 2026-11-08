import { useState } from "react";
import { Link } from "react-router";
import { drinks } from "../data/drinks";
import { useFavoriteStore } from "../stores/useFavoriteStore";
import DrinkCard from "../components/DrinkCard";

export default function FavoritesPage() {
  const favoriteIds = useFavoriteStore((state) => state.favoriteIds);
  const clearFavorites = useFavoriteStore((state) => state.clearFavorites);
  const [message, setMessage] = useState("");
  const favoriteDrinks = drinks.filter((drink) =>
    favoriteIds.includes(drink.id),
  );

  function handleClearFavorites() {
    clearFavorites();
    setMessage("찜한 메뉴를 모두 해제했어요.");
  }

  return (
    <main>
      <section className="page-intro">
        <p className="eyebrow">YOUR LITTLE COLLECTION</p>
        <h1>마음에 담아 둔 한 잔.</h1>
        <p className="intro">
          좋아하는 메뉴를 한곳에 모았어요.
          <br />
          오늘의 기분에 따라 다시 골라 보세요.
        </p>
      </section>
      <div className="section-heading">
        <h2>
          찜한 메뉴 <span>{favoriteDrinks.length}</span>
        </h2>
        <button
          className="clear-button"
          type="button"
          disabled={favoriteDrinks.length === 0}
          onClick={handleClearFavorites}
        >
          전체 찜 해제
        </button>
      </div>
      <p className="status" role="status">
        {message}
      </p>
      {favoriteDrinks.length === 0 ? (
        <section className="empty">
          <span className="empty-heart" aria-hidden="true">
            ♡
          </span>
          <h2>아직 찜한 메뉴가 없어요.</h2>
          <p>마음에 드는 메뉴의 ♡ 찜하기 버튼을 눌러 보세요.</p>
          <Link className="button" to="/">
            메뉴 둘러보기 →
          </Link>
        </section>
      ) : (
        <div className="card-grid">
          {favoriteDrinks.map((drink) => (
            <DrinkCard key={drink.id} drink={drink} />
          ))}
        </div>
      )}
    </main>
  );
}
