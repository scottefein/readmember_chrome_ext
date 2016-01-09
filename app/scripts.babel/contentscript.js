'use strict';

var metas = document.getElementsByTagName('meta'); 

var i;

for (i=0; i<metas.length; i++) { 
  if (metas[i].getAttribute('property') === 'og:title') { 
     var title = metas[i].getAttribute('content'); 
  } 
  if (metas[i].getAttribute('property') === 'og:url') { 
     var url = metas[i].getAttribute('content'); 
     if (url.indexOf('nytimes.com') > -1){
		var body = document.getElementById('story-body');
		if(body){
			var scrollHeight = body.scrollHeight;
		}
	 }
  } 
}

var timeInMs = Date.now();

function closeIt()
{
	if (title && url && body ){
		var newTimeInMs = Date.now();
		var timeElapsed = Math.round((newTimeInMs - timeInMs)/1000);
		var scrollEnd = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		var scrolledPer = Math.round(scrollEnd/scrollHeight*100);

		var mypostrequest = new XMLHttpRequest();
		mypostrequest.onreadystatechange=function(){
		 if (mypostrequest.readyState===4){
		  if (mypostrequest.status===200 || window.location.href.indexOf('http')===-1){
		   
		  }
		 }
		};
		mypostrequest.open('POST', 'https://api.airtable.com/v0/appmOYXlT9Xpr8VLG/Sessions?api_key=keyNb38YSpAFdx34A', true);
		mypostrequest.setRequestHeader('Content-type', 'application/json');
		mypostrequest.send(JSON.stringify({'fields': {
		    'URL': url,
		    'Progress Percentage': scrolledPer,
		    'Time Spent (Seconds)': timeElapsed,
		    'User ID': [
		      'recqRdm5XO0N8s3Hy'
		    ],
		    'Page Name': title
		  }
		}));
	}
	return;
}
window.onbeforeunload = closeIt;

var IDLE_TIMEOUT = 60; //seconds
var _idleSecondsTimer = null;
var _idleSecondsCounter = 0;

document.onclick = function() {
    _idleSecondsCounter = 0;
    window.clearInterval(_idleSecondsTimer);
    _idleSecondsTimer = window.setInterval(CheckIdleTime, 1000);
};

document.onmousemove = function() {
    _idleSecondsCounter = 0;
    window.clearInterval(_idleSecondsTimer);
    _idleSecondsTimer = window.setInterval(CheckIdleTime, 1000);
};

document.onkeypress = function() {
    _idleSecondsCounter = 0;
    window.clearInterval(_idleSecondsTimer);
    _idleSecondsTimer = window.setInterval(CheckIdleTime, 1000);
};

_idleSecondsTimer = window.setInterval(CheckIdleTime, 1000);

function CheckIdleTime() {
     _idleSecondsCounter++;
    if (_idleSecondsCounter >= IDLE_TIMEOUT) {
    	 _idleSecondsCounter = 0;
    	 window.clearInterval(_idleSecondsTimer);
        closeIt();
    }
}
