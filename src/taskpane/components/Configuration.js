import * as React from "react";
import Login from "./Login";
import SearchScreen from "./SearchScreen";
import SuggestScreen from "./SuggestScreen";
import { Loader } from "./Loader";
import { postUtil, getUtil } from "../../../utils/service";
import axios from "axios";
import { debounce } from "throttle-debounce";

export default class Configuration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(window.localStorage.getItem("user")),
      loader: false,
      errorMsg: "",
      searchResult: [],
      suggestedResult: {}
    };
    this.onSearch = debounce(500, this.onSearch);
  }

  componentDidMount() {
    if (this.state.user !== null) {
      axios.defaults.headers.common.Authorization = `Bearer ${this.state.user.token}`;
    }
  }

  onGoToSearchScreen() {
    this.setState({
      suggestedResult: {}
    });
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.item !== this.props.item && this.state.user !== null) {
      const { item } = nextProps;
      let email = item.initialData
        ? item.initialData.from.address
        : item.from
        ? item.from.emailAddress
        : "";
      const res = await getUtil(`/api/dacase/outlook_ids/?email=${email}`);
      if (res.status === 200 && res.data.length > 0) {
        this.setState({
          suggestedResult: res.data[0]
        });
      } else {
        this.setState({
          suggestedResult: {}
        });
      }
    }
  }

  onSearch = async query => {
  
    if (query !== "") {
      const str = query.includes("@") ? `email=${query}` : `firstname=${query}`;
      const res = await getUtil(`/api/dacase/outlook_ids/?${str}`);
      if (res.status === 200) {
        this.setState({
          searchResult: res.data
        });
      }
    }
  };

  onLogin = async data => {
    this.setState({
      loader: true
    });
    const res = await postUtil("/api-token-auth/", {
      username: data.userName,
      password: data.password
    });
    if (res.status === 200) {
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      window.localStorage.setItem("user", JSON.stringify(res.data));
      this.setState({
        user: res.data,
        searchResult: [],
        loader: false,
        errorMsg: ""
      });
    } else {
      if (res.status === 400) {
        this.setState({
          loader: false,
          errorMsg: res.message
        });
      }
    }
  };

  onLogout = () => {
    window.localStorage.clear();
    this.setState({
      user: null
    });
  };

  render() {
    const {
      user,
      loader,
      suggestedResult,
      searchResult,
      errorMsg
    } = this.state;
    return loader !== true ? (
      user === null ? (
        <Login
          item={this.props.item}
          onSignIn={data => this.onLogin(data)}
          isOfficeInitialized={this.props.isOfficeInitialized}
          errorMsg={errorMsg}
        />
      ) : Object.entries(suggestedResult).length === 0 &&
        suggestedResult.constructor === Object ? (
        <SearchScreen
          onLogout={() => this.onLogout()}
          item={this.props.item}
          searchItems={searchResult}
          onSearch={query => this.onSearch(query)}
        />
      ) : (
        <SuggestScreen
          suggestedResult={suggestedResult}
          onGoToSearchScreen={() => this.onGoToSearchScreen()}
        />
      )
    ) : (
      <Loader />
    );
  }
}





