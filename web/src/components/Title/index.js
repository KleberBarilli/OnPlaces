import './title.css'

function Title({children, name}) {
  return (
	  <div className="title">
		  {children}
		  <span>{name}</span>
	  </div>
  )
}

export default Title;
