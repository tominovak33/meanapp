angular.module('app')
	.service('UserSvc', ["$http", function($http) {
		var svc = this;
		svc.getUser = function () {
			return $http.get('/api/users', {
				headers: { 'X-Auth': window.localStorage.token }
			})
		}
		svc.login = function (username, password) {
			return $http.post('/api/sessions', {
				username: username, password: password
			})
			.then(function (val) {
				window.localStorage.token = val.data;
				$http.defaults.headers.common['X-Auth'] = val.data
				return svc.getUser();
			})
		}
	}])