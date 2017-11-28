import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { objToArray } from '../utils/ObjectToArray'

const SelectCategory = props => (
  <nav className='nav-bar container'>
    <NavLink
      className='nav-link'
      to="/">
      All
    </NavLink>
    {props.categories && objToArray(props.categories).map(category => (
      <NavLink
        key={`${category.name}-nav-link`}
        className='nav-link'
        to={`/${category.name}-index`}
        >{category.name}
      </NavLink>
    ))}
  </nav>
)

function mapStateToProps(state) {
  return {
    categories: state.posts.categories
  }
}

export default connect(mapStateToProps)(SelectCategory)
