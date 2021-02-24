import React from "react";

import Wrapper from "./Wrapper";

function LeftMenuFooter() {
  return (
    <Wrapper>
      <div className="poweredBy">
        <h4>poweredBy</h4>
        <a
          key="website"
          href="https://github.com/CofferIsland"
          target="_blank"
          rel="noopener noreferrer"
        >
          CofferIsland
        </a>
      </div>
    </Wrapper>
  );
}

export default LeftMenuFooter;
