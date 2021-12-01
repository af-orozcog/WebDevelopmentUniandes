import {FormattedDate, FormattedMessage, FormattedNumber} from "react-intl";

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
          <FormattedMessage
            id="budget"
            defaultMessage={
                `{budget, plural, =0 {# million} one {# million} other {# million}}.`
            }
            values={{budget:props.budget}}
          />
      </td>
      <td>
          <FormattedDate
            value={new Date(props.release)}
            year='numeric'
            month='numeric'
            day='numeric'
          />
      </td>
      <td>
          <FormattedNumber
            value={props.views}
          />
      </td>
    </tr>
  )
}

export default Movie;