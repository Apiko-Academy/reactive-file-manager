TestUtils = React.addons.TestUtils;

// returns rendered react component
renderComponent = function (comp, props) {
  return TestUtils.renderIntoDocument(
    React.createElement(comp, props)
  );
};