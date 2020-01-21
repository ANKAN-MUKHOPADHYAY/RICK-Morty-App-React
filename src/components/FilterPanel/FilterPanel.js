import React, { Component } from "react";
import SortingPanel from "../SortingPanel/SortingPanel";

export class FilterPanel extends Component {
    render() {
        return (
            <form
                className="filter-form"
                onSubmit={this.props.handleSearch}
                onChange={this.props.handleFilter}
                ref={this.props.refProp}
            >
                <SortingPanel resetHandler={this.props.handleResetFilter} />
            </form>
        );
    }
}

export default FilterPanel;
