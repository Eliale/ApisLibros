	   function exex(){
			spotify();
			loadDoc();

		}
		function exex2(){
			lastfm();
			loadDoc();
			initMap();
		}


		function limpiar(){

			$("#body").empty();
			$("#ppp").empty();
			$("#last").empty();
			$("#map").empty();
	                $("#related").empty();
		}


		function spotify(){
	        $("#ppp").append("<h1>Discograf?a</h1>");
	              $("#related").append("<h1>Artistas Relacionados</h1>");
			var link= $('#the-form').serialize();
	                
			var xhttp = new XMLHttpRequest();

			xhttp.open("GET", "https://api.spotify.com/v1/search?"+link+"&type=artist", true);
			xhttp.send();
			xhttp.onreadystatechange = function() {

				if (xhttp.readyState == 4 && xhttp.status == 200) {
					var jartirsts=JSON.parse(xhttp.responseText);

					var artist=jartirsts.artists.items[0].id
					var xhttp2 = new XMLHttpRequest();

					xhttp2.open("GET", "https://api.spotify.com/v1/artists/"+artist+"/albums", true);
					xhttp2.send();
					xhttp2.onreadystatechange = function() {
						if (xhttp2.readyState == 4 && xhttp2.status == 200) {

							var artists=JSON.parse(xhttp2.responseText);
							var y= artists.items.length;

							for (var x=0; x<y; x++){


								var im='<a title="'+ artists.items[x].name +'" target="_blank" href='+artists.items[x].external_urls.spotify +'><img src='+artists.items[x].images[0].url+ ' height="100" width="100"></a>'  

								$("#ppp").append(im);
							}

						}
					}
					var xhttp3 = new XMLHttpRequest();

					xhttp3.open("GET", "https://api.spotify.com/v1/artists/"+artist+"/related-artists", true);
					xhttp3.send();
					xhttp3.onreadystatechange = function() {
						if (xhttp3.readyState == 4 && xhttp3.status == 200) {

							var artistx=JSON.parse(xhttp3.responseText);
							var y= artistx.artists.length;

							for (var x=0; x<10; x++){
	                            var nombre=artistx.artists[x].name;
	                            var clickaqui = document.createElement("a");
	                           clickaqui.innerHTML=nombre;
	                            //clickaqui.onclick=relatedartist(nombre);                                                
	        
								$("#related").append(clickaqui);
	                            $("#related").append("<p>");
	                                                        
	                                                        
							}

						}
					}
				}
			}
		}



	function lastfm(){
		var link= $('#the-form').serialize();
		var nueva = link.replace('q=','');
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&lang=en&artist="+nueva+"&api_key=ae9dc375e16f12528b329b25a3cca3ee&format=json", true);
		xhttp.send();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var bio=JSON.parse(xhttp.responseText);
				$("#last").append("<h1>Biograf?a</h1>");
				$("#last").append("<p>");
				$("#last").append(bio.artist.bio.summary);
			}

		}

	}

	function loadDoc() {
		
		var link= $('#the-form').serialize();
		var max="&maxResults=5"
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://www.googleapis.com/books/v1/volumes?"+link+max, true);
		xhttp.send();

		xhttp.onreadystatechange = function() {

			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var myArr = JSON.parse(xhttp.responseText);
				var y=	 myArr.items.length;

				for (var x=0; x<y; x++){

					var tr=document.createElement("tr");
					tr.setAttribute('id','row'+x);
					var td1=document.createElement("th");

					var td3=document.createElement("th");
					var td4=document.createElement("th");
					var td5=document.createElement("th");
					var td6=document.createElement("th");
					var bok = JSON.parse(xhttp.responseText);
					td1.innerHTML=bok.items[x].volumeInfo.title;

					td3.innerHTML=bok.items[x].volumeInfo.authors
					if(bok.items[x].volumeInfo.hasOwnProperty('imageLinks')){
						var im= '<img src='+bok.items[x].volumeInfo.imageLinks.smallThumbnail+ ' height="70" width="50">';
						td4.innerHTML=im;
					}else{

						td4.innerHTML="sin Preview";}
						var ll= '<a href=' +bok.items[x].accessInfo.webReaderLink+' target="_blank">Descargar</a>';
						td5.innerHTML=ll;
	                                        
						var texto=bok.items[x].volumeInfo.description;
	                                        if(texto.length>100){
	                                        var texton=(texto.substring(0,99) + '.....');
	                                        }
	                         
	                                        td6.innerHTML=texton;                        
						$("#row"+x).append(td1,td6,td3,td4,td5);

						$("#body").append(tr);
					}
				}
			}

		}
		function initMap(){
	        
			var link= $('#the-form').serialize();
			var nueva = link.replace('q=','');
			var nueva2 = nueva.replace('+','%20');

			$.ajax({
				url: "http://api.bandsintown.com/artists/"+nueva2+"/events.json?api_version=2.0&app_id=MUSIC&date=upcoming",
				data: null,
				type: "GET",
				crossDomain: true,
				dataType: 'jsonp',

				success: function(result){
					$("#map").append("<h1>No hay eventos proximos</h1>");
					$("#map").append("<p>");

					var myLatLng = {lat: result[0].venue.latitude, lng: result[0].venue.longitude};
					var map = new google.maps.Map(document.getElementById('map'), { zoom: 5,
						center: myLatLng,
						RotateControlOptions:true,
						mapTypeControl:true,
						mapTypeControlOptions: {
							style:google.maps.MapTypeControlStyle.DROPDOWN_MENU



						}
					});

					var tamano=result.length;

					for( i = 0; i < tamano; i++ ) {
						var position = new google.maps.LatLng(result[i].venue.latitude,result[i].venue.longitude);
						marker = new google.maps.Marker({
							position: position,
							map: map,
							icon:'http://img.getjar.mobi/icon-50x50/ba/852391_thm.png',
							animation:google.maps.Animation.BOUNCE,
							title: result[i].title+" "+result[i].formatted_datetime
						});

						var infowindow = new google.maps.InfoWindow({
							content: result[i].title+" "+result[i].formatted_datetime
						});
					}
				}
			})
	}

	function likes(){
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "http:///musicforyou.ml/db.php", true);
		xhttp.send();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var x=JSON.parse(xhttp.responseText);

				var myLatLng = {lat: 17.0605584, lng: -96.725482};
				var map = new google.maps.Map(document.getElementById('likes'), { zoom: 13,
					center: myLatLng,
					RotateControlOptions:true,
					mapTypeControl:true,
					mapTypeControlOptions: {
						style:google.maps.MapTypeControlStyle.DROPDOWN_MENU
					}
				});
				var tamano=x.length;

				for( i = 0; i < tamano; i++ ) {
					var position = new google.maps.LatLng(x[i].lat, x[i].lon);
					marker = new google.maps.Marker({
						position: position,
						map: map,
						icon:'https://qph.is.quoracdn.net/main-qimg-ce24c99660faa4cb89d15c89739a9db0',
						animation:google.maps.Animation.BOUNCE,
						title: 'Gracias por tu Like'
					});
				}
			}
		}
	}

	window.fbAsyncInit = function() {
		FB.Event.subscribe('edge.create', function(response) {
			//alert('I just clicked like button');
			var latitude;
			var longitude;

			var output = document.getElementById("out");

			if (!navigator.geolocation){
				alert("Geolocation is not supported by your browser");
				return;
			}

			function success(position) {
				latitude  = position.coords.latitude;
				longitude = position.coords.longitude;
	       //return [latitude,longitude];
	       var xhttp = new XMLHttpRequest();
	       xhttp.open("PUT", "http:///musicforyou.ml/insert.php?lat="+latitude+"&lon="+longitude, true);
	       xhttp.send();

	       xhttp.onreadystatechange = function() {

	       	if (xhttp.readyState == 4 && xhttp.status == 200) {

	       		//alert(xhttp.responseText)

	       	}}

	       };

	       function error() {
	       	alert("Unable to retrieve your location");
	       };



	       navigator.geolocation.getCurrentPosition(success, error);
	       likes();
	   });
	      FB.Event.subscribe('edge.remove', function(href) {
	    	alert('Unlike');
	    });
	};

	(function(d, s, id) {

		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5&appId=426804980860950";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));