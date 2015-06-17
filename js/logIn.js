$(document).ready(function(){
	var current = Parse.User.current();
	console.log(current);
	if(current){
	    var a = setTimeout(function(){
			FB.getLoginStatus(function(response) {
			     if (response.status === 'connected') {
			         uid = response.authResponse.userID;
			         accessToken = response.authResponse.accessToken;
			         FB.api('/me/picture?type=large', function (response) {
					    $('#fbPic').html("<img src="+response.data.url+" crossorigin=\"anonymous\" id=preview1 />");          
			         });
				 
			         FB.api('/me', function (response) {
						 console.log(response);
						 $('#fbImgView').append("<h1>Welcome , "+(response['gender']=="male"?"Mr. ":"Miss ")+" "+response['first_name']+"</h1>");
			         });
					 
			  }
		     });   
	    },3000);
		indexView();
	}
	else{
		loginView();
	}
});

$(document).on('click','#fbloginBtn',function(e){
	e.preventDefault();
	fblogin();
});
$(document).on('click','#logoutBtn',function(e){
	e.preventDefault();
	logout();
});

function loginView(){
	$('#logoutBtn').hide();
	$('#indexView').hide();
	
	$('#loginView').show();
	$('.notLogin').show();
	$('#fbloginBtn').show();
	$('#fbPic').html('');
	
}

function indexView(){
	$('#loginView').hide();
	$('.notLogin').hide();
	$('#fbloginBtn').hide();

	$('#indexView').show();
	$('#logoutBtn').show();
}

function logout(){
   Parse.User.logOut();
   FB.logout(function(response) {
     // user is now logged out
   });
   loginView();	
   window.location = 'index.html' ;
}