const {
    Router,
    Route
    } = ReactRouter;

const createHistory = ReactRouter.history.createHistory;

const routes = (
    <Route path="/*" component={App}>
    </Route>
);

const router = (
    <Router history={createHistory()}>
        {routes}
    </Router>);

Meteor.startup(function () {
    ReactDOM.render(router, document.getElementById("app-container"));
});