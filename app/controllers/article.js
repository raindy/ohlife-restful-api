var mongoose = require('mongoose'),
    Article = mongoose.model("Article"),
    Comment = mongoose.model("Comment"),
    ObjectId = mongoose.Types.ObjectId

exports.showArticles = function(req, res, next) {
    var perPage = 10,
        page = Math.max(0, req.params['page']);
    console.log(page);
    Article.find()
        //.select('name')
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            intime: 'desc'
        })
        .exec(function(err, events) {
            Article.count().exec(function(err, count) {

                res.json({
                    articles: events,
                    page: page,
                    pages: count / perPage
                })
            })
        })
    //Article.find({}, function(err, docs) {
    //    if (!err){
    //        console.log(docs);
    //        res.json({
    //            type: true,
    //            data: docs
    //        })
    //    } else {throw err;}
    //});
}

exports.createArticle = function(req, res, next) {
    var articleModel = new Article(req.body);
    articleModel.save(function(err, article) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json(article)
        }
    })
}

exports.viewArticle = function(req, res, next) {
    Article.findById(new ObjectId(req.params.id), function(err, article) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (article) {
                res.json({
                    type: true,
                    data: article
                })
            } else {
                res.json({
                    type: false,
                    data: "Article: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.viewArticle_v2 = function(req, res, next) {
    Article.findById(new ObjectId(req.params.id), function(err, article) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (article) {
                article.title = article.title + " v2"
                res.json({
                    type: true,
                    data: article
                })
            } else {
                res.json({
                    type: false,
                    data: "Article: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.updateArticle = function(req, res, next) {
    var updatedArticleModel = new Article(req.body);
    Article.findByIdAndUpdate(new ObjectId(req.params.id), updatedArticleModel, function(err, article) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (article) {
                res.json({
                    type: true,
                    data: article
                })
            } else {
                res.json({
                    type: false,
                    data: "Article: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.deleteArticle = function(req, res, next) {
    Article.findByIdAndRemove(new Object(req.params.id), function(err, article) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: "Article: " + req.params.id + " deleted successfully"
            })
        }
    })
}

exports.createArticleComment = function(req, res, next) {
    Article.findOne({_id: new ObjectId(req.params.id)}, function(err, article) {
        if (err) {
            res.json({
               type: false,
                data: "Error occured: " + err
            });
        } else {
            if (article) {
                var commentModel = new Comment(req.body);
                article.comments.push(commentModel);
                article.save(function(err, result) {
                    res.json({
                       type: true,
                        data: result
                    });
                });
            } else {
                res.json({
                    type: false,
                    data: "Article: " + req.params.id + " not found"
                });
            }
        }


    })
}
