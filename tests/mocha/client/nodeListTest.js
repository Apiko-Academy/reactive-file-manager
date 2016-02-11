if (! (typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function() {
    describe('Node list component', function() {
      let defProps, renderWithProps, component, el, $el;
      before(function() {
        defProps = {
          list: Files.getFilesByParent(null)
        };

        renderWithProps = function(props) {
          component = renderComponent(NodeList, props);
          el = React.findDOMNode(component);
          $el = $(el);
        };
      });
      it('should be mounted in DOM', function() {
        renderWithProps(defProps);
        chai.expect($el.length).to.equal(1);
      });
    });
  });
}
