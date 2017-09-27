import React from "react";
import Button from "./components/Button";
import Search from "./components/Search";
import Table from "./components/Table";

import "./App.css";
import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from "./constants";

const Loader = props => (
  <div className="loader-wrapper">
    <div className="loader">Loading</div>
  </div>
);

const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loader /> : <Component {...rest} />;

const updateSearchTopStoriesState = (hits, page) => prevState => {
  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  const updatedHits = [...oldHits, ...hits];
  return {
    isLoading: false,
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    }
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      isLoading: false
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
  }

  onSearchSubmit(event) {
    event.preventDefault();
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
    }
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  fetchSearchTopStories(term, page) {
    this.setState({ isLoading: true });
    const API_URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${term}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    fetch(API_URL)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result));
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const newHits = hits.filter(item => item.objectID !== id);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: newHits, page }
      }
    });
  }

  render() {
    const { searchTerm, results, searchKey, isLoading } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    const ButtonWithLoading = withLoading(Button);
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          />
        </div>
        {results && <Table list={list} onDismiss={this.onDismiss} />}
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;
