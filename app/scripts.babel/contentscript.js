'use strict';

var metas = document.getElementsByTagName('meta'); 

var i

for (i=0; i<metas.length; i++) { 
  if (metas[i].getAttribute("property") == "og:title") { 
     var title = metas[i].getAttribute("content"); 
  } 
  if (metas[i].getAttribute("property") == "og:url") { 
     var url = metas[i].getAttribute("content"); 
  } 
}

var timeInMs = Date.now();

function closeIt()
{
	var newTimeInMs = Date.now();
	var timeelapsed = Math.round((newTimeInMs - timeInMs)/10);
	if (title != "" && url != ""){
		var mypostrequest=new XMLHttpRequest()
		mypostrequest.onreadystatechange=function(){
		 if (mypostrequest.readyState==4){
		  if (mypostrequest.status==200 || window.location.href.indexOf("http")==-1){
		   document.getElementById("result").innerHTML=mypostrequest.responseText
		  }
		 }
		}
		mypostrequest.open("POST", "https://api.airtable.com/v0/appmOYXlT9Xpr8VLG/Sessions?api_key=keyNb38YSpAFdx34A", true)
		mypostrequest.setRequestHeader("Content-type", "application/json")
		mypostrequest.send(JSON.stringify({"fields": {
		    "URL": url,
		    "Progress Percentage": 78,
		    "Time Spent (Seconds)": timeelapsed,
		    "User ID": [
		      "recqRdm5XO0N8s3Hy"
		    ],
		    "Page Name": title
		  }
		}))
	}
	return;
}
window.onbeforeunload = closeIt;

chrome.idle.onStateChanged.addListener(function(newstate) {
  if(newstate == "idle"){
  	closeIt;
  }
});