if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Server initialization", function(){
      it("should insert files into the database after server start", function(){
        chai.assert(Files.find().count() > 0);
      });

    });
  });
}
