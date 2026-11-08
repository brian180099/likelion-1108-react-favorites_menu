import { Link } from "react-router";
import DrinkArt from "./DrinkArt";

export default function DrinkCard({ drink }) {
  return (
    <Link className="drink-card" to={`/drinks/${drink.id}`}>
      <DrinkArt color={drink.color} />
      <div className="card-body">
        <span className="tag">{drink.tag}</span>
        <h2>{drink.title}</h2>
        <p>{drink.description}</p>
        <div className="card-bottom">
          <strong>{drink.price.toLocaleString("ko-KR")}원</strong>
          <span>자세히 보기 ↗</span>
        </div>
      </div>
    </Link>
  );
}
