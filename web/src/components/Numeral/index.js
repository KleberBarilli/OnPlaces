import React from 'react';
import numeral from 'numeral';

function Numeral({format, children}) {
  return (
	  <span>{numeral(children).format(format)}</span>
  )
}

export default Numeral;
