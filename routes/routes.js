var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models/index.js");

module.exports = function (app) {

    // home
    app.get("/", function (req, res) {
        db.Article.find({
            saved: false
        })
            .then(function (dbArticle) {
                let hbsObject = {
                    articles: dbArticle
                };
                res.render("home", hbsObject);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // scrape website
    app.get("/", function (req, res) {
        db.Article.find({}, function (err, dbArticle) {
            axios.get("http://www.nintendolife.com/reviews")
                .then((res) => {
                    // do something
                    let $ = cheerio.load(response.data);
                    let counter = 0;
                    $("div.cols extended").each(function (i, element) {
                        result.title = $(element).children().text();
                        result.title = $(element).children().media();
                        result.date = $(element).children().date();
                        result.link = $(element).children().attr("href");
                        result.summary = $(element).children().text();
                        let duplicate = false;
                        for (let i = 0; i < dbArticle.length; i++) {
                            if (dbArticle[i].title === result.title) {
                                duplicate = true;
                                break;
                            }
                        }
                        if (!duplicate && result.title && result.link && result.summary) {
                            db.Article.create(result);
                            counter++;
                        }
                    });
                    res.json({
                        count: counter
                    })
                    return axios.get("https://www.avclub.com/c/review/movie-review");
                })
                .then((res) => {
                    // do something
                    let $ = cheerio.load(response.data);
                    let counter = 0;
                    $("div.main__content js_main__content").each(function (i, element) {
                        result.title = $(element).children().text();
                        result.title = $(element).children().media();
                        result.date = $(element).children().date();
                        result.link = $(element).children().attr("href");
                        result.summary = $(element).children().text();
                        let duplicate = false;
                        for (let i = 0; i < dbArticle.length; i++) {
                            if (dbArticle[i].title === result.title) {
                                duplicate = true;
                                break;
                            }
                        }
                        if (!duplicate && result.title && result.link && result.summary) {
                            db.Article.create(result);
                            counter++;
                        }
                    });
                    res.json({
                        count: counter
                    })
                })
                .catch((err) => {
                    // handle err
                });
        })
    })


    // save
    app.get("/saved", function (req, res) {
        db.Article.find({
            saved: true
        })
            .then(function (dbArticle) {
                let hbsObject = {
                    articles: dbArticle
                };
                res.render("saved", hbsObject);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // notes
    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({
            _id: req.params.id
        })
            .populate("notes")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // find
    app.post("/articles/:id", function (req, res) {
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Article.findByIdAndUpdate({
                    _id: req.params.id
                }, {
                        $push: {
                            notes: dbNote._id
                        }
                    }, {
                        new: true
                    });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // save article
    app.post("/savearticle/:id", function (req, res) {
        db.Article.findByIdAndUpdate({
            _id: req.params.id
        }, {
                saved: true
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            })
    });

    // delete article
    app.post("/deletearticle/:id", function (req, res) {
        db.Article.findByIdAndUpdate({
            _id: req.params.id
        }, {
                saved: false
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            })
    });

    // search article
    app.post("/searcharticle/:id", function (req, res) {
        db.Article.findByIdAndUpdate({
            _id: req.params.id
        }, {
                saved: true
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            })
    });

    // search notes
    app.post("/searchnote/:id", function (req, res) {
        db.Article.findByIdAndUpdate({
            _id: req.params.id
        }, {
                saved: true
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            })
    });

    // delete note
    app.post("/deletenote/:id", function (req, res) {
        db.Note.remove({
            _id: req.params.id
        })
            .then(function (dbNote) {
                res.json(dbNote);
            })
            .catch(function (err) {
                res.json(err);
            })
    });

    // clear database
    app.get("/cleardb", function (req, res) {
        db.Article.remove({})
            .then(function () {
                res.send("Cleared!");
            })
            .catch(function (err) {
                res.json(err);
            })
    });
}