import * as React from "react";

import { RichTextContent } from "@components/atoms";
import { demoMode } from "@temp/constants";
import { Breadcrumb, Breadcrumbs, MainMenu } from "../../components";

interface PageNavigationElement {
  active: boolean;
  label: string;
  url: string;
}

interface PageProps {
  breadcrumbs: Breadcrumb[];
  headerImage: string | null;
  navigation: PageNavigationElement[];
  page: {
    contentJson: any;
    title: string;
  };
}
export const Page: React.FC<PageProps> = ({
  breadcrumbs,
  headerImage,
  navigation,
  page,
}) => (
  <>
    <MainMenu demoMode={demoMode} whichMenu="fullPage" />
    <div className="article-page">
      <div className="container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="article-page__container">
          <div className="article-page__content">
            <RichTextContent descriptionJson={page.contentJson} />
          </div>
        </div>
      </div>
    </div>
  </>
);
export default Page;
