import * as React from "react";
import logo from "../../../../assets/logo.png";
import user from "../../../../assets/user.png";
import lock from "../../../../assets/lock.png";
import FormValidator from "../validator";
import { Warning } from "../Warning";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: "userName",
        method: "isEmpty",
        validWhen: false,
        message: "Username is required"
      },
      {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: "Password is required"
      }
    ]);

    this.state = {
      userName: "outlooktest",
      password: "outlooktesting",
      validation: this.validator.valid()
    };
  }

  onChangeHandler = (key, e) => {
    e.persist();
    this.setState({
      [key]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { userName, password } = this.state;
    const data = {
      userName,
      password
    };
    const validation = this.validator.validate(data);
    this.setState({ validation });
    if (validation.isValid) {
      this.props.onSignIn(this.state);
    }
  };

  render() {
    const { validation, password, userName } = this.state;
    const { item, isOfficeInitialized, errorMsg } = this.props;
    let name = "";
    let email = "";
    if (
      item.initialData &&
      Office.context.mailbox._userProfile$p$0.emailAddress.toLowerCase() ==
        item.initialData.from.address.toLowerCase()
    ) {
      name = item.initialData.to[0].name;
      email = item.initialData.to[0].address;
    } else {
      name = item.initialData
        ? item.initialData.from.name
        : item.from
        ? item.from.displayName
        : "";
      email = item.initialData
        ? item.initialData.from.address
        : item.from
        ? item.from.emailAddress
        : "";
    }
    return (
      <div className="main-container">
        <div className="login-container">
          <div className="casepeer-header">
            <img src={logo} className="logo" alt="" />
          </div>
          <div className="casepeer-body">
            <h1>Sign In</h1>
            <form>
              <div className="field">
                <img src={user} className="field-logo" alt="" />
                <input
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={e => this.onChangeHandler("userName", e)}
                  autoFocus
                />
              </div>
              {validation.userName.isInvalid && (
                <Warning message={validation.userName.message} />
              )}
              <div className="field">
                <img src={lock} className="field-logo" alt="" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => this.onChangeHandler("password", e)}
                />
              </div>
              {validation.password.isInvalid && (
                <Warning message={validation.password.message} />
              )}
              {errorMsg !== "" && <Warning message={errorMsg} />}
              <button
                type="submit"
                className="btn submit-btn"
                onClick={e => this.onSubmit(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
