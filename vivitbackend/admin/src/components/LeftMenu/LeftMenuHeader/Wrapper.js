import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import Logo from "../../../assets/images/logo05.png";

const Wrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.main.colors.vivitD.sandyBrown};
    height: ${theme.main.sizes.leftMenu.height};

    .projectName {
      display: block;
      height: ${theme.main.sizes.leftMenu.height};
      background-image: url(${Logo});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 12rem;
    }
  `}
`;

export default Wrapper;
