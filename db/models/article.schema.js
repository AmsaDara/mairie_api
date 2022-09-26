const mongoose=require('mongoose');

const Schema= mongoose.Schema;

const ArticleSchema = new Schema ({
    title: {
        type: String,
        trim: true,
        required: [true, 'title is required'],
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'description is required'],
    },
    mini_description: {
        type: String,
        trim: true,
        required: [true, 'description is required'],
    },
    cover: {
        type: String,
        required: [true, 'cover is required']
    },
    featured: {
        type: Boolean,
        default: false
    },
},
     {
    timestamps: true
});


module.exports=mongoose.model('Article',ArticleSchema);