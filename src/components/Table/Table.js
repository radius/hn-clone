import React from "react";
import Button from "../Button";
import classNames from "classnames";
import { SORTS, SORT_KEYS } from "../../constants";

const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
  const btnClasses = classNames("button-inline", { "button-active": sortKey === activeSortKey });
  return (
    <Button onClick={() => onSort(sortKey)} type="button" className={btnClasses}>
      {children}
    </Button>
  );
};
class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: SORT_KEYS.none,
      isSortReverse: false
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const { list, onDismiss } = this.props;
    const { sortKey, isSortReverse } = this.state;
    const preSortedList = SORTS[sortKey](list);
    const sortedList = isSortReverse ? preSortedList.reverse() : preSortedList;
    return (
      <div className="table">
        <div className="table-header">
          <span style={{ width: "40%" }}>
            <Sort sortKey={SORT_KEYS.title} onSort={this.onSort} activeSortKey={sortKey}>
              Title
            </Sort>
          </span>
          <span style={{ width: "30%" }}>
            <Sort sortKey={SORT_KEYS.author} onSort={this.onSort} activeSortKey={sortKey}>
              Author
            </Sort>
          </span>
          <span style={{ width: "10%" }}>
            <Sort sortKey={SORT_KEYS.comments} onSort={this.onSort} activeSortKey={sortKey}>
              Comments
            </Sort>
          </span>
          <span style={{ width: "10%" }}>
            <Sort sortKey={SORT_KEYS.points} onSort={this.onSort} activeSortKey={sortKey}>
              Points
            </Sort>
          </span>
          <span style={{ width: "40%" }}>Archive</span>
        </div>
        {sortedList.map(item => (
          <div key={item.objectID} className="table-row">
            <span style={{ width: "40%" }}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: "30%" }}>{item.author}</span>
            <span style={{ width: "10%" }}>{item.num_comments}</span>
            <span style={{ width: "10%" }}>{item.points}</span>
            <span style={{ width: "10%" }}>
              <Button
                onClick={() => onDismiss(item.objectID)}
                type="button"
                className="button-inline"
              >
                Dismiss
              </Button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}
export default Table;
