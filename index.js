const express=require('express');
const path=require('path');
const compression=require('compression');
const cors=require('cors');
var db = require('./db')
require('dotenv').config();

const app=express();

app.use(express.static(path.join(__dirname,'public')));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

require('./src/routers/chatRouter')(app);
require('./src/routers/commentRouter')(app);
require('./src/routers/hashtagRouter')(app);
require('./src/routers/photoRouter')(app);
require('./src/routers/postRouter')(app);
require('./src/routers/userRouter')(app);



app.get('/',(req,res)=>{
    return res.send("hello developers");
});

app.use((err,req,res,next)=>{
    if(!err.status){
       return res.json({
           code:500,
           success:false,
           message:'서버 에러'
        });
    }
 });

app.listen(process.env.PORT||3000);