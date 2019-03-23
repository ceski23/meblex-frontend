import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { TestContext } from '../contexts'

import S from '../styles/NavItem.module.scss'


export default class NavItem extends Component {
  static contextType = TestContext;

  render() {
    const Icon = this.props.icon;

    return (
      <Link to={this.props.url} className={cx({[S.link]: true, [S.dense]: this.props.type === "dense"})} onClick={this.context.toggleNavigation}>
        {Icon && <Icon className={S.icon} />}
        <p className={S.text}>{this.props.text}</p>
      </Link>
    )
  }
}

NavItem.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string
}

NavItem.defaultProps = {
  text: "",
  url: "",
  type: "normal"
}