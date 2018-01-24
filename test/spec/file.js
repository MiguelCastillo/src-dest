import { expect } from "chai";
import Chance from "chance";
import File from "../../index";
import path from "path";

var chance = new Chance();

describe("File unit test", function() {
  var act, result, options;

  beforeEach(function() {
    act = () => result = new File(options);
  });

  describe("When creating a File with no options", function() {
    beforeEach(function() {
      options = null;
      act();
    });

    it("then the file has no destination", function() {
      expect(result.dest).to.be.null;
    });

    it("then the file has an empty src", function() {
      expect(result.src).to.be.empty;
    });

    it("then the current directory contains src-dest", function() {
      expect(result.cwd).to.contain("/src-dest");
    });
  });

  describe("When creating a File with content", function() {
    const fileContent = "console.log('hello world')";

    beforeEach(function() {
      options = [{
        content: fileContent
      }];
      act();
    });

    it("then the file has one source item", function() {
      expect(result.src).to.have.lengthOf(1);
    });

    it("then the current directory contains src-dest", function() {
      expect(result.cwd).to.contain("/src-dest");
    });

    it("then the file content is what the file was configured with", function() {
      expect(result.src[0].content).to.equal(fileContent);
    });
  });

  describe("When creating a File with a path", function() {
    const filePath = "./some-random/path.js";

    beforeEach(function() {
      options = [{
        path: filePath
      }];
      act();
    });

    it("then the file has no items in source", function() {
      expect(result.src).to.have.lengthOf(1);
    });

    it("then the current directory contains src-dest", function() {
      expect(result.cwd).to.contain("/src-dest");
    });

    it("then the file path is what the file was configured with", function() {
      expect(result.src[0].path).to.equal(filePath);
    });
  });

  describe("When creating a File with only a string as the input", function() {
    beforeEach(function() {
      options = "test/spec/file.js";
      act();
    });

    it("then the file has one item in source", function() {
      expect(result.src).to.have.lengthOf(1);
    });

    it("then the source item is a path that contains the input", function() {
      expect(result.src[0]).to.contain("src-dest/test/spec/file.js");
    });

    it("then the current directory contains src-dest", function() {
      expect(result.cwd).to.contain("/src-dest");
    });
  });

  describe("When creating a File with two strings and an objecr with content as the input", function() {
    const fileContent = "console.log('hello world')";

    beforeEach(function() {
      options = ["./index.js", "test/spec/file.js", { content: fileContent }];
      act();
    });

    it("then the file has two items in source", function() {
      expect(result.src).to.have.lengthOf(3);
    });

    it("then the first source item is a path that contains the input", function() {
      expect(result.src[0]).to.contain("src-dest/index.js");
    });

    it("then the second source item is a path that contains the input", function() {
      expect(result.src[1]).to.contain("src-dest/test/spec/file.js");
    });

    it("then the third source item is the content", function() {
      expect(result.src[2].content).to.equal(fileContent);
    });

    it("then the current directory contains src-dest", function() {
      expect(result.cwd).to.contain("/src-dest");
    });
  });

  describe("When creating a File with two src strings in a configuration object", function() {
    beforeEach(function() {
      options = {
        src: ["./index.js", "test/spec/file.js"]
      };

      act();
    });

    it("then the file has two items in source", function() {
      expect(result.src).to.have.lengthOf(2);
    });

    it("then the first source item is a path that contains the input", function() {
      expect(result.src[0]).to.contain("src-dest/index.js");
    });

    it("then the second source item is a path that contains the input", function() {
      expect(result.src[1]).to.contain("src-dest/test/spec/file.js");
    });

    it("then the current directory contains src-dest", function() {
      expect(result.cwd).to.contain("/src-dest");
    });
  });

  describe("When creating a File with a glob src in a configuration object", function() {
    beforeEach(function() {
      options = {
        src: ["*.js", "test/testfiles/**/*.js"]
      };

      act();
    });

    it("then the file has three items in source", function() {
      expect(result.src).to.have.lengthOf(3);
    });

    it("then the first source item is a path that contains the input", function() {
      expect(result.src[0]).to.contain("src-dest/index.js");
    });

    it("then the second source item is a path that contains the input", function() {
      expect(result.src[1]).to.contain("src-dest/test/testfiles/deep/file2.js");
    });

    it("then the third source item is a path that contains the input", function() {
      expect(result.src[2]).to.contain("src-dest/test/testfiles/file1.js");
    });

    it("then the current directory contains src-dest", function() {
      expect(result.cwd).to.contain("/src-dest");
    });
  });

  describe("When creating a File with a dest in a configuration object", function() {
    beforeEach(function() {
      options = {
        dest: "newfile.js"
      };

      act();
    });

    it("then the file has no items in source", function() {
      expect(result.src).to.have.lengthOf(0);
    });

    it("then the file has a dest with newfile.js", function() {
      expect(result.dest).to.contain("/src-dest/newfile.js");
    });

    it("then the current directory contains src-dest", function() {
      expect(result.cwd).to.contain("/src-dest");
    });
  });

  describe("When creating a File with a CWD", function() {
    describe("And cwd is an absolute path", function() {
      var cwd;

      beforeEach(function() {
        cwd = "/" + chance.string();
        options = {
          cwd: cwd
        };

        act();
      });

      it("then file.cwd matches the configured cwd", function() {
        expect(result.cwd).to.equal(cwd);
      });
    });

    describe("And cwd is a realtive path", function() {
      var cwd;

      beforeEach(function() {
        cwd = "./" + chance.string();
        options = {
          cwd: cwd
        };

        act();
      });

      it("then file.cwd has process.cwd() as the base", function() {
        expect(result.cwd).to.equal(path.join(process.cwd(), cwd));
      });
    });
  });
});
