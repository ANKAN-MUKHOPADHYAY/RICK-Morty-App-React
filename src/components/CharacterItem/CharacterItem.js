import React, { Component } from "react";
import "./CharacterItem.scss";

export class CharacterItem extends Component {
    render() {
        const { name, image, gender, id, species, status, origin } = this.props.data;

        return (
            <div className="character-item">
                <div
                    className={`character-item__thumb ${
                        gender.toUpperCase() === "MALE"
                            ? "thumb-male"
                            : "thumb-female"
                    }`}
                >
                    <figure className="item-thumb-wrap">
                        <img
                            src={image}
                            alt={name}
                            className="item-thumb-image"
                        />
                    </figure>
                    <section className="item-name">
                        <h2>{name}</h2>
                        <div className="head">
                            <p>ID: { id }</p>
                        </div>
                    </section>
                    <section>
                        <div className="head">
                            <p className="item-left">STATUS</p>
                            <p className="item-msg">{ status }</p>
                        </div><hr/>
                        <div className="head">
                            <p className="item-left">SPECIES</p>
                            <p className="item-msg">{ species }</p>
                        </div><hr/>
                        <div className="head">
                            <p className="item-left">GENDER</p>
                            <p className="item-msg">{ gender }</p>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default CharacterItem;
