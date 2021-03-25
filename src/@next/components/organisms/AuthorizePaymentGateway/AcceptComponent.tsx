import React from "react";

export enum AuthorizeNetScriptUrl {
  Production = "https://js.authorize.net/v1/Accept.js",
  Sandbox = "https://jstest.authorize.net/v1/Accept.js",
}

export default class AcceptComponent extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = AuthorizeNetScriptUrl.Production;
    // script.src = AuthorizeNetScriptUrl.Sandbox;

    document.head.appendChild(script);
  }

  componentWillUnmount() {
    const { head } = document;
    const scripts = head.getElementsByTagName("script");

    Array.from(scripts)
      .filter(
        script =>
          script.src === AuthorizeNetScriptUrl.Production ||
          script.src === AuthorizeNetScriptUrl.Sandbox
      )
      .forEach(injectedScript => document.head.removeChild(injectedScript));
  }

  render() {
    return <span />;
  }
}
