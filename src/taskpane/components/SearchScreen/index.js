import * as React from "react";
import logout from "../../../../assets/logout.png";
import logo from "../../../../assets/logo.png";
import search from "../../../../assets/search.png";
import { displayMessageComposer, onOpenCase, formatDate } from "../shared";

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    };
  }

  noDataFound = () => {
    return (
      <label className="no-data-match-label">No Matching Case Found</label>
    );
  };

  onChangeHandler = (key, e) => {
    e.persist();
    this.setState(
      {
        [key]: e.target.value
      },
      () => this.props.onSearch(this.state.query)
    );
  };

  renderDetails = () => {
    const { searchItems } = this.props;
    return searchItems.map((data, index) => {
      return (
        <div key={index} className="info-card">
          <div className="name-info">
            <h2>{`${data.lastname}, ${data.firstname}`}</h2>
            <p>{formatDate(data.cases[0].doi)}</p>
          </div>
          <div className="card-btn">
            <button
              className="btn open-case-btn"
              onClick={() =>
                onOpenCase(`https://od.casepeer.com/case/${data.cases[0].id}`)
              }
            >
              Open case
            </button>
            <button
              className="btn log-email-btn"
              onClick={() => displayMessageComposer(data.cases[0].id)}
            >
              Log Email
            </button>
          </div>
        </div>
      );
    });
  };

  render() {
    const { searchItems } = this.props;
    return (
      <div className="main-container">
        <div className="login-container">
          <div className="casepeer-header search-container">
            <img src={logo} className="logo" alt="" />
            <img
              src={logout}
              className="logout"
              onClick={() => this.props.onLogout()}
            />
          </div>
          <div className="casepeer-body">
            <div className="field search-field">
              <img src={search} className="field-logo" alt="" />
              <input
                type="text"
                placeholder="Search Name"
                onChange={e => this.onChangeHandler("query", e)}
              />
            </div>
            <div className="search-data-cotnainer">
              {searchItems.length > 0
                ? this.renderDetails()
                : this.noDataFound()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
