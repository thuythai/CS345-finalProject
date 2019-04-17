var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require('connect-flash'),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Course          = require("./models/course"),
    Topic           = require("./models/topic"),
    Resource        = require("./models/resource"),
    
    //Added for forum
    Question        = require("./models/question"),
    Reply           = require("./models/reply"),
    
    User            = require("./models/user"),
    seedDB          = require("./seeds"),
    methodOverride  = require('method-override');
    
//requiring routes
var topicRoutes     = require("./routes/topics"),
    courseRoutes    = require("./routes/courses"),
    indexRoutes     = require("./routes/index"),
    resourceRoutes  = require("./routes/resources"),
    
    //Added for forum
    questionRoutes  = require("./routes/questions"),
    replyRoutes     = require("./routes/replies");

//var url = process.env.DATABASEURL || 'mongodb://localhost/yelp_camp_v10';
//mongoose.connect(url);

//mongoose.connect('mongodb://localhost/yelp_camp_v10');
mongoose.connect('mongodb+srv://c:de3s2VTZ5dpXY_K@cluster0-rwskd.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true });

//var url = process.env.DATABASEURL || 'mongodb+srv://c:de3s2VTZ5dpXY_K@cluster0-rwskd.mongodb.net/test?retryWrites=true';
//mongoose.connect(url);



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash('error');
   res.locals.success = req.flash('success');
   next();
});


app.use("/", indexRoutes);
app.use("/courses", courseRoutes);
app.use("/courses/:id/topics", topicRoutes);
//app.use("/courses/:id/topics/:idx/resources", resourceRoutes);
app.use("/topics/:id/resources", resourceRoutes);


//Added for forum
app.use("/questions", questionRoutes);
app.use("/questions/:id/replies", replyRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Final project Has Started!");
});

