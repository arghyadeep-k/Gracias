var Twitter = require('twit');
var config = require('./config.js');

var twitter = new Twitter(config);
var stream = twitter.stream('user');

var myScreenName = 'arghyadeep_k';
console.log('Starting program. Monitoring started.')

stream.on('follow',followed);

function followed(event)
{
    console.log('Starting Followed event');   
    
    var name = event.source.name; 
    var screenName = event.source.screen_name;

    //Checking if you followed or you were followed
    if(screenName!=myScreenName)
    {
        console.log(name+' (@'+screenName+') followed you.');
        tweetNow('@'+screenName+', thanks for following me.');
    }
    else
        console.log('You followed ' + event.target.name +'(@'+ event.target.screen_name + ')');        
}

//Post tweet
function tweetNow(tweetMsg)
{
    var tweet = {
        status: tweetMsg
    }
    twitter.post('statuses/update', tweet, function(err, data, response) {
        if(err){
          console.log("Error in posting tweet.");
          console.log(err);
        }
        else{
          console.log("Tweet posted successfully");
        }
      });
}
