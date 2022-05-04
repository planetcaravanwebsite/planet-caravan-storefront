import * as React from "react";

import "./scss/index.scss";

class Copyright extends React.PureComponent {
  render() {
    return (
      <div className="container center pad-bottom">
        &copy; 2022 Planet Caravan, Inc., All rights reserved.
      </div>
    );
  }
}

export default Copyright;
