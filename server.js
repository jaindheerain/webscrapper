
var cheerio=require('cheerio');
var request=require('request');
var fs=require('fs');
var express=require('express');
var app=express();

app.get('/scrape',function (req,res) {

    var json={title:"",release:"",rating:""};

    console.log("Entered")

    url = 'http://www.imdb.com/title/tt1229340/';

    request(url,function (error,res,html) {

        if(!error){


            var $=cheerio.load(html);

            var title,release,rating;


           var name= $(".title_wrapper").children().first().text();

           json.title=name;

           var rating=$(".ratingValue").children().first().text();
           console.log(rating);
           json.rating=rating;

           var date=$('.subtext meta[itemprop="datePublished"]').attr("content");
           console.log(date);
           json.release=date;
           /* $('h1.title_wrapper').filter(function(){

                var data=$(this);
                console.log(data);
                var arrya = data.text();
                console.log(arrya);
                json.title=arrya;
                console.log(title);
            });
*/
        }
    });


});

var port=9090||process.env.port;
app.listen(port,function () {
    console.log("Server datrred");
});

