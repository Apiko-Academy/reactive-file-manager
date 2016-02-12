if (! (typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function() {
    describe('Content component', function() {
      let defProps, renderWithProps, component, el, $el;
      before(function() {
        defProps = {
          content: 'Test content'
        };

        renderWithProps = function(props) {
          component = renderComponent(Content, props);
          el = React.findDOMNode(component);
          $el = $(el);
        };
      });
      it('should be mounted in DOM', function() {
        renderWithProps(defProps);
        chai.expect($el.length).to.equal(1);
      });
      it('should render content inside pre tag', function() {
        renderWithProps(defProps);
        chai.expect($el.find('pre').html()).to.equal(defProps.content);
      });

    });
  });
}

