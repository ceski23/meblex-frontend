import React, { Component } from 'react'
import S from '../styles/Main.module.scss'
import Icons from '../icons'
import { Link } from 'react-router-dom'

import { ReactComponent as SearchIcon } from '../assets/search.svg';

export default class Main extends Component {
  render() {
    const cats = [
      {name: "Krzesła", slug: "krzesla", icon: Icons.DiningChair},
      {name: "Wieszaki", slug: "wieszaki", icon: Icons.CoatStand},
      {name: "Biurka", slug: "biurka", icon: Icons.Desk},
      {name: "Lustra", slug: "lustra", icon: Icons.Mirror},
      {name: "Stoliki pod TV", slug: "stoliki-tv", icon: Icons.TvTable},
      {name: "Kanapy", slug: "kanapy", icon: Icons.Sofa},
      {name: "Łóżka", slug: "lozka", icon: Icons.DoubleBed}
    ];

    return (
      <React.Fragment>
        <section className="gray">
          <label htmlFor="searchBox" className={S.searchBox}>
            <SearchIcon className={S.icon} />
            <input type="text" id="searchBox" autoComplete="search" placeholder="np. żółte dębowe krzesło" className={S.input} />
          </label>
        </section>
        
        <section className={S.categoriesGrid}>
          {cats.map((c, k) =>
            <Link to={"/katalog/" + c.slug} className={S.cat} key={k}>
              <c.icon className={S.icon} />
              <h4 className={S.text}>{c.name}</h4>
            </Link>
          )}
        </section>
      </React.Fragment>
    )
  }
}
