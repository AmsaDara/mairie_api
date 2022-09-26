const mongoose=require('mongoose');
const beautifyUnique=require('mongoose-beautiful-unique-validation');
const bcrypt=require('bcrypt');
const saltRounds= 10;

const Schema=mongoose.Schema;

const UserSchema = new Schema ({
    fullusername: {
        type: String,
        trim: true,
        required: [true, 'fullname is required'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'email is required'],
        unique: [true, 'Two students cannot share the same email ({VALUE})'],
        lowercase: true,
        validate: [validateEmail, '{VALUE} is not a valid email address !'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, '{VALUE} fill a valid email address !'],
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
    },
     phone: {
        type: String,
    },
    city: {
        type: String
    },
    isGranted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

UserSchema.plugin(beautifyUnique);


UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const user = this;
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}


UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};



module.exports=mongoose.model('User', UserSchema);