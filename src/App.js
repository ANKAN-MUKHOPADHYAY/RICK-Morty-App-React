import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import Spinner from "./components/Spinner/Spinner";
import Header from "./components/layout/Header";
import { getCharactersList } from "./services/api";
import { APIKeysObj } from "./constants";
import "./App.scss";

class App extends Component {
    constructor() {
        super();
        this.characterListCopy = [];
        this.onPageChanged = this.onPageChanged.bind(this);
        this.performResetFilter = this.performResetFilter.bind(this);
        this.formRef = React.createRef();
    }

    state = {
        charactersList: [],
        characterName: "",
        sortingNameParam: "",
        gender: "",
        currentPage: null,
        totalPages: null
    };

    async componentDidMount() {
        const charactersList = await getCharactersList();
        this.characterListCopy = charactersList;
        this.setState({
            charactersList: charactersList
        });
    }

    performFilteringByName = event => {
        if (event.target.id === "name-asc") {
            this.setState({
                sortingNameParam: "asc"
            });
        } else if (event.target.id === "name-desc") {
            this.setState({
                sortingNameParam: "desc"
            });
        } else if (event.target.id === "gender-all-sort") {
            this.setState({
                gender: ""
            });
        } else if (event.target.id === "gender-female-sort") {
            this.setState({
                gender: APIKeysObj.genderFemale
            });
        } else if (event.target.id === "gender-male-sort") {
            this.setState({
                gender: APIKeysObj.genderMale
            });
        } else if (event.target.id === "gender-unknown-sort") {
            this.setState({
                gender: APIKeysObj.genderUnknown
            });
        }
    };

    performResetFilter = () => {
        this.setState({
            charactersList: this.characterListCopy,
            characterName: "",
            sortingNameParam: "",
            gender: ""
        });
        this.formRef.current.reset();
    };

    async onPageChanged() {
        const charactersList = await getCharactersList();
        this.setState({ charactersList });
    }

    render() {
        const {
            charactersList,
            characterName,
            sortingNameParam,
            gender
        } = this.state;

        let filteredList = charactersList.filter(character => {
            const lowercasedItem = character.name.toLowerCase();
            return lowercasedItem.includes(characterName);
        });

        if (sortingNameParam === "asc") {
            filteredList = filteredList.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
        } else if (sortingNameParam === "desc") {
            filteredList = filteredList.sort(function(a, b) {
                return b.name.localeCompare(a.name);
            });
        }

        if (gender !== "") {
            filteredList = filteredList.filter(item => {
                return item.gender === gender;
            });
        }

        const CharacterListComponent = React.lazy(props =>
            import("./components/CharacterList/CharacterList")
        );

        return (
            <Router>
                <div className="App">
                    <Header />
                    <Route
                        exact
                        path="/home/"
                        render={props => (
                            <div className="container main-content">
                                <div className="row">
                                    <div className="filter-panel">
                                        <aside className="aside">
                                            <FilterPanel
                                                handleFilter={
                                                    this.performFilteringByName
                                                }
                                                handleResetFilter={
                                                    this.performResetFilter
                                                }
                                                refProp={this.formRef}
                                            />
                                        </aside>
                                    </div>
                                    <div className="characters-panel">
                                        <main>
                                            <React.Suspense
                                                fallback={<Spinner />}
                                            >
                                                <CharacterListComponent
                                                    characters={filteredList}
                                                />
                                            </React.Suspense>
                                        </main>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
