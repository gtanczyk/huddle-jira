import React, { Suspense } from "react";

import ProgressBar from "@atlaskit/progress-bar";

import ScreenSharingPage from "./pages/screen-sharing-page";
import ScreenWatchingPage from "./pages/screen-watching-page";

const PanelPage =
  process.env["REACT_APP_MOCK"] === "true"
    ? React.lazy(() => import("./pages/mocked-panel-page"))
    : React.lazy(() => import("./pages/panel-page"));

function App() {
  const Page = () =>
    document.location.hash.startsWith("#screenSharing") ? (
      <ScreenSharingPage />
    ) : document.location.hash.startsWith("#screenWatching") ? (
      <ScreenWatchingPage />
    ) : (
      <PanelPage />
    );

  return (
    <Suspense fallback={<ProgressBar isIndeterminate />}>
      <Page />
    </Suspense>
  );
}

export default App;
