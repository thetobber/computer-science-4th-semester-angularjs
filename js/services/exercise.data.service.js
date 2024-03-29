fit.service('ExerciseDataService', ['DataService', '$cacheFactory', '$q', function (DataService, $cacheFactory, $q) {
	var endpoint = 'https://sleepy-sea-10905.herokuapp.com/api/exercises/';
	var cacheName = 'ExerciseData';
	var cache = $cacheFactory(cacheName);
	var self = this;

	this.flag = false;

	this.get = function (id) {
		var defer = $q.defer();
		var cacheData = cache.get(cacheName);

		if (cacheData && self.flag) {
			for (var i = 0; i < cacheData.length; i++) {
				if (cacheData[i]['_id'] === id) {
					defer.resolve({
						data: cacheData[i]
					});
					break;
				}
			}

			return defer.promise;
		}

		DataService.get(endpoint, id)
		.then(function (response) {
			defer.resolve(response);
			cache.put(cacheName, response.data);
		});

		return defer.promise;
	};

	this.getAll = function () {
		var defer = $q.defer();
		var cacheData = cache.get(cacheName);

		if (cacheData && self.flag) {
			defer.resolve({
				data: cacheData
			});

			return defer.promise;
		}

		DataService.get(endpoint)
		.then(function (response) {
			defer.resolve(response);
			cache.put(cacheName, response.data);
			self.flag = true;
		});

		return defer.promise;
	};

	this.getCache = function () {
		return cache.get(cacheName);
	};

	this.update = function (id, object) {
		var cacheData = cache.get(cacheName);

		if (cacheData) {
			for (var i = 0; i < cacheData.length; i++) {
				if (cacheData[i]['_id'] === id) {
					cacheData.splice(i, 1, object);
					break;
				}
			}

			cache.put(cacheName, cacheData);
		}

		return DataService.put(endpoint, id, object);
	};

	this.create = function (object) {
		var defer = $q.defer();
		var cacheData = cache.get(cacheName);

		DataService.post(endpoint, object)
		.then(function (response) {
			object['_id'] = response['data']['_id'];

			if (cacheData && self.flag) {
				cacheData.push(object);
				cache.put(cacheName, cacheData);
			}

			defer.resolve(response);
		});

		return defer.promise;
	};

	this.delete = function (id) {
		var cacheData = cache.get(cacheName);

		if (cacheData) {
			for (var i = 0; i < cacheData.length; i++) {
				if (cacheData[i]['_id'] === id) {
					cacheData.splice(i, 1);
					break;
				}
			}

			cache.put(cacheName, cacheData);
		}

		return DataService.delete(endpoint, id);
	};
}]);