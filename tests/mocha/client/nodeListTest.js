if (! (typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function() {
    describe('Node list component', function() {
      let defProps, renderWithProps, component, el, $el;
      before(function() {
        defProps = {
          list: Files.getFilesByParent(null).fetch()
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
      it('should render list of files', function() {
        renderWithProps(defProps);
        let listLength = defProps.list.length;
        chai.expect($('.list-group-item').length).to.equal(listLength);
      });
      it('should render some files', function() {
        renderWithProps(defProps);
        let files = defProps.list.filter((v) => {
          return v.isFile;
        });
        chai.expect($('.fa-file-o').length).to.equal(files.length);
      });
      it('should render some dirs', function() {
        renderWithProps(defProps);
        let dirs = defProps.list.filter((v) => {
          return v.isDirectory;
        });
        chai.expect($('.fa-folder-o').length).to.equal(dirs.length);
      });
    });
  });
}
