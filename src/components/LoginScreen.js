import React, { Component } from 'react';
import { ReactComponent as Logo } from '../assets/meblex_logo.svg';
import S from '../styles/LoginScreen.module.scss';

class LoginScreen extends Component {
    render() {
        return (
            <section className={S.welcome}>
                <div className={S.test}>
                    <span className="fi icon-wardrobe" />
                    <span className="fi icon-tv-table" />
                    <span className="fi icon-table-1" />
                    <span className="fi icon-storage-1" />
                    <span className="fi icon-storage" />
                    <span className="fi icon-armchair" />
                    <span className="fi icon-sofa" />
                    <span className="fi icon-single-bed" />
                    <span className="fi icon-sideboard" />
                    <span className="fi icon-shelves" />
                    <span className="fi icon-rocking-chair" />
                    <span className="fi icon-rack" />
                    <span className="fi icon-plant" />
                    <span className="fi icon-ottoman" />
                    <span className="fi icon-desk-1" />
                    <span className="fi icon-office-chair" />
                    <span className="fi icon-nightstand" />
                    <span className="fi icon-mirror" />
                    <span className="fi icon-mattress" />
                    <span className="fi icon-locker" />
                    <span className="fi icon-lamp" />
                    <span className="fi icon-cart" />
                    <span className="fi icon-kitchen" />
                    <span className="fi icon-stool" />
                    <span className="fi icon-closet" />
                    <span className="fi icon-folding-chair" />
                    <span className="fi icon-cabinet-1" />
                    <span className="fi icon-dresser" />
                    <span className="fi icon-double-bed" />
                    <span className="fi icon-dining-table" />
                    <span className="fi icon-cupboard-1" />
                    <span className="fi icon-dining-chair" />
                    <span className="fi icon-deck-chair" />
                    <span className="fi icon-couch" />
                    <span className="fi icon-cabinet" />
                    <span className="fi icon-desk" />
                    <span className="fi icon-coffee-table" />
                    <span className="fi icon-coat-stand" />
                    <span className="fi icon-clothes-rack" />
                    <span className="fi icon-chest-of-drawers" />
                    <span className="fi icon-chandelier" />
                    <span className="fi icon-chair" />
                    <span className="fi icon-carpet" />
                    <span className="fi icon-bunk-bed" />
                    <span className="fi icon-bookcase" />
                    <span className="fi icon-bench" />
                    <span className="fi icon-bean" />
                    <span className="fi icon-cupboard" />
                </div>

                <Logo className={S.logo} />

                <div className={S.loginForm + " card"}>
                    <h4 className="title">Witaj, <strong>zaloguj się</strong> aby korzystać z aplikacji!</h4>
                    <input className={S.email} type="email" placeholder="Adres email" autoComplete="email" />
                    <input className={S.password} type="password" placeholder="Hasło" autoComplete="password" />
                    <div className={S.actions}>
                        <button className={S.login} onClick={this.props.loginCallback}>Zaloguj</button>
                        <button className="secondary">Rejestracja</button>
                    </div>
                </div>
            </section>
        );
    }
}

export default LoginScreen;