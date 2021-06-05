import React, { memo, useMemo } from "react";
import { FormattedMessage } from "react-intl";

import { LoadingIndicatorPage } from "strapi-helper-plugin";
import PageTitle from "../../components/PageTitle";
import { useModels } from "../../hooks";

import useFetch from "./hooks";
import {
  ALink,
  Block,
  Container,
  LinkWrapper,
  P,
  Separator,
} from "./components";
import BlogPost from "./BlogPost";
import SocialLink from "./SocialLink";

const FIRST_BLOCK_LINKS = [
  {
    link:
      "google.com",
    contentId: "app.components.BlockLink.documentation.content",
    titleId: "app.components.BlockLink.documentation",
  },
  {
    link: "google.com",
    contentId: "app.components.BlockLink.code.content",
    titleId: "app.components.BlockLink.code",
  },
];

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    link: "https://github.com/diogens/",
  },
  {
    name: "CofferIsland",
    link: "https://github.com/CofferIsland",
  },
  {
    name: "Twitter",
    link: "https://twitter.com/Hemoba",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/hemobaoficial/",
  }
];

const HomePage = () => {
  // Temporary until we develop the menu API
  const {
    collectionTypes,
    singleTypes,
    isLoading: isLoadingForModels,
  } = useModels();

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  return (
    <>
      <FormattedMessage id="HomePage.helmet.title">
        {(title) => <PageTitle title={title} />}
      </FormattedMessage>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <Block>
              <h2 id="mainHeader">Bem vindo ao <b>VIVIT</b></h2>
              <P>
               ...... descrição para o projeto....
              </P>

              <Separator style={{ marginTop: 37, marginBottom: 36 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ background: 'tomato', width: 200, height: 100 }}>
                  <p>Grafico 1</p>
                </div>
                <div style={{ background: 'green', width: 200, height: 100 }}>
                  <p>Grafico 2</p>
                </div>
              </div>
            </Block>
          </div>

          <div className="col-md-12 col-lg-4">
            <Block style={{ paddingRight: 30, paddingBottom: 0 }}>
              <h2>Veja nosso links</h2>
              <Separator style={{ marginTop: 18 }} />
              <div
                className="row social-wrapper"
                style={{
                  display: "flex",
                  margin: 0,
                  marginTop: 36,
                  marginLeft: -15,
                }}
              >
                {SOCIAL_LINKS.map((value, key) => (
                  <SocialLink key={key} {...value} />
                ))}
              </div>
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
