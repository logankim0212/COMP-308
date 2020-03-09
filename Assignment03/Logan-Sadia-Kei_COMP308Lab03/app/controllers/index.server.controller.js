// Create a new render method to render index.ejs
//
//You can require this module and use this function
//You'll need to use Express routing functionality to utilize the controller

exports.render = function (req, res) {    
        //display index.ejs
        res.render('index', {
            title: 'Express REST API'
        });   
    
};
