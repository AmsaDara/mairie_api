


const article = (Article) => async (blog) =>{
    const _blog = new Article(blog);
    try {
        const result = await _blog.save();
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

const getAllArticle = (Blog) => async()=>{
    try {
        const result = await Blog.find();
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

const getFeaturedArticle = (Blog)=>async ()=>{
    try {
        const result = await Blog.find({featured:true});
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

const getArticleById = User => async(id)=>{
    
}

const updateArticle = User =>(id,newUser)=>{
    
}

module.exports = (Blog)=>{
    return({
        article:article(Blog),
        // authenticate: authenticate(User),
        getAllArticle:getAllArticle(Blog),
        getFeaturedArticle:getFeaturedArticle(Blog),
        // getUserById : getUserById(User),
        // updateUser: updateUser(User),
    });
};