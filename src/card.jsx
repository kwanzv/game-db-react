export default function Card({
  // eslint-disable-next-line react/prop-types
  game: {
    id,
    playtime,
    released,
    slug,
    background_image,
    platforms,
    metacritic,
  },
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
        <p>
          Platforms:{" "}
          {platforms.map((platform) => `${platform.platform.name} /`)}
        </p>
      </div>
    </div>
  );
}
