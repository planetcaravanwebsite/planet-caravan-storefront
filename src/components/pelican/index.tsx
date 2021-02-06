import React from "react";

const API_URL = process.env.API_URI || "/graphql/";

export class Pelican extends React.Component {
  state = {
    isFetched: false,
    pelicanData: {
      products: {
        edges: [
          {
            node: {
              id: {},
              name: {},
              pricing: {
                priceRange: {
                  start: {
                    net: {
                      amount: {},
                    },
                  },
                },
              },
              variants: [
                {
                  id: {},
                  name: {},
                },
              ],
            },
          },
        ],
      },
    },
  };

  async componentDidMount() {
    const pelicanData = await this.queryData();
    this.setState({ pelicanData });
    this.setState({ isFetched: true });
  }

  queryData = async () => {
    const query = JSON.stringify({
      query: `
      {
    products(first: 1, filter: { search: "pelican" }) {
      edges {
        node {
          id
          name
          thumbnail(size: 100) {
            url
            alt
          }
          pricing {
            priceRange {
              start {
                net {
                  amount
                }
              }
            }
          }
          variants {
            id
            name
          }
        }
      }
    }
  }
    `,
    });

    const response = await fetch(API_URL, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: query,
    });

    const responseJson = await response.json();
    console.log(responseJson.data);
    console.log(responseJson.data.products.edges[0].node.name);
    return responseJson.data;
  };

  render() {
    const { pelicanData, isFetched } = this.state;

    if (!isFetched) {
      return null;
    }
    return (
      <div>{pelicanData.products.edges[0].node.name}</div>
    );
  }
}
