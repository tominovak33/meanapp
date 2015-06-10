angular.module("app",["ngRoute"]),angular.module("app").controller("ApplicationCtrl",["$scope",function(t){t.$on("userLoggedIn",function(o,n){t.currentUser=n})}]),angular.module("app").controller("LoginCtrl",["$scope","UserSvc",function(t,o){t.login=function(n,e){o.login(n,e).then(function(o){t.$emit("userLoggedIn",o.data)})}}]),angular.module("app").controller("PostsCtrl",["$scope","$http","PostsService",function(t,o,n){t.addPost=function(){t.postBody&&n.send({username:"tomi7",body:t.postBody}).success(function(o){t.posts.unshift(o),t.postBody=null})},t.$on("ws:new_post",["_","post",function(o,n){t.$apply(function(){t.posts.unshift(n)})}]),n.get().success(function(o){t.posts=o})}]),angular.module("app").service("PostsService",["$http",function(t){this.get=function(){return t.get("/api/posts")},this.send=function(o){return t.post("/api/posts",o)}}]),angular.module("app").config(["$routeProvider",function(t){t.when("/",{controller:"PostsCtrl",templateUrl:"posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"login.html"})}]),angular.module("app").service("UserSvc",["$http",function(t){var o=this;o.getUser=function(){return t.get("/api/users",{headers:{"X-Auth":this.token}})},o.login=function(n,e){return t.post("/api/sessions",{username:n,password:e}).then(function(n){return o.token=n.data,t.defaults.headers.common["X-Auth"]=n.data,o.getUser()})}}]),angular.module("app").run(["$rootScope",function(t){var o="ws://localhost:3000",n=new WebSocket(o);n.onopen=function(){console.log("Websocket connected")},n.onmessage=function(o){console.log(o);var n=JSON.parse(o.data);t.$broadcast("ws:"+n.topic,n.data)}}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uQ3RybC5qcyIsImxvZ2luQ3J0bC5qcyIsInBvc3RzQ3RybC5qcyIsInBvc3RzU2VydmljZS5qcyIsInJvdXRlcy5qcyIsInVzZXJTZXJ2aWNlLmpzIiwid2Vic29ja2V0cy5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29udHJvbGxlciIsIiRzY29wZSIsIiRvbiIsImV2ZW50IiwidXNlciIsImN1cnJlbnRVc2VyIiwiVXNlclN2YyIsImxvZ2luIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInRoZW4iLCJyZXNwb25zZSIsIiRlbWl0IiwiZGF0YSIsIiRodHRwIiwiUG9zdHNTZXJ2aWNlIiwiYWRkUG9zdCIsInBvc3RCb2R5Iiwic2VuZCIsImJvZHkiLCJzdWNjZXNzIiwicG9zdCIsInBvc3RzIiwidW5zaGlmdCIsIl8iLCIkYXBwbHkiLCJnZXQiLCJzZXJ2aWNlIiwidGhpcyIsImNvbmZpZyIsIiRyb3V0ZVByb3ZpZGVyIiwid2hlbiIsInRlbXBsYXRlVXJsIiwic3ZjIiwiZ2V0VXNlciIsImhlYWRlcnMiLCJYLUF1dGgiLCJ0b2tlbiIsInZhbCIsImRlZmF1bHRzIiwiY29tbW9uIiwicnVuIiwiJHJvb3RTY29wZSIsInVybCIsImNvbm5lY3Rpb24iLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJjb25zb2xlIiwibG9nIiwib25tZXNzYWdlIiwiZSIsIm1lc3NhZ2UiLCJKU09OIiwicGFyc2UiLCIkYnJvYWRjYXN0IiwidG9waWMiXSwibWFwcGluZ3MiOiJBQUNBQSxRQUFBQyxPQUFBLE9BQUEsWUNEQUQsUUFBQUMsT0FBQSxPQUNBQyxXQUFBLG1CQUFBLFNBQUEsU0FBQUMsR0FDQUEsRUFBQUMsSUFBQSxlQUFBLFNBQUFDLEVBQUFDLEdBQ0FILEVBQUFJLFlBQUFELE9DSEFOLFFBQUFDLE9BQUEsT0FDQUMsV0FBQSxhQUFBLFNBQUEsVUFBQSxTQUFBQyxFQUFBSyxHQUNBTCxFQUFBTSxNQUFBLFNBQUFDLEVBQUFDLEdBQ0FILEVBQUFDLE1BQUFDLEVBQUFDLEdBQ0FDLEtBQUEsU0FBQUMsR0FFQVYsRUFBQVcsTUFBQSxlQUFBRCxFQUFBRSxZQ05BZixRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsYUFBQSxTQUFBLFFBQUEsZUFBQSxTQUFBQyxFQUFBYSxFQUFBQyxHQUNBZCxFQUFBZSxRQUFBLFdBQ0FmLEVBQUFnQixVQUNBRixFQUFBRyxNQUNBVixTQUFBLFFBQ0FXLEtBQUFsQixFQUFBZ0IsV0FFQUcsUUFBQSxTQUFBQyxHQUNBcEIsRUFBQXFCLE1BQUFDLFFBQUFGLEdBQ0FwQixFQUFBZ0IsU0FBQSxRQUtBaEIsRUFBQUMsSUFBQSxlQUFBLElBQUEsT0FBQSxTQUFBc0IsRUFBQUgsR0FDQXBCLEVBQUF3QixPQUFBLFdBQ0F4QixFQUFBcUIsTUFBQUMsUUFBQUYsUUFJQU4sRUFBQVcsTUFDQU4sUUFBQSxTQUFBRSxHQUNBckIsRUFBQXFCLE1BQUFBLE9DdkJBeEIsUUFBQUMsT0FBQSxPQUNBNEIsUUFBQSxnQkFBQSxRQUFBLFNBQUFiLEdBQ0FjLEtBQUFGLElBQUEsV0FDQSxNQUFBWixHQUFBWSxJQUFBLGVBRUFFLEtBQUFWLEtBQUEsU0FBQUcsR0FDQSxNQUFBUCxHQUFBTyxLQUFBLGFBQUFBLE9DTkF2QixRQUFBQyxPQUFBLE9BQ0E4QixRQUFBLGlCQUFBLFNBQUFDLEdBQ0FBLEVBQ0FDLEtBQUEsS0FBQS9CLFdBQUEsWUFBQWdDLFlBQUEsZUFDQUQsS0FBQSxhQUFBL0IsV0FBQSxlQUFBZ0MsWUFBQSxrQkFDQUQsS0FBQSxVQUFBL0IsV0FBQSxZQUFBZ0MsWUFBQSxrQkNMQWxDLFFBQUFDLE9BQUEsT0FDQTRCLFFBQUEsV0FBQSxRQUFBLFNBQUFiLEdBQ0EsR0FBQW1CLEdBQUFMLElBQ0FLLEdBQUFDLFFBQUEsV0FDQSxNQUFBcEIsR0FBQVksSUFBQSxjQUNBUyxTQUFBQyxTQUFBUixLQUFBUyxVQUdBSixFQUFBMUIsTUFBQSxTQUFBQyxFQUFBQyxHQUNBLE1BQUFLLEdBQUFPLEtBQUEsaUJBQ0FiLFNBQUFBLEVBQUFDLFNBQUFBLElBRUFDLEtBQUEsU0FBQTRCLEdBR0EsTUFGQUwsR0FBQUksTUFBQUMsRUFBQXpCLEtBQ0FDLEVBQUF5QixTQUFBSixRQUFBSyxPQUFBLFVBQUFGLEVBQUF6QixLQUNBb0IsRUFBQUMsZ0JDZkFwQyxRQUFBQyxPQUFBLE9BQ0EwQyxLQUFBLGFBQUEsU0FBQUMsR0FDQSxHQUFBQyxHQUFBLHNCQUVBQyxFQUFBLEdBQUFDLFdBQUFGLEVBRUFDLEdBQUFFLE9BQUEsV0FDQUMsUUFBQUMsSUFBQSx3QkFHQUosRUFBQUssVUFBQSxTQUFBQyxHQUNBSCxRQUFBQyxJQUFBRSxFQUNBLElBQUFDLEdBQUFDLEtBQUFDLE1BQUFILEVBQUFyQyxLQUNBNkIsR0FBQVksV0FBQSxNQUFBSCxFQUFBSSxNQUFBSixFQUFBdEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9UaGlzIGZpbGUgbXVzdCBiZSB0aGUgZmlyc3QgaW4gdGhlIGxpc3QgdG8gYmUgY29uY2F0ZW5hdGVkXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgWyduZ1JvdXRlJ10pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb250cm9sbGVyKCdBcHBsaWNhdGlvbkN0cmwnICwgW1wiJHNjb3BlXCIsIGZ1bmN0aW9uICgkc2NvcGUpIHtcblx0XHQkc2NvcGUuJG9uKCd1c2VyTG9nZ2VkSW4nLCBmdW5jdGlvbihldmVudCwgdXNlcikge1xuXHRcdFx0JHNjb3BlLmN1cnJlbnRVc2VyID0gdXNlcjtcblx0XHR9KVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcgLCBbXCIkc2NvcGVcIiAsIFwiVXNlclN2Y1wiICwgZnVuY3Rpb24gKCRzY29wZSwgVXNlclN2Yykge1xuXHRcdCRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcblx0XHRcdFVzZXJTdmMubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAocmVzcG9uc2Upe1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG5cdFx0XHRcdFx0JHNjb3BlLiRlbWl0KCd1c2VyTG9nZ2VkSW4nLCByZXNwb25zZS5kYXRhKTtcblx0XHRcdFx0fSlcblx0XHR9XG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuY29udHJvbGxlcignUG9zdHNDdHJsJywgW1wiJHNjb3BlXCIgLCBcIiRodHRwXCIsIFwiUG9zdHNTZXJ2aWNlXCIgLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgUG9zdHNTZXJ2aWNlKSB7XG5cdFx0JHNjb3BlLmFkZFBvc3QgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoJHNjb3BlLnBvc3RCb2R5KSB7XG5cdFx0XHRcdFBvc3RzU2VydmljZS5zZW5kKHtcblx0XHRcdFx0XHR1c2VybmFtZTogJ3RvbWk3Jyxcblx0XHRcdFx0XHRib2R5OiAkc2NvcGUucG9zdEJvZHlcblx0XHRcdFx0fSlcblx0XHRcdFx0LnN1Y2Nlc3MoZnVuY3Rpb24gKHBvc3QpIHtcblx0XHRcdFx0XHQkc2NvcGUucG9zdHMudW5zaGlmdChwb3N0KTtcblx0XHRcdFx0XHQkc2NvcGUucG9zdEJvZHkgPSBudWxsO1xuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdCRzY29wZS4kb24oJ3dzOm5ld19wb3N0JywgW1wiX1wiLCBcInBvc3RcIiwgZnVuY3Rpb24gKF8scG9zdCkge1xuXHRcdFx0JHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCRzY29wZS5wb3N0cy51bnNoaWZ0KHBvc3QpO1xuXHRcdFx0fSlcblx0XHR9XSlcblxuXHRQb3N0c1NlcnZpY2UuZ2V0KClcblx0XHQuc3VjY2VzcyhmdW5jdGlvbiAocG9zdHMpIHtcblx0XHRcdCRzY29wZS5wb3N0cyA9IHBvc3RzO1xuXHRcdH0pXG5cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5zZXJ2aWNlKCdQb3N0c1NlcnZpY2UnLCBbXCIkaHR0cFwiICwgZnVuY3Rpb24gKCRodHRwKSB7XG5cdFx0dGhpcy5nZXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3Bvc3RzJyk7XG5cdFx0fVxuXHRcdHRoaXMuc2VuZCA9IGZ1bmN0aW9uIChwb3N0KSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9wb3N0cycsIHBvc3QpO1xuXHRcdH1cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb25maWcoW1wiJHJvdXRlUHJvdmlkZXJcIiAsZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XG5cdFx0JHJvdXRlUHJvdmlkZXJcblx0XHRcdC53aGVuKCcvJyAsIHtjb250cm9sbGVyOiAnUG9zdHNDdHJsJywgdGVtcGxhdGVVcmw6ICdwb3N0cy5odG1sJ30pXG5cdFx0XHQud2hlbignL3JlZ2lzdGVyJyAsIHtjb250cm9sbGVyOiAnUmVnaXN0ZXJDdHJsJywgdGVtcGxhdGVVcmw6ICdyZWdpc3Rlci5odG1sJ30pXG5cdFx0XHQud2hlbignL2xvZ2luJyAsIHtjb250cm9sbGVyOiAnTG9naW5DdHJsJywgdGVtcGxhdGVVcmw6ICdsb2dpbi5odG1sJ30pXG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuc2VydmljZSgnVXNlclN2YycsIFtcIiRodHRwXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cdFx0dmFyIHN2YyA9IHRoaXM7XG5cdFx0c3ZjLmdldFVzZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3VzZXJzJywge1xuXHRcdFx0XHRoZWFkZXJzOiB7ICdYLUF1dGgnOiB0aGlzLnRva2VuIH1cblx0XHRcdH0pXG5cdFx0fVxuXHRcdHN2Yy5sb2dpbiA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3Nlc3Npb25zJywge1xuXHRcdFx0XHR1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZFxuXHRcdFx0fSlcblx0XHRcdC50aGVuKGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdFx0c3ZjLnRva2VuID0gdmFsLmRhdGE7XG5cdFx0XHRcdCRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUF1dGgnXSA9IHZhbC5kYXRhXG5cdFx0XHRcdHJldHVybiBzdmMuZ2V0VXNlcigpO1xuXHRcdFx0fSlcblx0XHR9XG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQucnVuKFtcIiRyb290U2NvcGVcIiwgZnVuY3Rpb24gKCRyb290U2NvcGUpIHtcblx0XHR2YXIgdXJsID0gJ3dzOi8vbG9jYWxob3N0OjMwMDAnXG5cblx0XHR2YXIgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQodXJsKVxuXG5cdFx0Y29ubmVjdGlvbi5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnV2Vic29ja2V0IGNvbm5lY3RlZCcpXG5cdFx0fVxuXG5cdFx0Y29ubmVjdGlvbi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0Y29uc29sZS5sb2coZSk7XG5cdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcblx0XHRcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnd3M6JysgbWVzc2FnZS50b3BpYywgbWVzc2FnZS5kYXRhKVxuXHRcdH1cblx0fV0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9