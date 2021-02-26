import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import { CartPage, CheckoutPage, PasswordReset, ThankYouPage } from "@pages";
import { CheckoutLogin, NotFound } from "../../components";
import UserAccount, * as accountPaths from "../../userAccount/routes";
import { OrderDetails } from "../../userAccount/views";
import { Account, AccountConfirm } from "../../views/Account";
import { ArticlePage } from "../../views/Article";
import { StaticPage } from "../../views/Static";
import { CategoryPage } from "../../views/Category";
import { CollectionPage } from "../../views/Collection";
import { HomePage } from "../../views/Home";
import { ProductPage } from "../../views/Product";
import { SearchPage } from "../../views/Search";

import * as paths from "./paths";

const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      returnTo: args.path,
    })}
    {...args}
  />
);

export const Routes: React.FC = () => (
  <Switch>
    <PrivateRoute exact path={paths.baseUrl} component={HomePage} />
    <PrivateRoute path={paths.searchUrl} component={SearchPage} />
    <PrivateRoute path={paths.categoryUrl} component={CategoryPage} />
    <PrivateRoute path={paths.collectionUrl} component={CollectionPage} />
    <Route path={paths.productUrl} component={ProductPage} />
    <PrivateRoute path={paths.cartUrl} component={CartPage} />
    <PrivateRoute path={paths.checkoutLoginUrl} component={CheckoutLogin} />
    <PrivateRoute path={paths.pageUrl} component={ArticlePage} />
    <PrivateRoute path={paths.staticUrl} component={StaticPage} />
    <PrivateRoute path={accountPaths.baseUrl} component={UserAccount} />
    <PrivateRoute
      path={accountPaths.userOrderDetailsUrl}
      component={OrderDetails}
    />
    <PrivateRoute path={paths.guestOrderDetailsUrl} component={OrderDetails} />
    <PrivateRoute path={paths.accountUrl} component={Account} />
    <PrivateRoute path={paths.accountConfirmUrl} component={AccountConfirm} />
    <PrivateRoute path={paths.orderHistoryUrl} component={Account} />
    <PrivateRoute path={paths.addressBookUrl} component={Account} />
    <PrivateRoute path={paths.passwordResetUrl} component={PasswordReset} />
    <PrivateRoute path={paths.checkoutUrl} component={CheckoutPage} />
    <PrivateRoute path={paths.orderFinalizedUrl} component={ThankYouPage} />
    <PrivateRoute component={NotFound} />
  </Switch>
);

export default Routes;
