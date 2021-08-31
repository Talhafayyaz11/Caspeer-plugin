import * as React from "react";
import Configuration from "./Configuration";

export default class App extends React.Component {
  componentDidMount() {}
  render() {
    const { title, isOfficeInitialized, item } = this.props;

    // if (!isOfficeInitialized) {
    //   return (
    //     <Progress
    //       title={title}
    //       logo="assets/logo-filled.png"
    //       message="Please sideload your addin to see app body."
    //     />
    //   );
    // }

    return (
      <div className="ms-welcome">
        <Configuration item={item} isOfficeInitialized={isOfficeInitialized} />
      </div>
    );
  }
}
