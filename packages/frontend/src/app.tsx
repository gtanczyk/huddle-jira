import React, { Suspense } from "react";

const PanelPage =
  process.env["REACT_APP_MOCK"] === "true"
    ? React.lazy(() => import("./pages/mocked-panel-page"))
    : React.lazy(() => import("./pages/panel-page"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PanelPage />
    </Suspense>
  );
}

export default App;
