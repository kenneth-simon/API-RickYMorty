export function Character({ character }) {
  return (
    <div className="card bg-dark text-white">
      <img src={character.image} alt={character.name} className="card-img-top" />
      <div className="card-body text-center">
        <h5 className="" style={{ fontSize: "40px", marginBottom: "15px" }}>{character.name}</h5>
        <div className="datos">
          <p>Status: {character.status}</p>
          <p>Especie: {character.species}</p>
          <p>Origin: {character.origin && character.origin.name}</p>
        </div>
      </div>
    </div>
  );
}