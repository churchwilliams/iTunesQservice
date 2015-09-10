var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    //this works fine

    // this.getArtistData = function(artist){
   	// 	$http.jsonp('https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK')
   	// 		.then(function(res){
   	// 			console.log(res);
   	// 		})
    // };

    // this is reference from mini project

	// this.getUsers = function() {
	// 	var deferred = $q.defer();
	//     $http.get('http://reqr.es/api/users?page=1')
	//     	.then(function(res){
	//     		var parsedResponse = res.data.data;
	//     		for (var i = 0; i < parsedResponse.length; i++) {
	//     			parsedResponse[i].first_name = 'Ralf'
	//     		}

	//     		deferred.resolve(parsedResponse);
	//    	});

	//     	return deferred.promise;
	//   };

    this.getArtist = function(artist){
    	var deferred = $q.defer();
   		$http.jsonp('https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK')
   			.then(function(res){

   				res = res.data.results;

   				var newArr = [];

				for (var i = 0; i < res.length; i++) {
   					var newObj = {
   						AlbumArt: res[i].artworkUrl100,
						Artist: res[i].artistName,
						Collection: res[i].collectionName,
						CollectionPrice: res[i].collectionPrice,
						Play: res[i].previewUrl,
						Type: res[i].kind
   					}
   					newArr.push(newObj);
   				}

   				deferred.resolve(newArr);
   			}, function(error) {
   				deferred.reject(error);
   			});
   		return deferred.promise;
   		// console.log(deferred.promise);
    };
});