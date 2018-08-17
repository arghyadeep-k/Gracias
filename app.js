var Twitter = require('twit');
var config = require('./config.js');

var twitter = new Twitter(config);
var stream = twitter.stream('user');

console.log('Starting program. Monitoring started.')

stream.on('follow',followed);

function followed(event)
{
    console.log('Starting Followed event');   
    var name = event.source.name; 
    var screenName = event.source.screen_name;

    console.log(name+' (@'+screenName+') followed you.');

    tweetNow('@'+screenName+', thanks for following me.');
}

//Post tweet
function tweetNow(tweetMsg)
{
    var tweet = {
        status: tweetMsg
    }
    twitter.post('statuses/update', tweet, function(err, data, response) {
        if(err){
          console.log("Error in posting tweet");
        }
        else{
          console.log("Tweet posted successfully");
        }
      });
}
