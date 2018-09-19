import getHistory from 'app/store/history';

function changeRoute(route) {
  return function () {
    const history = getHistory();
    history.push(route);
  };
}
exports.changeRoute = changeRoute;

function previousRoute() {
  return function () {
    const history = getHistory();
    history.goBack();
  };
}
exports.previousRoute = previousRoute;
