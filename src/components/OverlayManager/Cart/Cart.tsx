import "./scss/index.scss";

import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { useState, useEffect } from "react";

import { TaxedMoney } from "@components/containers";
import { commonMessages } from "@temp/intl";
import { useAuth, useCart, useCheckout } from "@saleor/sdk";

import styled from "styled-components";

import { find } from "lodash";
import {
  Button,
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface,
} from "../..";
import { checkoutLoginUrl, checkoutUrl } from "../../../app/routes";
import Loader from "../../Loader";
import Empty from "./Empty";
import ProductList from "./ProductList";

// import cartImg from "../../../images/cart.svg";
import cartImg from "../../../images/noun_cart.svg";
import closeImg from "../../../images/x.svg";

class Modal extends React.Component {
  StyledModal = styled.div`
    background-color: #002646;
    z-index: 100;
    color: white;
    position: fixed;
    height: 100vh;
    width: 100vw;
  `;

  Content = styled.div`
    text-align: center;
    width: 100%;
    margin-top: 30vh;
  `;

  Button = styled.button`
    background: #66b1e1;
    border: 0;
    padding: 20px 40px;
    color: #fff;
    font-size: 1rem;
    letter-spacing: 1px;
    margin: 20px;
  `;

  H1 = styled.h1`
    font-family: Yukarimobile;
    font-size: 2rem;
    margin-bottom: 20px;
  `;

  // @ts-ignore
  pelicanSize = find(this.props.data, function (o) {
    // @ts-ignore
    return o.key === "PELICAN_SIZE";
  });

  // @ts-ignore
  pelicanUrl = find(this.props.data, function (o) {
    // @ts-ignore
    return o.key === "CROSS_SELL_URL";
  });

  shownPelicanUpsell: string;

  onClose = e => {
    // @ts-ignore
    if (this.props.item) {
      // @ts-ignore
      sessionStorage[`shown-pelican-upsell-${this.props.item.variant.id}`] =
        "true";
    }
    // @ts-ignore
    this.props.onClose(e);
  };

  render() {
    // @ts-ignore
    if (!this.props.item) {
      return null;
    }

    this.shownPelicanUpsell =
      // @ts-ignore
      sessionStorage[`shown-pelican-upsell-${this.props.item.variant.id}`];

    if (this.shownPelicanUpsell === "true") {
      return null;
    }

    // @ts-ignore
    this.pelicanSize = find(this.props.data, function (o) {
      // @ts-ignore
      return o.key === "PELICAN_SIZE";
    });

    // @ts-ignore
    this.pelicanUrl = find(this.props.data, function (o) {
      // @ts-ignore
      return o.key === "CROSS_SELL_URL";
    });

    // @ts-ignore
    if (!this.props.show) {
      return null;
    }

    // @ts-ignore
    if (!this.props.data) {
      return null;
    }

    return (
      <this.StyledModal id="hero-pelican">
        <this.Content>
          <this.H1>WOULD YOU LIKE TO ADD A PELICAN?</this.H1>
          <p>Our recommended size is {this.pelicanSize.value}.</p>
          <Link to={this.pelicanUrl.value}>
            <this.Button onClick={this.onClose}>Yes, I Would</this.Button>
          </Link>
          <div style={{ cursor: "pointer" }} onClick={this.onClose}>
            Nope
          </div>
        </this.Content>
      </this.StyledModal>
    );
  }
}

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const { user } = useAuth();
  const { checkout } = useCheckout();
  const {
    items,
    removeItem,
    subtotalPrice,
    shippingPrice,
    discount,
    totalPrice,
    loaded,
  } = useCart();

  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  const missingVariants = () => {
    return items.find(item => !item.variant || !item.totalPrice);
  };

  const itemsQuantity =
    items?.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0) || 0;

  const [isFetched, setIsFetched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pelicanProduct, setPelicanProduct] = useState(false);

  const API_URL = process.env.API_URI || "/graphql/";

  const queryData = async () => {
    const query = JSON.stringify({
      query: `
        {
          productVariant(id: "${items[0].variant.id}") {
            product {
              metadata {
                key
                value
              }
            }
          }
    }
    `,
    });

    const response = await fetch(API_URL, {
      headers: { "content-type": "application/json" },
      method: "POST",
      // @ts-ignore
      body: query,
    });

    const responseJson = await response.json();
    return responseJson.data;
  };

  // @ts-ignore
  const fetchData = async () => {
    const res = await queryData();
    // @ts-ignore
    const foundUpsell = find(res.productVariant.product.metadata, function (o) {
      // @ts-ignore
      return o.key === "CROSS_SELL" && o.value === "True";
    });
    if (foundUpsell) {
      setShowModal(true);
      setPelicanProduct(res.productVariant.product.metadata);
    }
  };

  // @ts-ignore
  useEffect(() => {
    let mounted = true;
    fetchData().then(r => {
      if (mounted) {
        setIsFetched(true);
      }
    });
    // eslint-disable-next-line no-return-assign
    return () => (mounted = false);
  }, [isFetched, loaded]);

  const onShowModal = e => {
    setShowModal(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <>
      <Modal
        // @ts-ignore
        onClose={onShowModal}
        show={showModal}
        data={pelicanProduct}
        item={items[0]}
      >
        Message in Modal
      </Modal>
      <Overlay testingContext="cartOverlay" context={overlay}>
        <Online>
          <div className="cart">
            <div className="overlay__header">
              <ReactSVG path={cartImg} className="overlay__header__cart-icon" />
              <div className="overlay__header-text">
                <FormattedMessage defaultMessage="My cart," />{" "}
                <span className="overlay__header-text-items">
                  <FormattedMessage
                    defaultMessage="{itemsQuantity,plural,one{{itemsQuantity} item} other{{itemsQuantity} items}}"
                    description="items quantity in cart"
                    values={{
                      itemsQuantity,
                    }}
                  />
                </span>
              </div>
              <ReactSVG
                path={closeImg}
                onClick={overlay.hide}
                className="overlay__header__close-icon"
              />
            </div>
            {items?.length ? (
              <>
                {missingVariants() ? (
                  <Loader full />
                ) : (
                  <>
                    <ProductList lines={items} remove={removeItem} />
                    <div className="cart__footer">
                      <div className="cart__footer__price">
                        <span>
                          <FormattedMessage {...commonMessages.subtotal} />
                        </span>
                        <span>
                          <TaxedMoney
                            data-test="subtotalPrice"
                            taxedMoney={subtotalPrice}
                          />
                        </span>
                      </div>

                      {shippingTaxedPrice &&
                        shippingTaxedPrice.gross.amount !== 0 && (
                          <div className="cart__footer__price">
                            <span>
                              <FormattedMessage {...commonMessages.shipping} />
                            </span>
                            <span>
                              <TaxedMoney
                                data-test="shippingPrice"
                                taxedMoney={shippingTaxedPrice}
                              />
                            </span>
                          </div>
                        )}

                      {promoTaxedPrice && promoTaxedPrice.gross.amount !== 0 && (
                        <div className="cart__footer__price">
                          <span>
                            <FormattedMessage {...commonMessages.promoCode} />
                          </span>
                          <span>
                            <TaxedMoney
                              data-test="promoCodePrice"
                              taxedMoney={promoTaxedPrice}
                            />
                          </span>
                        </div>
                      )}

                      <div className="cart__footer__price">
                        <span>
                          <FormattedMessage {...commonMessages.total} />
                        </span>
                        <span>
                          <TaxedMoney
                            data-test="totalPrice"
                            taxedMoney={totalPrice}
                          />
                        </span>
                      </div>

                      <div className="cart__footer__button">
                        <Button
                          testingContext="gotoBagViewButton"
                          onClick={overlay.hide}
                        >
                          <FormattedMessage defaultMessage="Continue Shopping" />
                        </Button>
                      </div>
                      <div className="cart__footer__button">
                        <Link to={user ? checkoutUrl : checkoutLoginUrl}>
                          <Button testingContext="gotoCheckoutButton">
                            <FormattedMessage {...commonMessages.checkout} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <Empty overlayHide={overlay.hide} />
            )}
          </div>
        </Online>
        <Offline>
          <div className="cart">
            <OfflinePlaceholder />
          </div>
        </Offline>
      </Overlay>
    </>
  );
};

export default Cart;
