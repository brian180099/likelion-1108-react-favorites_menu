import { Link, NavLink, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import DrinkDetailPage from "./pages/DrinkDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useFavoriteStore } from "./stores/useFavoriteStore";

function Header() {
  const count = useFavoriteStore((state) => state.favoriteIds.length);
  return (
    <header>
      <Link className="logo" to="/">
        moment<span>.</span>
        <small>COFFEE & LITTLE JOYS</small>
      </Link>
      <nav aria-label="주요 메뉴">
        <NavLink to="/" end>
          전체 메뉴
        </NavLink>
        <NavLink to="/favorites">
          찜한 메뉴 <b aria-label={`찜한 메뉴 ${count}개`}>{count}</b>
        </NavLink>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drinks/:drinkId" element={<DrinkDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <footer>
        moment café <span>좋아하는 한 잔, 작은 쉼표.</span>
      </footer>
    </>
  );
}
