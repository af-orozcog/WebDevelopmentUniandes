import {useEffect, useState} from "react";
import Movie from "./movie"
import {FormattedMessage, useIntl} from "react-intl";
import * as d3 from "d3";

const ListMovies = () => {
  const urlEn = "https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json";
  const urlEs = "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json";
  const [moviesEn, setMoviesEn] = useState([]);
  const [moviesEs, setMoviesEs] = useState([]);

  const intl = useIntl();
  let see = intl.formatMessage({id:"language", defaultMessage:"en"});

  const messages = {
    'es': moviesEs,
    'en': moviesEn
  };

  const fetchUrl = (url, setter) => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => setter(data))
      .catch((err) => console.log("que paso pepeboi?", err))
  }


  useEffect(() => {
    fetchUrl(urlEs, setMoviesEs);
    fetchUrl(urlEn, setMoviesEn);
  }, []);


  const makeGraph = (data) =>{

    const width = 700;
    const height = 500;
    const margin = { top:10, left:100, bottom: 40, right: 10};
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top -margin.bottom;

    const svg = d3.select("#pepe");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear()
      .domain([0, 9256000])
      .range([iheight, 0]);

    const x = d3.scaleBand()
      .domain(data.map(d => d.name) )
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll("rect").data(data);

    bars.enter().append("rect")
      .attr("class", "bar")
      .style("fill", "steelblue")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.views))
      .attr("height", d => iheight - y(d.views))
      .attr("width", x.bandwidth())

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g")
      .classed("y--axis", true)
      .call(d3.axisLeft(y));

  };

  if(see=== "en") makeGraph(moviesEn);
  else makeGraph(moviesEs);

  const listItem = messages[see].map((entry, index) => {
      return (
        <Movie
          number={index + 1}
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
    <>
    <table className="table table-striped">
      <thead>
      <tr>
        <th>
          #
        </th>
        <th>
          <FormattedMessage
            id="Name"
            defaultMessage="Name"
          />
        </th>
        <th>
          <FormattedMessage
            id="Directed"
            defaultMessage="Directed by"
          />
        </th>
        <th>
          <FormattedMessage
            id="Country"
            defaultMessage="Country"
          />
        </th>
        <th>
          <FormattedMessage
            id="Budget"
            defaultMessage="Budget"
          />
        </th>
        <th>
          <FormattedMessage
            id="Release"
            defaultMessage="Release"
          />
        </th>
        <th>
          <FormattedMessage
            id="Views"
            defaultMessage="Views"
          />
        </th>
      </tr>
      </thead>
      <tbody>
      {listItem}
      </tbody>
    </table>
    <svg id="pepe"/>
    </>
  )

}

export default ListMovies;