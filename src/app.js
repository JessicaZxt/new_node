//导包
const express=require('express');
const bodyParser=require('body-parser');

const app=express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.send('111');
})

app.listen(8080,(err)=>{
    if(err){
        console.log(err);
    }
    console.log('start ok');
});
