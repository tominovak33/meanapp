angular.module('app')
	.controller('SinglePostCtrl', ["$scope" , "$http", "PostsService", "$routeParams", "$route", "$location" , function ($scope, $http, PostsService, $routeParams, $route, $location) {

		var post_slug = $routeParams.slug;
		var post_id = $routeParams.id;

		$scope.$on('$viewContentLoaded', function(){
			//the page is ready
		});

		$scope.deleteItem = function () {
			PostsService.removeItem({
					post_id: $scope.post._id
				})
				.success(function (response) {
					console.log(response);
					// confirm successful delete
				})
		};


		if (post_slug) {
			PostsService.single_slug({
				slug: post_slug
			})
			.success(function (post) {
				$scope.post = post[0];
			})
		}
		else {
			PostsService.single_id({
				id: post_id
			})		
			.success(function (post) {
				$scope.post = post[0];
			})
		}				

	}])