const Movie = (props) =>{

  return (
    <tr>
      <td>
        {props.number}
      </td>
      <td>
        {props.name}
      </td>
      <td>
        {props.director}
      </td>
      <td>
        {props.country}
      </td>
      <td>
        {props.budget}
      </td>
      <td>
        {props.release}
      </td>
      <td>
        {props.views}
      </td>
    </tr>
  )
}

export default Movie;