import { useState, useEffect } from "react";
import { Character } from "./Character";


async function getCharacters(page, name, status) {
  let url = `https://rickandmortyapi.com/api/character?page=${page}`;

  if (name || status) {
    url += "&";
    if (name) {
      url += `name=${name}&`;
    }
    if (status) {
      url += `status=${status}&`;
    }
  }

  const response = await fetch(url);
  const data = await response.json();

  return data.results;
}

export function CharacterList() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getCharacters(page, searchName, statusFilter);
      setCharacters(data);
      setLoading(false);
    }

    fetchData();
  }, [page, searchName, statusFilter]);

  return (
    <div className="container-fluid" style={{ padding: "0% 15%" }}>
      <div id="filters" className="mb-4">
        <input
          type="text"
          id="name-filter"
          placeholder="Filtrado por nombre"
          className="form-control mb-2"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <select
          id="status-filter"
          className="form-select mb-2 custom-select-lg"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filtrar por estado</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>

      <div className="row row-cols-md-4 g-4" style={{ padding: "3% 0%" }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          characters.map((character) => (
            <div className="col" key={character.id}>
              <Character character={character} />
            </div>
          ))
        )}
      </div>

      <div className="d-flex justify-content-center mt-4" style={{ paddingBottom: "3%" }}>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{ fontSize: "120%" }}
        >
          Anterior
        </button>

        <button
          className="btn btn-secondary mx-2"
          onClick={() => setPage(page + 1)}
          style={{ fontSize: "120%" }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default CharacterList;