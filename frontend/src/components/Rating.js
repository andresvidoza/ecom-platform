import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"
import { IconContext } from 'react-icons'
import PropTypes from 'prop-types'



const Rating = ({value, text, color}) => {
  return (
    <div className='rating'>
      <span>
        { value >= 1 ? 
          <IconContext.Provider value={{ color: color }}><FaStar /></IconContext.Provider> : 
          value >= 0.5 ? 
          <IconContext.Provider value={{ color: color }}><FaStarHalfAlt/></IconContext.Provider> : 
          <IconContext.Provider value={{ color: color }}><FaRegStar/></IconContext.Provider>}
      </span>
      <span>
      { value >= 2 ? 
          <IconContext.Provider value={{ color: color }}><FaStar /></IconContext.Provider> : 
          value >= 1.5 ? 
          <IconContext.Provider value={{ color: color }}><FaStarHalfAlt/></IconContext.Provider> : 
          <IconContext.Provider value={{ color: color }}><FaRegStar/></IconContext.Provider>}
      </span>
      <span>
      { value >= 3 ? 
          <IconContext.Provider value={{ color: color }}><FaStar /></IconContext.Provider> : 
          value >= 2.5 ? 
          <IconContext.Provider value={{ color: color }}><FaStarHalfAlt/></IconContext.Provider> : 
          <IconContext.Provider value={{ color: color }}><FaRegStar/></IconContext.Provider>}
      </span>
      <span>
      { value >= 4 ? 
          <IconContext.Provider value={{ color: color }}><FaStar /></IconContext.Provider> : 
          value >= 3.5 ? 
          <IconContext.Provider value={{ color: color }}><FaStarHalfAlt/></IconContext.Provider> : 
          <IconContext.Provider value={{ color: color }}><FaRegStar/></IconContext.Provider>}
      </span>
      <span>
      { value >= 5 ? 
          <IconContext.Provider value={{ color: color }}><FaStar /></IconContext.Provider> : 
          value >= 4.5 ? 
          <IconContext.Provider value={{ color: color }}><FaStarHalfAlt/></IconContext.Provider> : 
          <IconContext.Provider value={{ color: color }}><FaRegStar/></IconContext.Provider>}
      </span>
      <span> {text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#ffd500'
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}


export default Rating
