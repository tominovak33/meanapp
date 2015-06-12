angular.module("app",["ngRoute"]),angular.module("app").controller("ApplicationCtrl",["$scope",function(o){o.$on("userLoggedIn",function(t,n){o.currentUser=n})}]),angular.module("app").controller("LoginCtrl",["$scope","UserSvc",function(o,t){o.login=function(n,e){t.login(n,e).then(function(t){o.$emit("userLoggedIn",t.data)})}}]),angular.module("app").controller("PostsCtrl",["$scope","$http","PostsService",function(o,t,n){o.addPost=function(){o.postBody&&n.send({username:"tomi7",body:o.postBody}).success(function(t){o.postBody=null})},o.$on("ws:new_post",function(t,n){o.$apply(function(){o.posts.unshift(n)})}),n.get().success(function(t){o.posts=t})}]),angular.module("app").service("PostsService",["$http",function(o){this.get=function(){return o.get("/api/posts")},this.send=function(t){return o.post("/api/posts",t)}}]),angular.module("app").config(["$routeProvider",function(o){o.when("/",{controller:"PostsCtrl",templateUrl:"posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"login.html"})}]),angular.module("app").service("UserSvc",["$http",function(o){var t=this;t.getUser=function(){return o.get("/api/users",{headers:{"X-Auth":this.token}})},t.login=function(n,e){return o.post("/api/sessions",{username:n,password:e}).then(function(n){return t.token=n.data,o.defaults.headers.common["X-Auth"]=n.data,t.getUser()})}}]),angular.module("app").run(["$rootScope","$timeout","$window",function(o,t,n){var e="ws://"+n.location.host,s=new WebSocket(e);s.onopen=function(){console.log("Websocket connected")},s.onclose=function(o){console.log("Websocket closed. Trying to reconnect...")},s.onmessage=function(t){console.log(t);var n=JSON.parse(t.data),e="ws:"+n.topic,s=n.data;console.log("broadcasting: "),o.$broadcast(e,s)}}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uQ3RybC5qcyIsImxvZ2luQ3J0bC5qcyIsInBvc3RzQ3RybC5qcyIsInBvc3RzU2VydmljZS5qcyIsInJvdXRlcy5qcyIsInVzZXJTZXJ2aWNlLmpzIiwid2Vic29ja2V0cy5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29udHJvbGxlciIsIiRzY29wZSIsIiRvbiIsImV2ZW50IiwidXNlciIsImN1cnJlbnRVc2VyIiwiVXNlclN2YyIsImxvZ2luIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInRoZW4iLCJyZXNwb25zZSIsIiRlbWl0IiwiZGF0YSIsIiRodHRwIiwiUG9zdHNTZXJ2aWNlIiwiYWRkUG9zdCIsInBvc3RCb2R5Iiwic2VuZCIsImJvZHkiLCJzdWNjZXNzIiwicG9zdCIsIl8iLCIkYXBwbHkiLCJwb3N0cyIsInVuc2hpZnQiLCJnZXQiLCJzZXJ2aWNlIiwidGhpcyIsImNvbmZpZyIsIiRyb3V0ZVByb3ZpZGVyIiwid2hlbiIsInRlbXBsYXRlVXJsIiwic3ZjIiwiZ2V0VXNlciIsImhlYWRlcnMiLCJYLUF1dGgiLCJ0b2tlbiIsInZhbCIsImRlZmF1bHRzIiwiY29tbW9uIiwicnVuIiwiJHJvb3RTY29wZSIsIiR0aW1lb3V0IiwiJHdpbmRvdyIsImhvc3QiLCJsb2NhdGlvbiIsImNvbm5lY3Rpb24iLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJjb25zb2xlIiwibG9nIiwib25jbG9zZSIsImUiLCJvbm1lc3NhZ2UiLCJtZXNzYWdlIiwiSlNPTiIsInBhcnNlIiwibmFtZSIsInRvcGljIiwiJGJyb2FkY2FzdCJdLCJtYXBwaW5ncyI6IkFBQ0FBLFFBQUFDLE9BQUEsT0FBQSxZQ0RBRCxRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsbUJBQUEsU0FBQSxTQUFBQyxHQUNBQSxFQUFBQyxJQUFBLGVBQUEsU0FBQUMsRUFBQUMsR0FDQUgsRUFBQUksWUFBQUQsT0NIQU4sUUFBQUMsT0FBQSxPQUNBQyxXQUFBLGFBQUEsU0FBQSxVQUFBLFNBQUFDLEVBQUFLLEdBQ0FMLEVBQUFNLE1BQUEsU0FBQUMsRUFBQUMsR0FDQUgsRUFBQUMsTUFBQUMsRUFBQUMsR0FDQUMsS0FBQSxTQUFBQyxHQUVBVixFQUFBVyxNQUFBLGVBQUFELEVBQUFFLFlDTkFmLFFBQUFDLE9BQUEsT0FDQUMsV0FBQSxhQUFBLFNBQUEsUUFBQSxlQUFBLFNBQUFDLEVBQUFhLEVBQUFDLEdBQ0FkLEVBQUFlLFFBQUEsV0FDQWYsRUFBQWdCLFVBQ0FGLEVBQUFHLE1BQ0FWLFNBQUEsUUFDQVcsS0FBQWxCLEVBQUFnQixXQUVBRyxRQUFBLFNBQUFDLEdBTUFwQixFQUFBZ0IsU0FBQSxRQUtBaEIsRUFBQUMsSUFBQSxjQUFBLFNBQUFvQixFQUFBRCxHQUNBcEIsRUFBQXNCLE9BQUEsV0FDQXRCLEVBQUF1QixNQUFBQyxRQUFBSixPQUlBTixFQUFBVyxNQUNBTixRQUFBLFNBQUFJLEdBQ0F2QixFQUFBdUIsTUFBQUEsT0MzQkExQixRQUFBQyxPQUFBLE9BQ0E0QixRQUFBLGdCQUFBLFFBQUEsU0FBQWIsR0FDQWMsS0FBQUYsSUFBQSxXQUNBLE1BQUFaLEdBQUFZLElBQUEsZUFFQUUsS0FBQVYsS0FBQSxTQUFBRyxHQUNBLE1BQUFQLEdBQUFPLEtBQUEsYUFBQUEsT0NOQXZCLFFBQUFDLE9BQUEsT0FDQThCLFFBQUEsaUJBQUEsU0FBQUMsR0FDQUEsRUFDQUMsS0FBQSxLQUFBL0IsV0FBQSxZQUFBZ0MsWUFBQSxlQUNBRCxLQUFBLGFBQUEvQixXQUFBLGVBQUFnQyxZQUFBLGtCQUNBRCxLQUFBLFVBQUEvQixXQUFBLFlBQUFnQyxZQUFBLGtCQ0xBbEMsUUFBQUMsT0FBQSxPQUNBNEIsUUFBQSxXQUFBLFFBQUEsU0FBQWIsR0FDQSxHQUFBbUIsR0FBQUwsSUFDQUssR0FBQUMsUUFBQSxXQUNBLE1BQUFwQixHQUFBWSxJQUFBLGNBQ0FTLFNBQUFDLFNBQUFSLEtBQUFTLFVBR0FKLEVBQUExQixNQUFBLFNBQUFDLEVBQUFDLEdBQ0EsTUFBQUssR0FBQU8sS0FBQSxpQkFDQWIsU0FBQUEsRUFBQUMsU0FBQUEsSUFFQUMsS0FBQSxTQUFBNEIsR0FHQSxNQUZBTCxHQUFBSSxNQUFBQyxFQUFBekIsS0FDQUMsRUFBQXlCLFNBQUFKLFFBQUFLLE9BQUEsVUFBQUYsRUFBQXpCLEtBQ0FvQixFQUFBQyxnQkNmQXBDLFFBQUFDLE9BQUEsT0FDQTBDLEtBQUEsYUFBQSxXQUFBLFVBQUEsU0FBQUMsRUFBQUMsRUFBQUMsR0FHQSxHQUFBQyxHQUFBLFFBQUFELEVBQUFFLFNBQUFELEtBRUFFLEVBQUEsR0FBQUMsV0FBQUgsRUFFQUUsR0FBQUUsT0FBQSxXQUNBQyxRQUFBQyxJQUFBLHdCQUlBSixFQUFBSyxRQUFBLFNBQUFDLEdBQ0FILFFBQUFDLElBQUEsNkNBSUFKLEVBQUFPLFVBQUEsU0FBQUQsR0FDQUgsUUFBQUMsSUFBQUUsRUFDQSxJQUFBRSxHQUFBQyxLQUFBQyxNQUFBSixFQUFBeEMsTUFFQTZDLEVBQUEsTUFBQUgsRUFBQUksTUFDQTlDLEVBQUEwQyxFQUFBMUMsSUFDQXFDLFNBQUFDLElBQUEsa0JBRUFULEVBQUFrQixXQUFBRixFQUFBN0MiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9UaGlzIGZpbGUgbXVzdCBiZSB0aGUgZmlyc3QgaW4gdGhlIGxpc3QgdG8gYmUgY29uY2F0ZW5hdGVkXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgWyduZ1JvdXRlJ10pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb250cm9sbGVyKCdBcHBsaWNhdGlvbkN0cmwnICwgW1wiJHNjb3BlXCIsIGZ1bmN0aW9uICgkc2NvcGUpIHtcblx0XHQkc2NvcGUuJG9uKCd1c2VyTG9nZ2VkSW4nLCBmdW5jdGlvbihldmVudCwgdXNlcikge1xuXHRcdFx0JHNjb3BlLmN1cnJlbnRVc2VyID0gdXNlcjtcblx0XHR9KVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcgLCBbXCIkc2NvcGVcIiAsIFwiVXNlclN2Y1wiICwgZnVuY3Rpb24gKCRzY29wZSwgVXNlclN2Yykge1xuXHRcdCRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcblx0XHRcdFVzZXJTdmMubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAocmVzcG9uc2Upe1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG5cdFx0XHRcdFx0JHNjb3BlLiRlbWl0KCd1c2VyTG9nZ2VkSW4nLCByZXNwb25zZS5kYXRhKTtcblx0XHRcdFx0fSlcblx0XHR9XG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuY29udHJvbGxlcignUG9zdHNDdHJsJywgW1wiJHNjb3BlXCIgLCBcIiRodHRwXCIsIFwiUG9zdHNTZXJ2aWNlXCIsIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwLCBQb3N0c1NlcnZpY2UpIHtcblx0XHQkc2NvcGUuYWRkUG9zdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICgkc2NvcGUucG9zdEJvZHkpIHtcblx0XHRcdFx0UG9zdHNTZXJ2aWNlLnNlbmQoe1xuXHRcdFx0XHRcdHVzZXJuYW1lOiAndG9taTcnLFxuXHRcdFx0XHRcdGJvZHk6ICRzY29wZS5wb3N0Qm9keVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuc3VjY2VzcyhmdW5jdGlvbiAocG9zdCkge1xuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0Ly9SZW1vdmVkIGFzIHdlYnNvY2tldCBicm9hZGNhc3Qgd291bGQgY2F1c2UgdGhlIHBvc3QgdG8gYXBwZWFyIGR1cGxpY2F0ZWQgb24gdGhlIGJyb3dzZXIgdGhhdCBpdCB3YXMgcG9zdGVkIGZyb20gXG5cdFx0XHRcdFx0Ly9hcyBib3RoIG9mIHRoZSBmdW5jdGlvbnMgd291bGQgZ2V0IGV4ZWN1dGVkIGJlY2F1c2UgdGhlIGNsaWVudCB3aG8gc2VuZHMgdGhlIHBvc3Qgd291bGQgc3RpbGwgcmVjaWV2ZSB0aGUgd2Vic29ja2V0cyBicm9hZGNhc3QgYmFjayBmcm9tIHRoZSBzZXJ2ZXIgIFxuXHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0Ly8kc2NvcGUucG9zdHMudW5zaGlmdChwb3N0KTsgXG5cdFx0XHRcdFx0JHNjb3BlLnBvc3RCb2R5ID0gbnVsbDtcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHQkc2NvcGUuJG9uKCd3czpuZXdfcG9zdCcsIGZ1bmN0aW9uKF8sIHBvc3QpIHtcblx0XHRcdCRzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkc2NvcGUucG9zdHMudW5zaGlmdChwb3N0KTtcblx0XHRcdH0pXG5cdFx0fSlcblxuXHRQb3N0c1NlcnZpY2UuZ2V0KClcblx0XHQuc3VjY2VzcyhmdW5jdGlvbiAocG9zdHMpIHtcblx0XHRcdCRzY29wZS5wb3N0cyA9IHBvc3RzO1xuXHRcdH0pXG5cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5zZXJ2aWNlKCdQb3N0c1NlcnZpY2UnLCBbXCIkaHR0cFwiICwgZnVuY3Rpb24gKCRodHRwKSB7XG5cdFx0dGhpcy5nZXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3Bvc3RzJyk7XG5cdFx0fVxuXHRcdHRoaXMuc2VuZCA9IGZ1bmN0aW9uIChwb3N0KSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9wb3N0cycsIHBvc3QpO1xuXHRcdH1cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb25maWcoW1wiJHJvdXRlUHJvdmlkZXJcIiAsZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XG5cdFx0JHJvdXRlUHJvdmlkZXJcblx0XHRcdC53aGVuKCcvJyAsIHtjb250cm9sbGVyOiAnUG9zdHNDdHJsJywgdGVtcGxhdGVVcmw6ICdwb3N0cy5odG1sJ30pXG5cdFx0XHQud2hlbignL3JlZ2lzdGVyJyAsIHtjb250cm9sbGVyOiAnUmVnaXN0ZXJDdHJsJywgdGVtcGxhdGVVcmw6ICdyZWdpc3Rlci5odG1sJ30pXG5cdFx0XHQud2hlbignL2xvZ2luJyAsIHtjb250cm9sbGVyOiAnTG9naW5DdHJsJywgdGVtcGxhdGVVcmw6ICdsb2dpbi5odG1sJ30pXG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuc2VydmljZSgnVXNlclN2YycsIFtcIiRodHRwXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cdFx0dmFyIHN2YyA9IHRoaXM7XG5cdFx0c3ZjLmdldFVzZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3VzZXJzJywge1xuXHRcdFx0XHRoZWFkZXJzOiB7ICdYLUF1dGgnOiB0aGlzLnRva2VuIH1cblx0XHRcdH0pXG5cdFx0fVxuXHRcdHN2Yy5sb2dpbiA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3Nlc3Npb25zJywge1xuXHRcdFx0XHR1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZFxuXHRcdFx0fSlcblx0XHRcdC50aGVuKGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdFx0c3ZjLnRva2VuID0gdmFsLmRhdGE7XG5cdFx0XHRcdCRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUF1dGgnXSA9IHZhbC5kYXRhXG5cdFx0XHRcdHJldHVybiBzdmMuZ2V0VXNlcigpO1xuXHRcdFx0fSlcblx0XHR9XG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLnJ1bihbXCIkcm9vdFNjb3BlXCIsIFwiJHRpbWVvdXRcIiAsIFwiJHdpbmRvd1wiICwgZnVuY3Rpb24gKCRyb290U2NvcGUsICR0aW1lb3V0LCAkd2luZG93KSB7XG5cdFxuXHRcdC8vQ3JlYXRlIGEgd2Vic29ja2V0IGNvbm5lY3Rpb24gd2l0aCB0aGUgc2VydmVyXG5cdFx0dmFyIGhvc3QgPSBcIndzOi8vXCIgKyAkd2luZG93LmxvY2F0aW9uLmhvc3Rcblx0XHQgIFxuXHRcdHZhciBjb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldChob3N0KVxuXG5cdFx0Y29ubmVjdGlvbi5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnV2Vic29ja2V0IGNvbm5lY3RlZCcpXG5cdFx0fVxuXG5cblx0XHRjb25uZWN0aW9uLm9uY2xvc2UgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ1dlYnNvY2tldCBjbG9zZWQuIFRyeWluZyB0byByZWNvbm5lY3QuLi4nKVxuXHRcdFx0Ly8kdGltZW91dChjb25uZWN0LCAxMCoxMDAwKTtcblx0XHR9IFxuXG5cdFx0Y29ubmVjdGlvbi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0Y29uc29sZS5sb2coZSk7XG5cdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcblx0XHRcdFxuXHRcdFx0dmFyIG5hbWUgPSAnd3M6JyArIG1lc3NhZ2UudG9waWM7XG5cdFx0XHR2YXIgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcblx0XHRcdGNvbnNvbGUubG9nKFwiYnJvYWRjYXN0aW5nOiBcIik7XG5cblx0XHRcdCRyb290U2NvcGUuJGJyb2FkY2FzdChuYW1lLCBkYXRhKTtcblx0XHR9XG5cbn1dKSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==