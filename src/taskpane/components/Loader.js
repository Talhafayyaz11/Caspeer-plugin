import * as React from "react";
import { Spinner, SpinnerType } from "office-ui-fabric-react";

export const Loader = () => (
  <div className="loader-container">
    <Spinner type={SpinnerType.large} label="Loading ..." />
  </div>
);
