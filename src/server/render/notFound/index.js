import renderApp from '../renderApp';

export default function renderNotFoundPage(req, res, clientStats) {
  // ---> Any fetch and server logic would go here <---
  const initialState = { session: { serverPage: "notFound" } };
  renderApp(req, res, clientStats, initialState)
};