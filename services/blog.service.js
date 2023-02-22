


const article = (Article) => async (Article) =>{
    const _Article = new Article(Article);
    try {
        const result = await _Article.save();
        if(result){
            return({
                status:'success',
                message:'Article saved successfully',
                payload:result
            })
        }
    } catch (error) {
        return({
            status:'fail',
            message:'Article fail to register',
            payload: error
        });
    }
};



const authenticate = User => async (email,password)=>{
    try {
        const user = await User.findOne({
            email: email
        });
        if (comparePassword(password, user.password)) {
            const token = generateMeAToken(user);
            return ({
                status: "success",
                message: "user authenticated succssfully!!!",
                payload: {
                    user: user.toJSON(),
                    // ROLES: roles.toJSON(),
                    token: token
                }
            });
        } else {
            return ({
                status: "error",
                message: "Invalid email or password!!!",
                payload: null
            })
        }
    } catch (error) {
        return ({
            status: "error",
            message: "user can't authenticate",
            payload: null
        });
    }
}

const getAllArticle = (Article) => async()=>{
    try {
        const result = await Article.find();
        if(result){
            return({
                status:'success',
                message:'All Articles',
                payload:result
            })
        }
    } catch (error) {
        return({
            status:'fail',
            message:'Sorry',
            payload: error
        });
    }
}

const getFeaturedArticle = (Article)=>async ()=>{
    try {
        const result = await Article.find({featured:true});
        if(result){
            return({
                status:'success',
                message:'All Articles Featured',
                payload:result
            })
        }
    } catch (error) {
        return({
            status:'fail',
            message:'Sorry',
            payload: error
        });
    }
}

const articleId = (Article)=>async (id)=>{
    //console.log(id);
    try {
        const result = await Article.findById(id);
        if(result){
            return({
                status:'success',
                message:'content of a article by its identifier',
                payload:result
            })
        }
    } catch (error) {
        return({
            status:'fail',
            message:'Sorry',
            payload: error
        });
    }
  }

const updateArticle = User =>(id,newUser)=>{
    
}

module.exports = (Article)=>{
    return({
        article:article(Article),
        // authenticate: authenticate(User),
        getAllArticle:getAllArticle(Article),
        getFeaturedArticle:getFeaturedArticle(Article),
        articleId : articleId(Article),
        // updateUser: updateUser(User),
    });
};