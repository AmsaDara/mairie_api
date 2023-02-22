const express = require('express');
const router = express.Router();
const Article = require('../db/models/article.schema');
const blogService = require('../services/blog.service')(Article);
const validateUser= require('../helpers/user.validations').validateUser

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Utilisateur Valider'});
});

router.post('/article', async(req,res,next)=>{
  const {... _blog}=req.body;
  try {
    let reponse = await blogService.article(_blog);
    res.json(reponse);
  } catch (error) {
    next(error)
  }
})

router.get('/allArticle',validateUser, async(req,res,next)=>{
  try {
    let reponse = await blogService.getAllArticle();
    res.json(reponse);
  } catch (error) {
    next(error)
  }
})

router.get('/featuredArticle', async function(req,res,next) {
  try {
    let reponse = await blogService.getFeaturedArticle();
    res.json(reponse);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async function(req, res, next) {
  console.log(req.params.id);
    try {
        let response = await blogService.articleId(req.params.id);
        res.json(response);
      } catch (error) {
        next(error)
      }
});

module.exports = router;
