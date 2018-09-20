import getHistory from 'app/store/history';

const changeRoute = (route) => {
  return () => {
    const history = getHistory();
    history.push(route);
  };
};
exports.changeRoute = changeRoute;

const previousRoute = () => {
  return () => {
    const history = getHistory();
    history.goBack();
  };
};
exports.previousRoute = previousRoute;
