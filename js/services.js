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

app.factory('mapeadorEnderecos', function($http){
	return {
		buscarEnderecoPeloCep: function(cep, callback){
			$http.get('http://viacep.com.br/ws/' + cep + '/json/').then(function(response){
				if(!response.data.erro)
					callback(response);
				else
					console.error('Erro ao localizar-se o CEP de entrada!');
			}, function(err){
				console.log('Erro ao buscar o CEP!');
			});
		}
	}
});