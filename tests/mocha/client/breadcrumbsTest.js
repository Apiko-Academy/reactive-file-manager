if (! (typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function() {
    describe('Breadcrumbs component', function() {
      let defProps, renderWithProps, component, el, $el;
      before(function() {
        defProps = {
          filePath: '/test'
        };

        renderWithProps = function(props) {
          component = renderComponent(Breadcrumbs, props);
          el = React.findDOMNode(component);
          $el = $(el);
        };
      });
      it('should be mounted in DOM', function() {
        renderWithProps(defProps);
        chai.expect($el.length).to.equal(1);
      });
      it('should render two list items', function() {
        renderWithProps(defProps);
        chai.expect($('.breadcrumb li').length).to.equal(2);
      });

    });
  });
}
