Players = new Meteor.Collection('atributes');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('searchKey', "empty");
	Session.setDefault("hasRun", false);
  

  Template.body.helpers({
    searchKey: function(){
    	window.alear(searchKey);
    	return document.getElementById('result');
    }    
  });



  Template.gallery.isFirstRun = function(){
   		// because the Session variable will most probably be undefined the first time
   		return Session.get("hasRun");
	}	


  	Template.body.events({
	  "submit .new-task": function (event) {
	    // This function is called when the new task form is submitted
	    var searchKeyed = event.target.text.value;

	    if (!searchKeyed){
	    	window.alert("Please key in your search string");
	    	event.target.text.value ='';
	    } else if (!(searchKeyed.toUpperCase() == "GOOGLE"))
		{
			window.alert("We love rule breakers, but sometimes follow the hints make you luckier ;)!");
			event.target.text.value='';
		}

	    else {
	    	var text = "Your search result for: " + event.target.text.value;

			document.getElementById("result").innerHTML =  text;
			document.getElementById("swfsampleImg").style.height = "100px";

			$(".main").fadeIn();
	    	Session.set("hasRun", true);
		
	    }
	    

	    // Prevent default form submit
	    return false;
  		}
	});
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    // On Client and Server
	
		// Extended configuration
	Players.initEasySearch(['atribute', 'definition'], {
	    'limit' : 20,
	    'use' : 'mongo-db'
	});
	Players.insert({
  	atribute: "Leadership",
  	definition: "Today was a good day."
  });
  });
  
}
