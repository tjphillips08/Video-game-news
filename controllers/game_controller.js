const express= require('express');
const router = express.Router();
const methodOverride = (require('method-override'))

//Middleware: will have express json and url encoded eventually
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(methodOverride('_method'))

//Model import here
const db = require('../models')


//Routes will be here

// privacypolicy
router.get('/privacy_policy', (req, res) => {
    res.render("privacy_policy")
});

// aboutus
router.get('/about_us', (req, res) => {
    res.render('aboutus.ejs')
})
//go to news route
router.get("/news", (req, res) => {
    res.render("thenews.ejs")
});

//POST new game
router.post('/', async (req, res) => {
    
    try{
        const newPost = await db.Games.create(req.body);
        // console.log(newPost)
        res.redirect('/games')
    
    } catch (err) {
        console.log(err)
    }
        
})

// INDEX
router.get('/', async (req, res) => {

    try {
        const allPosts = await db.Games.find()
        /*username = req.session.currentUser.username
        console.log(username)
        */
        const context = {/*username: username,*/ games: allPosts };
        // console.log(allPosts)
        //res.send(allPosts)
        //console.log(req.session)

        res.render('games_index.ejs', context)
    } catch(err) {
        console.log(err)
        
    }
})

//New route
router.get('/new', (req,res) =>{
    res.render('games_new.ejs');
})


//Show route
router.get('/:id', async (req,res, next) =>{
    try{
        const foundGame = await db.Games.findById(req.params.id)
        const gameComments = await db.Comment.find({game: foundGame._id}).populate("user").exec()
        //console.log(res.locals.currentUser)
        const context = {game: foundGame, id: foundGame._id, comments: gameComments}
        //console.log(gameComments.user)
        //console.log(req.session.currentUser)
        res.render('games_show.ejs', context)
       

    } catch (error){
        console.log(error);
        req.error = error;
        return next();
    }
});

//Delete Route
router.delete('/:id', async (req, res, next)=>{
    try{
        const deletedGame = await db.Games.findByIdAndDelete(req.params.id)
        console.log(deletedGame)
        res.redirect('/games/');

    } catch (error) {
        console.log(error)
        req.error = error
        return next();
    }
});

//Edit Route
router.get('/:id/edit', async (req, res, next)=>{
    try{
        const updatedGame = await db.Games.findById(req.params.id)
        //console.log(updatedGame);
        res.render('games_edit.ejs', {game: updatedGame})

    } catch (error){
        console.log(error)
        req.error = error
        return next()
    }
})

//Update Route
router.put ('/:id', async (req,res,next)=>{
    try{
        const updatedGame = await db.Games.findByIdAndUpdate(req.params.id, req.body);
        console.log(updatedGame)
        return res.redirect('/games')

    } catch (error){
        console.log(error)
        req.error = error
        return next()
    }
})










module.exports=router;