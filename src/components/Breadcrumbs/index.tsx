import classNames from "classnames";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";
import { Link, useHistory } from "react-router-dom";
import { commonMessages } from "@temp/intl";

import { baseUrl } from "../../app/routes";
import { getDBIdFromGraphqlId, slugify } from "../../core/utils";
import { Category_category } from "../../views/Category/gqlTypes/Category";

import { smallScreen } from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

export interface Breadcrumb {
  value: string;
  link: string;
  id?: string;
}

export const extractBreadcrumbs = (category: Category_category) => {
  const constructLink = item => ({
    link: [
      `/category`,
      `/${slugify(item.name)}`,
      `/${getDBIdFromGraphqlId(item.id, "Category")}/`,
    ].join(""),
    value: item.name,
  });

  let breadcrumbs = [constructLink(category)];

  if (category.ancestors.edges.length) {
    const ancestorsList = category.ancestors.edges.map(edge =>
      constructLink(edge.node)
    );
    breadcrumbs = ancestorsList.concat(breadcrumbs);
  }
  return breadcrumbs;
};

/* const getBackLink = (breadcrumbs: Breadcrumb[]) =>
  breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].link : "/"; */

const Breadcrumbs: React.FC<{
  breadcrumbs: Breadcrumb[];
}> = ({ breadcrumbs }) => {
  const history = useHistory();
  return (
    <div className="breadcrumb__wrapper">
      {breadcrumbs.map((breadcrumb, index) =>
        breadcrumb.id ? (
          <button
            className="button-arrow-breadcrumb"
            data-testid="main-button"
            aria-label="Floating menu"
            onClick={() => {
              history.goBack();
            }}
          >
            &larr;
          </button>
        ) : (
          <></>
        )
      )}

      <Media
        query={{
          minWidth: smallScreen,
        }}
      >
        {matches =>
          matches ? (
            <ul className="breadcrumbs">
              <li>
                <Link to={baseUrl}>
                  <FormattedMessage {...commonMessages.home} />
                </Link>
              </li>
              {breadcrumbs.map((breadcrumb, index) => (
                <li
                  key={breadcrumb.value}
                  className={classNames({
                    breadcrumbs__active: index === breadcrumbs.length - 1,
                  })}
                >
                  {breadcrumb.id ? (
                    <Link to={`${breadcrumb.link}#${breadcrumb.id}`}>
                      {breadcrumb.value}
                    </Link>
                  ) : (
                    <Link to={`${breadcrumb.link}`}>{breadcrumb.value}</Link>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="breadcrumbs">
              <li>
                <Link to={baseUrl}>
                  <FormattedMessage {...commonMessages.home} />
                </Link>
              </li>
              {breadcrumbs.map((breadcrumb, index) => (
                <li
                  key={breadcrumb.value}
                  className={classNames({
                    breadcrumbs__active: index === breadcrumbs.length - 1,
                  })}
                >
                  <Link to={breadcrumb.link}>{breadcrumb.value}</Link>
                </li>
              ))}
            </ul>
          )
        }
      </Media>
    </div>
  );
};

export default Breadcrumbs;
