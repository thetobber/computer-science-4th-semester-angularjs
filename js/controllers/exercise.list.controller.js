fit
.controller('ExerciseListController', function ($scope, FitDataService) {
	$scope.data = [];

	FitDataService.get('')
	.then(
		function (response) {
			$scope.data = response.data;
		},
		function (error) {
			console.log(error);
		}
	);

	/*$http.get('https://sleepy-sea-10905.herokuapp.com/api/exercises/')
	 .then(function(response) {
	 $scope.data = response.data;
	 });*/

	/*var cache = FitCache.get('FitData');

	 if (cache) {
	 $scope.data = cache;
	 console.log(FitCache.get('FitData'));
	 } else {
	 $http.get('https://sleepy-sea-10905.herokuapp.com/api/exercises/')
	 .then(function(response) {
	 $scope.data = response.data;
	 FitCache.put('FitData', response.data);
	 console.log(FitCache.get('FitData'));
	 });
	 }*/
});