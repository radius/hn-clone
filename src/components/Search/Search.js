import React, { Component } from "react";

class Search extends Component {
  componentDidMount() {
    this.input.focus();
  }
  render() {
    const { value, onChange, onSubmit, children } = this.props;
    return (
      <form onSubmit={onSubmit}>
        {children}
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={node => {
            this.input = node;
          }}
        />{" "}
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default Search;
