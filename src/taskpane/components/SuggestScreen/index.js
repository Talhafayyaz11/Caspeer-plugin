import * as React from "react";
import logo from "../../../../assets/logo.png";
import headerSearch from "../../../../assets/header-search.png";
import { displayMessageComposer, onOpenCase, formatDate } from "../shared";

export default class Suggest extends React.Component {
  render() {
    const { suggestedResult, onGoToSearchScreen } = this.props;
    const suggestedCase = suggestedResult.cases[0];
    const description =
      suggestedResult.cases[0].incident__description !== ""
        ? suggestedResult.cases[0].incident__description
        : "Not mentioned";
    const injuries =
      suggestedResult.cases[0].injuries__current !== ""
        ? suggestedResult.cases[0].injuries__current
        : "Not mentioned";
    return (
      <div className="main-container">
        <div className="login-container">
          <div className="casepeer-header search-container">
            <img src={logo} className="logo" alt="" />
            <img src={headerSearch} onClick={() => onGoToSearchScreen()} />
          </div>
          <div className="casepeer-body Suggest-case">
            <h1>Suggested Case - Select case</h1>
            <div className="info-card suggest-card">
              <div className="name-info">
                <h2>{`${suggestedResult.lastname}, ${suggestedResult.firstname}`}</h2>
                <p>{formatDate(suggestedResult.cases[0].doi)}</p>
              </div>
              <div className="card-btn">
                <button
                  className="btn open-case-btn"
                  onClick={() =>
                    onOpenCase(
                      `https://od.casepeer.com/case/${suggestedResult.cases[0].id}`
                    )
                  }
                >
                  Open case
                </button>
                <button
                  className="btn log-email-btn"
                  onClick={() =>
                    displayMessageComposer(suggestedResult.cases[0].id)
                  }
                >
                  Log Email
                </button>
              </div>
            </div>
            <div className="suggest-body">
              <div className="suggest-case-type">
                <div className="case-type">
                  <h3>Case type</h3>
                  <p>{suggestedCase.casetype__name}</p>
                </div>
                <div className="file-number">
                  <h3>File number</h3>
                  <p>{suggestedCase.firm_file_number}</p>
                </div>
              </div>
              <div className="suggest-content">
                <h3>Case Number</h3>
                <p>{suggestedCase.id}</p>
              </div>
              <div className="suggest-content">
                <h3>Case Description</h3>
                <p>{description}</p>
              </div>
              <div className="suggest-content">
                <h3>Current Injuries</h3>
                <p>{injuries}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
