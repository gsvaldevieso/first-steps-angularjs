app.controller('entregasCtrl', function($scope, $http, calculadorRotas, mapeadorEnderecos){
	$scope.entregas = [];

	$scope.configuracoesInicias = {
		"origem": "Maringá - PR",
		"custoKm": 0.435
	};

	$scope.novaEntrega = function(){
		mapeadorEnderecos.buscarEnderecoPeloCep($scope.destino, function(response){
			if(response == null) return;

			calculadorRotas.calcularDistanciaEntreCidades("Maringá - PR", response.data.localidade + " - " + response.data.uf, function(data){
				var valorDistancia = data.distance.replace(/(km|m|\.)/g, "").replace(/\./g,"\,").trim();

				$scope.adicionarEntrega({
					descricao: $scope.descricao,
					origem: $scope.configuracoesInicias.origem,
					destino: response.data.localidade,
					distancia: data.distance,
					custoEstimado: parseFloat(valorDistancia) * $scope.configuracoesInicias.custoKm
				});
			});
		});
	}

	$scope.remover = function(entrega){
		var indice = $scope.entregas.indexOf(entrega);
		$scope.entregas.splice(indice, 1);
	}

	$scope.adicionarEntrega = function(entrega){
		$scope.entregas.push({
			descricao: entrega.descricao,
			origem: entrega.origem,
			destino: entrega.destino,
			distancia: entrega.distancia,
			custoEstimado: entrega.custoEstimado
		});

		$scope.$apply();
	}
});