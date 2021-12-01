import {useEffect, useState} from "react";
import Movie from "./movie"

const ListMovies = () => {
  const urlEn = "https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json";
  const urlEs = "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json";
  const [moviesEn, setMoviesEn] = useState([]);
  const [moviesEs, setMoviesEs] = useState([]);

  const fetchUrl = (url, setter) => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => setter(data))
      .catch((err) => console.log("que paso pepeboi?", err))
  }


  useEffect(() => {
    fetchUrl(urlEs, setMoviesEs);
    fetchUrl(urlEn, setMoviesEn);
  }, [])


  const listItem = moviesEn.map((entry,index) => {
      return (
        <Movie
          number={index+1}
          key={entry.id}
          name={entry.name}
          director={entry.directedBy}
          country={entry.country}
          budget={entry.budget}
          release={entry.releaseDate}
          views={entry.views}
        />
      )
    }
  )

  return (
    <table className="table table-striped">
      <thead>
      <tr>
      <th>
          #
      </th>
        <th>
          Name
        </th>
        <th>
          Directed by
        </th>
        <th>
          Country
        </th>
        <th>
          Budget
        </th>
        <th>
          Release
        </th>
        <th>
          Views
        </th>
      </tr>
      </thead>
      <tbody>
        {listItem}
      </tbody>
    </table>
  )

}

export default ListMovies;