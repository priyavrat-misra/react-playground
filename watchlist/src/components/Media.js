export function Media({ media }) {
  const { Title: title, Year: year, Poster: poster } = media;
  return (
    <>
      <img
        src={poster}
        alt={`${title}'s poster`}
        style={{
          height: 128,
        }}
      />
      <div style={{ marginRight: "auto" }}>
        <p>{title}</p>
        <p>{year}</p>
      </div>
    </>
  );
}
