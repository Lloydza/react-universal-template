import renderApp from '../renderApp';

export default function renderHomePage(req, res, clientStats) {
  // ---> Any fetch and server logic would go here <---
  const initialState = { session: { serverPage: "home" } };
  renderApp(req, res, clientStats, initialState)
};