import { Link } from "react-router";
import { drinks } from "../data/drinks";
import { useFavoriteStore } from "../stores/useFavoriteStore";

export default function FavoritesPage() {
  const favoriteIds = useFavoriteStore((state) => state.favoriteIds);
  const clearFavorites = useFavoriteStore((state) => state.clearFavorites);

  const favoriteDrinks = drinks.filter((drink) =>
    favoriteIds.includes(drink.id),
  );

  return (
    <main>
      <h1>찜한 메뉴</h1>
      <button
        className="clear-favorites"
        type="button"
        onClick={clearFavorites}
        disabled={favoriteDrinks.length === 0}
      >
        전체 찜 해제
      </button>

      {favoriteDrinks.length === 0 ? (
        <div className="empty">
          아직 찜한 메뉴가 없어요.
          <br />
          <Link to="/">메뉴 둘러보기 →</Link>
        </div>
      ) : (
        <div className="favorite-list">
          {favoriteDrinks.map((drink) => (
            <Link key={drink.id} to={`/drinks/${drink.id}`}>
              {drink.title}
              <span>→</span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
