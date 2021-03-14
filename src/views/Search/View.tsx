import * as React from "react";
import { RouteComponentProps } from "react-router";

import { StringParam, useQueryParam } from "use-query-params";
import Page from "./Page";

type ViewProps = RouteComponentProps<{
  id: string;
}>;

export const View: React.FC<ViewProps> = ({ match }) => {
  const [search] = useQueryParam("q", StringParam);

  return <Page search={search} />;
};

export default View;
