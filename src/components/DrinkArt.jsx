export default function DrinkArt({ color }) {
  return (
    <div className={`drink-art ${color}`} aria-hidden="true">
      <div className="art-orbit" />
      <div className="glass">
        <i className="straw" />
        <div className="liquid">
          <i />
          <i />
          <i />
        </div>
        <span>m.</span>
      </div>
      <div className="glass-shadow" />
    </div>
  );
}
