var async = require("async")
  , expect = require("chai").expect
  , check = require(process.cwd() + "/tests").check
  , database = require(process.cwd() + "/tests").database
  , PostServices = require(process.cwd() + "/api/services/PostServices")
  , PostModel = require(process.cwd() + "/api/models/PostModel");

describe("api/services/PostServices", function () {

    before(function (done) {
        PostModel.remove({}, function(err) {
            if (!err) {
                done();
            }
        });
    });

    describe(".findAll()", function () {
        var post = [
            {
                title: "findAll testing 1",
                text: "Aliquam mollis."
            },
            {
                title: "findAll testing 2",
                text: "Enim at consectetur commodo."
            }
        ];

        before(function (done) {
            async.eachSeries(post, function (entry, callback) {
                PostServices
                    .save(entry)
                    .then(function (value) {
                        check(callback, function () {
                            expect(value.title).be.equal(entry.title);
                            expect(value).to.have.property("_id");
                            expect(value).to.have.property("date");
                            expect(value).to.have.property("favorite");
                        });
                    }, function (reason) {
                        done(reason);
                    });
            }, function (err, results) {
                if (err) {
                    done(err);
                } else {
                    done();
                }
            });

        });

        it("should find all posts saved", function (done) {
            PostServices
                .findAll()
                .then(function (value) {
                    check(done, function () {
                        expect(value).to.have.length(2);
                        expect(value[0].title).be.equal("findAll testing 2");
                        expect(value[0].text).be.equal("Enim at consectetur commodo.");
                        expect(value[0]).to.have.property("_id");
                        expect(value[0]).to.have.property("date");
                        expect(value[0]).to.have.property("favorite");
                    });
                }, function (reason) {
                    done(reason);
                });
        });
    });

    describe(".save()", function () {
        it("should save a new post entry", function (done) {
            var post = {
                title: "Donec eleifend sit amet felis quis ultrices. Duis feugiat, lorem amet.",
                text: "Aliquam mollis, enim at consectetur commodo, erat odio tempor diam."
            };

            PostServices
                .save(post)
                .then(function (value) {
                    check(done, function() {
                        expect(value.title).be.equal(post.title);
                        expect(value.text).to.be.equal(post.text);
                        expect(value).to.have.property("_id");
                        expect(value).to.have.property("date");
                        expect(value).to.have.property("favorite");
                    });
                }, function (reason) {
                    done(reason);
                });
        });
    });

    describe(".update()", function () {
        var post = {
                title: "Update testing",
                text: "Duis feugiat, lorem amet."
            }
          , savedPost;

        before(function (done) {
            PostServices
                .save(post)
                .then(function (value) {
                    check(done, function () {
                        expect(value.title).be.equal("Update testing");
                        expect(value.text).be.equal("Duis feugiat, lorem amet.");
                        expect(value).to.have.property("_id");
                        expect(value).to.have.property("date");
                        expect(value).to.have.property("favorite");
                        savedPost = value;
                    });
                }, function (reason) {
                    done(reason);
                });
        });

        it("should update a post entry", function (done) {
            PostServices
                .update(savedPost._id, { title: "Partner let me updrage ya" })
                .then(function (value) {
                    check(done, function () {
                        expect(value._id.toString()).be.equal(savedPost._id.toString());
                        expect(value.title).be.equal("Partner let me updrage ya");
                        expect(value.text).be.equal("Duis feugiat, lorem amet.");
                        expect(value).to.have.property("date");
                        expect(value).to.have.property("favorite");
                    });
                }, function (reason) {
                    done(reason);
                });
        });
    });

    describe(".destroy()", function () {
        var post = {
                title: "Destroy this post",
                text: "Erat odio tempor diam"
            }
          , savedPost;

        before(function (done) {
            PostServices
                .save(post)
                .then(function (value) {
                    check(done, function () {
                        expect(value.title).be.equal("Destroy this post");
                        expect(value.text).be.equal("Erat odio tempor diam");
                        expect(value).to.have.property("_id");
                        expect(value).to.have.property("date");
                        expect(value).to.have.property("favorite");
                        savedPost = value;
                    });
                }, function (reason) {
                    done(reason);
                });
        });

        it("should find all posts saved", function (done) {
            PostServices
                .destroy(savedPost._id)
                .then(function (value) {
                    PostServices
                        .findAll()
                        .then(function (value) {
                            check(done, function () {
                                expect(value).to.have.length(4);
                                value.forEach(function (entry) {
                                    expect(entry).to.have.property("_id");
                                    expect(entry._id.toString()).be.not.equal(savedPost._id.toString());
                                });
                            });
                        }, function (reason) {
                            done(reason);
                        });
                }, function (reason) {
                    done(reason);
                });

            PostServices
                .findAll(savedPost._id, { title: "Partner let me updrage ya" })
                .then(function (value) {

                }, function (reason) {
                    done(reason);
                });
        });
    });

});
