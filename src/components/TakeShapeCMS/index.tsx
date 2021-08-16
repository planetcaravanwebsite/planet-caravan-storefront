import * as React from "react";
// import { RouteComponentProps, withRouter } from "react-router-dom";
import "./scss/index.scss";

// @ts-ignore
export default class TakeShapeCMS extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchData() {
    try {
      const result = await fetch(process.env.TAKESHAPE_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TAKESHAPE_KEY}`,
        },
        body: JSON.stringify({
          query: "query {getPostList{items{bodyHtml}}}",
        }),
      });
      const { data } = await result.json();

      const fetchedList = data.getProductList.items.map(item => (
        <li key={item._id}>
          <em>{item.name}</em>: {item.price}
        </li>
      ));

      return fetchedList;
    } catch (error) {
      console.log("Failed to get products!", error);
    }
  }

  render() {
    console.log("here we are");

    return (
      <>
        <div>Okay!</div>
      </>
    );
  }
}
