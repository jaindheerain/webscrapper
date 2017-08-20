
var cheerio=require('cheerio');
var request=require('request');
var fs=require('fs');
var express=require('express');
var app=express();

app.get('/scrape',function (req,res) {

    console.log("Entered")

    url = 'http://www.imdb.com/title/tt1229340/';

    request(url,function (error,res,html) {

        console.log(error);

        if(!error){

            console.log(html);

            var $=cheerio.load(html);

            var title,release,rating;

            var json={title:"",release:"",rating:""};

            $('.header').filter(function(){

                var data=$(this);
                title = data.children().first().text();

                json.title=title;
                res.send(title);
                console.log(title);
            });

        }

    });

});
var port=9090||process.env.port;
app.listen(port,function () {
    console.log("Server datrred");
});

