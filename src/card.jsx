export default function Card({
  // eslint-disable-next-line react/prop-types
  game: { metacritic, id, playtime, released, slug, background_image },
}) {
  return (
    <div className="card" key={id}>
      <div>
        <img src={background_image} alt="" />
      </div>
      <div className="game-details">
        <div className="game-title">
          <h3>{slug}</h3>
        </div>
        <p>Release date: {released}</p>
        <p>Metacritic: {metacritic}</p>
        <p>Estimated length: {playtime} hours</p>
      </div>
    </div>
  );
}
