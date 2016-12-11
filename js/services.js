app.factory('calculadorRotas', function(){
	return {
		calcularDistanciaEntreCidades: function(primeiraCidade, segundaCidade, callback){
			var service = new google.maps.DistanceMatrixService();
	        
	        service.getDistanceMatrix(
			{
			    origins: [primeiraCidade],
			    destinations: [segundaCidade],
			    travelMode: google.maps.TravelMode.DRIVING
			}, function(response, status){
				if (status == google.maps.DistanceMatrixStatus.OK) {
					callback({status: true, distance: response.rows[0].elements[0].distance.text});
		        }else{
		        	callback({status: false, distance: null})
		        }
			});
		}
	}
});