import React, { Suspense } from "react";

import ProgressBar from "@atlaskit/progress-bar";

const PanelPage =
  process.env["REACT_APP_MOCK"] === "true"
    ? React.lazy(() => import("./pages/mocked-panel-page"))
    : React.lazy(() => import("./pages/panel-page"));

function App() {
  return (
    <Suspense fallback={<ProgressBar isIndeterminate />}>
      <PanelPage />
    </Suspense>
  );
}

export default App;
