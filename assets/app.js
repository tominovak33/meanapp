angular.module("app",["ngRoute","ngAnimate"]),angular.module("app").controller("ApplicationCtrl",["$scope","$rootScope","UserSvc",function(t,e,n){window.localStorage.token&&n.getUser().then(function(e){t.$emit("userLoggedIn",e.data)}),t.$on("userLoggedIn",function(e,n){t.currentUser=n})}]),angular.module("app").controller("LoginCtrl",["$scope","UserSvc",function(t,e){t.login=function(n,o){e.login(n,o).then(function(e){t.$emit("userLoggedIn",e.data),window.location.href="#/"},function(e){t.loginValidation="Incorrect username & password combination"})},t.logout=function(){e.logout()}}]),angular.module("app").controller("PostsCtrl",["$scope","$http","PostsService","filterFilter",function(t,e,n,o){t.baseUrl=location.host,t.bodyLengthLimit=250,t.posts=[],t.addPost=function(){var e=CKEDITOR.instances.editor1.getData(),o=t.urlDate(),r=t.slugify(t.postTitle),s=o+r;e&&n.send({body:e,title:t.postTitle,slug:s}).success(function(e){t.postBody=null,CKEDITOR.instances.editor1.setData(""),t.postTitle=null})},t.init_ckedit=function(){CKEDITOR.replace("editor1")},t.$on("ws:new_post",function(e,n){n=n[0],t.$apply(function(){t.posts.unshift(n),t.paginate()})}),t.$on("$viewContentLoaded",function(){}),t.currentPage=1,t.postsPerPage=5,t.prevPage=function(){t.currentPage>1&&t.currentPage--},t.nextPage=function(){t.currentPage<t.posts.length/t.postsPerPage&&t.currentPage++},t.setPage=function(e){t.currentPage=e},t.range=function(t){return new Array(t)},t.currentPage=1,t.postsPerPage=5,t.$watch("search",function(e){t.filteredPosts=o(t.posts,e),t.paginate(t.filteredPosts.length)},!0),t.paginate=function(e){t.numberOfPages=Math.ceil(e>0?e/t.postsPerPage:t.posts.length/t.postsPerPage)},t.urlDate=function(t){if(void 0===t)var e=new Date;else var e=new Date(t);var n=e.getDate(),o=e.getMonth()+1,r=e.getFullYear(),s=String(r)+"-"+String(o)+"-"+String(n)+"-";return s},t.slugify=function(t){var e=t.toLowerCase();return e=e.replace(/\s+/g,"_"),e=e.replace(/\?/g,""),e=e.replace(/\&/g,""),e=e.replace(/\=/g,"")},n.get().success(function(e){t.posts=e,console.log(e),t.paginate(t.posts.length)})}]).filter("output_html",["$sce",function(t){return function(e){return t.trustAsHtml(e)}}]).filter("startFrom",function(){return function(t,e){return t?(e=+e,t.slice(e)):[]}}),angular.module("app").service("PostsService",["$http",function(t){this.get=function(){return t.get("/api/posts")},this.send=function(e){return t.post("/api/posts",e)},this.single=function(e){return t.get("/api/posts",{params:{post_slug:e.slug}})}}]),angular.module("app").controller("RegisterCtrl",["$scope","UserSvc",function(t,e){t.register=function(n,o,r){return o!=r?void(t.validationMessage="Your passwords did not match."):void e.register(n,o)}}]),angular.module("app").config(["$routeProvider",function(t){t.when("/",{controller:"PostsCtrl",templateUrl:"posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"login.html"}).when("/logout",{controller:"LoginCtrl",templateUrl:"logout.html"}).when("/post/:slug",{controller:"SinglePostCtrl",templateUrl:"singlePost.html"})}]),angular.module("app").controller("SinglePostCtrl",["$scope","$http","PostsService","$routeParams","$route","$location",function(t,e,n,o,r,s){var i=o.slug;t.$on("$viewContentLoaded",function(){}),n.single({slug:i}).success(function(e){t.post=e})}]),angular.module("app").service("UserSvc",["$http",function(t){var e=this;e.getUser=function(){return t.defaults.headers.common["X-Auth"]=window.localStorage.token,t.get("/api/users").then(function(t){return t})},e.login=function(n,o){return t.post("/api/sessions",{username:n,password:o}).then(function(n){return window.localStorage.token=n.data,t.defaults.headers.common["X-Auth"]=n.data,e.getUser()})},e.register=function(n,o,r){return t.post("/api/users",{username:n,password:o}).then(function(t){return e.login(n,o).then(function(){window.location.href="/"})})},e.logout=function(){window.localStorage.removeItem("token"),window.location.href="/"}}]),angular.module("app").run(["$rootScope","$timeout","$window",function(t,e,n){!function o(){var r="ws://"+n.location.host,s=new WebSocket(r);s.onopen=function(){},s.onclose=function(t){e(o,1e4)},s.onmessage=function(e){var n=JSON.parse(e.data),o="ws:"+n.topic,r=n.data;t.$broadcast(o,r)}}()}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uQ3RybC5qcyIsImxvZ2luQ3J0bC5qcyIsInBvc3RzQ3RybC5qcyIsInBvc3RzU2VydmljZS5qcyIsInJlZ2lzdHJhdGlvbkN0cmwuanMiLCJyb3V0ZXMuanMiLCJzaW5nbGVQb3N0c0N0cmwuanMiLCJ1c2VyU2VydmljZS5qcyIsIndlYnNvY2tldHMuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCIkcm9vdFNjb3BlIiwiVXNlclN2YyIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsInRva2VuIiwiZ2V0VXNlciIsInRoZW4iLCJyZXNwb25zZSIsIiRlbWl0IiwiZGF0YSIsIiRvbiIsImV2ZW50IiwidXNlciIsImN1cnJlbnRVc2VyIiwibG9naW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwibG9jYXRpb24iLCJocmVmIiwiZXJyb3IiLCJsb2dpblZhbGlkYXRpb24iLCJsb2dvdXQiLCIkaHR0cCIsIlBvc3RzU2VydmljZSIsImZpbHRlckZpbHRlciIsImJhc2VVcmwiLCJob3N0IiwiYm9keUxlbmd0aExpbWl0IiwicG9zdHMiLCJhZGRQb3N0IiwiY2tlZGl0b3JfY29udGVudCIsIkNLRURJVE9SIiwiaW5zdGFuY2VzIiwiZWRpdG9yMSIsImdldERhdGEiLCJkYXRlX3NsdWciLCJ1cmxEYXRlIiwidGl0bGVfc2x1ZyIsInNsdWdpZnkiLCJwb3N0VGl0bGUiLCJzbHVnIiwic2VuZCIsImJvZHkiLCJ0aXRsZSIsInN1Y2Nlc3MiLCJwb3N0IiwicG9zdEJvZHkiLCJzZXREYXRhIiwiaW5pdF9ja2VkaXQiLCJyZXBsYWNlIiwiXyIsIiRhcHBseSIsInVuc2hpZnQiLCJwYWdpbmF0ZSIsImN1cnJlbnRQYWdlIiwicG9zdHNQZXJQYWdlIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsImxlbmd0aCIsInNldFBhZ2UiLCJwYWdlX251bWJlciIsInJhbmdlIiwibiIsIkFycmF5IiwiJHdhdGNoIiwidGVybSIsImZpbHRlcmVkUG9zdHMiLCJudW1iZXJfb2ZfaXRlbXMiLCJudW1iZXJPZlBhZ2VzIiwiTWF0aCIsImNlaWwiLCJ0aW1lIiwidW5kZWZpbmVkIiwiZGF0ZSIsIkRhdGUiLCJkYXkiLCJnZXREYXRlIiwibW9udGgiLCJnZXRNb250aCIsInllYXIiLCJnZXRGdWxsWWVhciIsInVybF9kYXRlIiwiU3RyaW5nIiwic3RyaW5nIiwidG9Mb3dlckNhc2UiLCJnZXQiLCJjb25zb2xlIiwibG9nIiwiZmlsdGVyIiwiJHNjZSIsInZhbCIsInRydXN0QXNIdG1sIiwiaW5wdXQiLCJzdGFydCIsInNsaWNlIiwic2VydmljZSIsInRoaXMiLCJzaW5nbGUiLCJwYXJhbWV0ZXJzIiwicGFyYW1zIiwicG9zdF9zbHVnIiwicmVnaXN0ZXIiLCJwYXNzd29yZF9jb25maXJtIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJjb25maWciLCIkcm91dGVQcm92aWRlciIsIndoZW4iLCJ0ZW1wbGF0ZVVybCIsIiRyb3V0ZVBhcmFtcyIsIiRyb3V0ZSIsIiRsb2NhdGlvbiIsInN2YyIsImRlZmF1bHRzIiwiaGVhZGVycyIsImNvbW1vbiIsInJlbW92ZUl0ZW0iLCJydW4iLCIkdGltZW91dCIsIiR3aW5kb3ciLCJjb25uZWN0IiwiY29ubmVjdGlvbiIsIldlYlNvY2tldCIsIm9ub3BlbiIsIm9uY2xvc2UiLCJlIiwib25tZXNzYWdlIiwibWVzc2FnZSIsIkpTT04iLCJwYXJzZSIsIm5hbWUiLCJ0b3BpYyIsIiRicm9hZGNhc3QiXSwibWFwcGluZ3MiOiJBQUNBQSxRQUFBQyxPQUFBLE9BQUEsVUFBQSxjQ0RBRCxRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsbUJBQUEsU0FBQSxhQUFBLFVBQUEsU0FBQUMsRUFBQUMsRUFBQUMsR0FPQUMsT0FBQUMsYUFBQUMsT0FDQUgsRUFBQUksVUFDQUMsS0FBQSxTQUFBQyxHQUNBUixFQUFBUyxNQUFBLGVBQUFELEVBQUFFLFFBSUFWLEVBQUFXLElBQUEsZUFBQSxTQUFBQyxFQUFB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LFdBQUEvRixFQUVBOEYsR0FBQUUsT0FBQSxhQUtBRixFQUFBRyxRQUFBLFNBQUFDLEdBRUFQLEVBQUFFLEVBQUEsTUFHQUMsRUFBQUssVUFBQSxTQUFBRCxHQUVBLEdBQUFFLEdBQUFDLEtBQUFDLE1BQUFKLEVBQUFuSCxNQUVBd0gsRUFBQSxNQUFBSCxFQUFBSSxNQUNBekgsRUFBQXFILEVBQUFySCxJQUdBVCxHQUFBbUksV0FBQUYsRUFBQXhIIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vVGhpcyBmaWxlIG11c3QgYmUgdGhlIGZpcnN0IGluIHRoZSBsaXN0IHRvIGJlIGNvbmNhdGVuYXRlZFxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnbmdSb3V0ZScsICduZ0FuaW1hdGUnXSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LmNvbnRyb2xsZXIoJ0FwcGxpY2F0aW9uQ3RybCcgLCBbXCIkc2NvcGVcIiwgXCIkcm9vdFNjb3BlXCIsIFwiVXNlclN2Y1wiLCBmdW5jdGlvbiAoJHNjb3BlLCAkcm9vdFNjb3BlLCBVc2VyU3ZjKSB7XG5cdFx0Lypcblx0XHRJZiB3ZSBoYXZlIGEgc3RvcmVkIHRva2VuLCBnZXQgdGhlIHVzZXIgaW5mb3JtYXRpb24gZnJvbSBpdFxuXHRcdGFuZCBlbWl0IHRoZSB1c2VyIGxvZ2dlZGluIG1lc3NhZ2VzIGluIG9yZGVyIHRvIGFsbG93IHRoZSBVSSB0byBcblx0XHRpbmRpY2F0ZSB0byB0aGUgdXNlciB0aGF0IHRoZXkgd2VyZSBsb2dnZWQgaW5cblx0XHQqL1xuXHRcdFxuXHRcdGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLnRva2VuKSB7XG5cdFx0XHRVc2VyU3ZjLmdldFVzZXIoKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAocmVzcG9uc2Upe1xuXHRcdFx0XHRcdCRzY29wZS4kZW1pdCgndXNlckxvZ2dlZEluJywgcmVzcG9uc2UuZGF0YSk7XG5cdFx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0JHNjb3BlLiRvbigndXNlckxvZ2dlZEluJywgZnVuY3Rpb24oZXZlbnQsIHVzZXIpIHtcblx0XHRcdCRzY29wZS5jdXJyZW50VXNlciA9IHVzZXI7XG5cdFx0fSlcblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb250cm9sbGVyKCdMb2dpbkN0cmwnICwgW1wiJHNjb3BlXCIgLCBcIlVzZXJTdmNcIiAsIGZ1bmN0aW9uICgkc2NvcGUsIFVzZXJTdmMpIHtcblx0XHQkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG5cdFx0XHRVc2VyU3ZjLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZClcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKXtcblx0XHRcdFx0XHQkc2NvcGUuJGVtaXQoJ3VzZXJMb2dnZWRJbicsIHJlc3BvbnNlLmRhdGEpO1xuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJyMvJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmdW5jdGlvbihlcnJvcil7XG5cdFx0XHRcdCAgJHNjb3BlLmxvZ2luVmFsaWRhdGlvbiA9ICdJbmNvcnJlY3QgdXNlcm5hbWUgJiBwYXNzd29yZCBjb21iaW5hdGlvbic7XG5cdFx0XHRcdH0pXG5cblx0XHR9XG5cblx0XHQkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0VXNlclN2Yy5sb2dvdXQoKVxuXHRcdH1cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb250cm9sbGVyKCdQb3N0c0N0cmwnLCBbXCIkc2NvcGVcIiAsIFwiJGh0dHBcIiwgXCJQb3N0c1NlcnZpY2VcIiwgXCJmaWx0ZXJGaWx0ZXJcIiwgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsIFBvc3RzU2VydmljZSwgZmlsdGVyRmlsdGVyKSB7XG5cdFx0JHNjb3BlLmJhc2VVcmwgPSBsb2NhdGlvbi5ob3N0O1xuXHRcdCRzY29wZS5ib2R5TGVuZ3RoTGltaXQgPSAyNTA7XG5cblx0XHQkc2NvcGUucG9zdHMgPSBbXTtcblx0XHQkc2NvcGUuYWRkUG9zdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBja2VkaXRvcl9jb250ZW50ID0gQ0tFRElUT1IuaW5zdGFuY2VzLmVkaXRvcjEuZ2V0RGF0YSgpO1xuXHRcdFx0dmFyIGRhdGVfc2x1ZyA9ICRzY29wZS51cmxEYXRlKCk7XG5cdFx0XHR2YXIgdGl0bGVfc2x1ZyA9ICRzY29wZS5zbHVnaWZ5KCRzY29wZS5wb3N0VGl0bGUpO1xuXG5cdFx0XHR2YXIgc2x1ZyA9IGRhdGVfc2x1ZyArIHRpdGxlX3NsdWc7XG5cblx0XHRcdGlmIChja2VkaXRvcl9jb250ZW50KSB7XG5cdFx0XHRcdFBvc3RzU2VydmljZS5zZW5kKHtcblx0XHRcdFx0XHRib2R5OiBja2VkaXRvcl9jb250ZW50LFxuXHRcdFx0XHRcdHRpdGxlOiAkc2NvcGUucG9zdFRpdGxlLFxuXHRcdFx0XHRcdHNsdWc6IHNsdWdcblx0XHRcdFx0fSlcblx0XHRcdFx0LnN1Y2Nlc3MoZnVuY3Rpb24gKHBvc3QpIHtcblx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdC8vUmVtb3ZlZCBhcyB3ZWJzb2NrZXQgYnJvYWRjYXN0IHdvdWxkIGNhdXNlIHRoZSBwb3N0IHRvIGFwcGVhciBkdXBsaWNhdGVkIG9uIHRoZSBicm93c2VyIHRoYXQgaXQgd2FzIHBvc3RlZCBmcm9tIFxuXHRcdFx0XHRcdC8vYXMgYm90aCBvZiB0aGUgZnVuY3Rpb25zIHdvdWxkIGdldCBleGVjdXRlZCBiZWNhdXNlIHRoZSBjbGllbnQgd2hvIHNlbmRzIHRoZSBwb3N0IHdvdWxkIHN0aWxsIHJlY2lldmUgdGhlIHdlYnNvY2tldHMgYnJvYWRjYXN0IGJhY2sgZnJvbSB0aGUgc2VydmVyICBcblx0XHRcdFx0XHQqL1xuXHRcdFx0XHRcdCRzY29wZS5wb3N0Qm9keSA9IG51bGw7XG5cdFx0XHRcdFx0Q0tFRElUT1IuaW5zdGFuY2VzLmVkaXRvcjEuc2V0RGF0YSgnJyk7XG5cdFx0XHRcdFx0JHNjb3BlLnBvc3RUaXRsZSA9IG51bGw7XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0JHNjb3BlLmluaXRfY2tlZGl0ID0gZnVuY3Rpb24gKCkge1xuXHRcdCAgICBDS0VESVRPUi5yZXBsYWNlKCdlZGl0b3IxJyk7XG5cdFx0fVxuXG5cdFx0JHNjb3BlLiRvbignd3M6bmV3X3Bvc3QnLCBmdW5jdGlvbihfLCBwb3N0KSB7XG5cdFx0XHRwb3N0ID0gcG9zdFswXTtcblx0XHRcdCRzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkc2NvcGUucG9zdHMudW5zaGlmdChwb3N0KTtcblx0XHRcdFx0JHNjb3BlLnBhZ2luYXRlKCk7XG5cdFx0XHR9KVxuXHRcdH0pXG5cblx0XHQkc2NvcGUuJG9uKCckdmlld0NvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpe1xuXHRcdFx0Ly90aGUgcGFnZSBpcyByZWFkeVxuXHRcdH0pO1xuXG5cdFx0JHNjb3BlLmN1cnJlbnRQYWdlID0gMTtcblx0XHQkc2NvcGUucG9zdHNQZXJQYWdlID0gNTtcblxuXHRcdCRzY29wZS5wcmV2UGFnZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAoJHNjb3BlLmN1cnJlbnRQYWdlID4gMSkge1xuXHQgICAgICAgICAgICAkc2NvcGUuY3VycmVudFBhZ2UtLTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuICAgIFxuXHQgICAgJHNjb3BlLm5leHRQYWdlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICgkc2NvcGUuY3VycmVudFBhZ2UgPCAkc2NvcGUucG9zdHMubGVuZ3RoLyRzY29wZS5wb3N0c1BlclBhZ2UpIHtcblx0ICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRQYWdlKys7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIFxuXHQgICAgJHNjb3BlLnNldFBhZ2UgPSBmdW5jdGlvbiAocGFnZV9udW1iZXIpIHtcblx0ICAgICAgICAkc2NvcGUuY3VycmVudFBhZ2UgPSBwYWdlX251bWJlcjtcblx0ICAgIH07XG5cblx0ICAgIC8vVGhpcyB3YXkgSSBjYW4gZG86ICBcIjxsaSBuZy1yZXBlYXQ9XCJuIGluIHJhbmdlKHBhZ2VzKSB0cmFjayBieSAkaW5kZXhcIj5cIiBhbmQgc28gSSBjYW4gZGlzcGxheSBhcyBtYW55IGl0ZW1zIGFzIHRoZSB2YWx1ZSBvZiBhIG51bWJlciBhcyB0aGlzIHJldHVybnMgYW4gYXJyYXkgb2YgdGhhdCBsZW5naHRcblx0ICAgICRzY29wZS5yYW5nZSA9IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgXHRyZXR1cm4gbmV3IEFycmF5KG4pO1xuICAgIFx0fTtcblxuXHQgICAgJHNjb3BlLmN1cnJlbnRQYWdlID0gMTsgLy9jdXJyZW50IHBhZ2Vcblx0ICAgICRzY29wZS5wb3N0c1BlclBhZ2UgPSA1OyAvL21heCByb3dzIGZvciBkYXRhIHRhYmxlXG5cdCAgICBcblx0ICAgIC8vd2F0Y2ggdG8gc2VlIGlmIHNlYXJjaGluZyBhbmQgcmVwYWdpbmF0ZSBpZiB3ZSBhcmVcblx0ICAgIC8vdHJ1ZSBhdCB0aGUgZW5kICBtYWdpY2FsbHkgbWFrZXMgaXQgc28gdGhhdCBhcyBlYWNoIGV4dHJhIGxldHRlciBpcyBhZGRlZCB0byB0aGUgc2VhcmNoIHdlIGNhbiByZXBhZ2luYXRlXG5cdCAgICAvL3dpdGhvdXQgdGhlICd0cnVlJyBpdCBvbmx5IGRpZCAgdGhhdFxuXHQgICAgJHNjb3BlLiR3YXRjaCgnc2VhcmNoJywgZnVuY3Rpb24odGVybSkge1xuXHQgICAgICAgICRzY29wZS5maWx0ZXJlZFBvc3RzID0gZmlsdGVyRmlsdGVyKCRzY29wZS5wb3N0cywgdGVybSk7XG5cdCAgICAgICAgJHNjb3BlLnBhZ2luYXRlKCRzY29wZS5maWx0ZXJlZFBvc3RzLmxlbmd0aCk7XG5cdCAgICB9LCB0cnVlKTtcblxuXG5cdCAgICAkc2NvcGUucGFnaW5hdGUgPSBmdW5jdGlvbihudW1iZXJfb2ZfaXRlbXMpe1xuXHQgICAgXHRpZiAobnVtYmVyX29mX2l0ZW1zID4gMCkge1xuXHQgICAgICAgIFx0JHNjb3BlLm51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwobnVtYmVyX29mX2l0ZW1zLyRzY29wZS5wb3N0c1BlclBhZ2UpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbHNlIHtcblx0ICAgICAgICBcdCRzY29wZS5udW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKCRzY29wZS5wb3N0cy5sZW5ndGgvJHNjb3BlLnBvc3RzUGVyUGFnZSk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgJHNjb3BlLnVybERhdGUgPSBmdW5jdGlvbih0aW1lKSB7XG5cdFx0XHRpZiAodGltZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHRpbWUpO1xuXHRcdFx0fVxuXHRcdCAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG5cdFx0ICAgIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSsxOyAvLysxIGJlY2F1c2UgbW9udGhzIGFyZSAwIGluZGV4ZWRcblx0XHQgICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cblx0XHQgICAgdmFyIHVybF9kYXRlID0gIFN0cmluZyh5ZWFyKSArICctJyArIFN0cmluZyhtb250aCkgKyAnLScgKyBTdHJpbmcoZGF5KSArICctJyA7XG5cblx0XHRcdHJldHVybiB1cmxfZGF0ZTtcblxuXHQgICAgfTtcblxuXHQgICAgJHNjb3BlLnNsdWdpZnkgPSBmdW5jdGlvbihzdHJpbmcpIHtcblx0ICAgIFx0dmFyIHNsdWcgPSAgc3RyaW5nLnRvTG93ZXJDYXNlKCk7XG5cdCAgICBcdHNsdWcgPSBzbHVnLnJlcGxhY2UoL1xccysvZyxcIl9cIik7XG5cdCAgICBcdHNsdWcgPSBzbHVnLnJlcGxhY2UoL1xcPy9nLCBcIlwiKTtcblx0ICAgIFx0c2x1ZyA9IHNsdWcucmVwbGFjZSgvXFwmL2csIFwiXCIpO1xuXHQgICAgXHRzbHVnID0gc2x1Zy5yZXBsYWNlKC9cXD0vZywgXCJcIik7XG5cdCAgICBcdHJldHVybiBzbHVnO1xuXHQgICAgfTtcblxuXHRQb3N0c1NlcnZpY2UuZ2V0KClcblx0XHQuc3VjY2VzcyhmdW5jdGlvbiAocG9zdHMpIHtcblx0XHRcdCRzY29wZS5wb3N0cyA9IHBvc3RzO1xuXHRcdFx0Y29uc29sZS5sb2cocG9zdHMpO1xuXHRcdFx0JHNjb3BlLnBhZ2luYXRlKCRzY29wZS5wb3N0cy5sZW5ndGgpO1xuXHRcdH0pXG5cblx0fV0pXG5cblx0LmZpbHRlcignb3V0cHV0X2h0bWwnLCBbXCIkc2NlXCIsIGZ1bmN0aW9uICgkc2NlKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHZhbCkge1xuXHQgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKHZhbCk7XG5cdCAgICB9O1xuXHR9XSlcblxuXHQuZmlsdGVyKCdzdGFydEZyb20nLCBmdW5jdGlvbigpIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCwgc3RhcnQpIHtcblx0ICAgICAgICBpZihpbnB1dCkge1xuXHQgICAgICAgICAgICBzdGFydCA9ICtzdGFydDsgLy9wYXJzZSB0byBpbnRcblx0ICAgICAgICAgICAgcmV0dXJuIGlucHV0LnNsaWNlKHN0YXJ0KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIFtdO1xuXHQgICAgfVxuXHR9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LnNlcnZpY2UoJ1Bvc3RzU2VydmljZScsIFtcIiRodHRwXCIgLCBmdW5jdGlvbiAoJGh0dHApIHtcblx0XHR0aGlzLmdldCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvcG9zdHMnKTtcblx0XHR9XG5cdFx0dGhpcy5zZW5kID0gZnVuY3Rpb24gKHBvc3QpIHtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3Bvc3RzJywgcG9zdCk7XG5cdFx0fVxuXHRcdHRoaXMuc2luZ2xlID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMpIHtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvcG9zdHMnLCB7IHBhcmFtczoge3Bvc3Rfc2x1ZzogcGFyYW1ldGVycy5zbHVnfSB9ICk7XG5cdFx0fVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ3RybCcgLCBbXCIkc2NvcGVcIiAsIFwiVXNlclN2Y1wiICwgZnVuY3Rpb24gKCRzY29wZSwgVXNlclN2Yykge1xuXHRcdCRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQsIHBhc3N3b3JkX2NvbmZpcm0pIHtcblx0XHRcdGlmIChwYXNzd29yZCAhPSBwYXNzd29yZF9jb25maXJtKSB7XG5cdFx0XHRcdCRzY29wZS52YWxpZGF0aW9uTWVzc2FnZSA9ICdZb3VyIHBhc3N3b3JkcyBkaWQgbm90IG1hdGNoLic7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdFVzZXJTdmMucmVnaXN0ZXIodXNlcm5hbWUsIHBhc3N3b3JkKVxuXHRcdH1cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb25maWcoW1wiJHJvdXRlUHJvdmlkZXJcIiAsZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XG5cdFx0JHJvdXRlUHJvdmlkZXJcblx0XHRcdC53aGVuKCcvJyAsIHtjb250cm9sbGVyOiAnUG9zdHNDdHJsJywgdGVtcGxhdGVVcmw6ICdwb3N0cy5odG1sJ30pXG5cdFx0XHQud2hlbignL3JlZ2lzdGVyJyAsIHtjb250cm9sbGVyOiAnUmVnaXN0ZXJDdHJsJywgdGVtcGxhdGVVcmw6ICdyZWdpc3Rlci5odG1sJ30pXG5cdFx0XHQud2hlbignL2xvZ2luJyAsIHtjb250cm9sbGVyOiAnTG9naW5DdHJsJywgdGVtcGxhdGVVcmw6ICdsb2dpbi5odG1sJ30pXG5cdFx0XHQud2hlbignL2xvZ291dCcgLCB7Y29udHJvbGxlcjogJ0xvZ2luQ3RybCcsIHRlbXBsYXRlVXJsOiAnbG9nb3V0Lmh0bWwnfSlcblx0XHRcdC53aGVuKCcvcG9zdC86c2x1ZycgLCB7Y29udHJvbGxlcjogJ1NpbmdsZVBvc3RDdHJsJywgdGVtcGxhdGVVcmw6ICdzaW5nbGVQb3N0Lmh0bWwnfSlcblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb250cm9sbGVyKCdTaW5nbGVQb3N0Q3RybCcsIFtcIiRzY29wZVwiICwgXCIkaHR0cFwiLCBcIlBvc3RzU2VydmljZVwiLCBcIiRyb3V0ZVBhcmFtc1wiLCBcIiRyb3V0ZVwiLCBcIiRsb2NhdGlvblwiICwgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsIFBvc3RzU2VydmljZSwgJHJvdXRlUGFyYW1zLCAkcm91dGUsICRsb2NhdGlvbikge1xuXG5cdFx0dmFyIHBvc3Rfc2x1ZyA9ICRyb3V0ZVBhcmFtcy5zbHVnO1xuXG5cdFx0JHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGVkJywgZnVuY3Rpb24oKXtcblx0XHRcdC8vdGhlIHBhZ2UgaXMgcmVhZHlcblx0XHR9KTtcblxuXHRcdFx0XHRcdFxuXHRcdFBvc3RzU2VydmljZS5zaW5nbGUoe1xuXHRcdFx0c2x1ZzogcG9zdF9zbHVnXG5cdFx0fSlcblx0XHQuc3VjY2VzcyhmdW5jdGlvbiAocG9zdCkge1xuXHRcdFx0JHNjb3BlLnBvc3QgPSBwb3N0O1xuXHRcdH0pXG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuc2VydmljZSgnVXNlclN2YycsIFtcIiRodHRwXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cdFx0dmFyIHN2YyA9IHRoaXM7XG5cdFx0c3ZjLmdldFVzZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1BdXRoJ10gPSB3aW5kb3cubG9jYWxTdG9yYWdlLnRva2VuXG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3VzZXJzJylcblx0XHRcdC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgXHRcdFx0cmV0dXJuIHJlc3BvbnNlXG4gICAgXHRcdH0pXG5cdFx0fVxuXHRcdHN2Yy5sb2dpbiA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3Nlc3Npb25zJywge1xuXHRcdFx0XHR1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZFxuXHRcdFx0fSlcblx0XHRcdC50aGVuKGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdFx0d2luZG93LmxvY2FsU3RvcmFnZS50b2tlbiA9IHZhbC5kYXRhO1xuXHRcdFx0XHQkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1BdXRoJ10gPSB2YWwuZGF0YVxuXHRcdFx0XHRyZXR1cm4gc3ZjLmdldFVzZXIoKTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHN2Yy5yZWdpc3RlciA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQsIHBhc3N3b3JkX2NvbmZpcm0pIHtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3VzZXJzJywge1xuXHRcdFx0XHR1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZFxuXHRcdFx0fSlcblx0XHRcdC50aGVuKGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdFx0cmV0dXJuIHN2Yy5sb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpXG5cdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmPSAnLyc7XHRcblx0XHRcdFx0XHR9KVxuXHRcdFx0fSlcblx0XHR9XG5cdFx0c3ZjLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKTtcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmPSAnLyc7XG5cdFx0fVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5ydW4oW1wiJHJvb3RTY29wZVwiLCBcIiR0aW1lb3V0XCIgLCBcIiR3aW5kb3dcIiAsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkdGltZW91dCwgJHdpbmRvdykge1xuXHRcblx0KGZ1bmN0aW9uIGNvbm5lY3QoKXtcblx0XHQvL0NyZWF0ZSBhIHdlYnNvY2tldCBjb25uZWN0aW9uIHdpdGggdGhlIHNlcnZlclxuXHRcdHZhciBob3N0ID0gXCJ3czovL1wiICsgJHdpbmRvdy5sb2NhdGlvbi5ob3N0XG5cdFx0ICBcblx0XHR2YXIgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQoaG9zdClcblxuXHRcdGNvbm5lY3Rpb24ub25vcGVuID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnV2Vic29ja2V0IGNvbm5lY3RlZCcpXG5cdFx0fVxuXG5cblx0XHRjb25uZWN0aW9uLm9uY2xvc2UgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnV2Vic29ja2V0IGNsb3NlZC4gVHJ5aW5nIHRvIHJlY29ubmVjdC4uLicpXG5cdFx0XHQkdGltZW91dChjb25uZWN0LCAxMCoxMDAwKTtcblx0XHR9IFxuXG5cdFx0Y29ubmVjdGlvbi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhlKTtcblx0XHRcdHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuXHRcdFx0XG5cdFx0XHR2YXIgbmFtZSA9ICd3czonICsgbWVzc2FnZS50b3BpYztcblx0XHRcdHZhciBkYXRhID0gbWVzc2FnZS5kYXRhO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhcImJyb2FkY2FzdGluZzogXCIpO1xuXG5cdFx0XHQkcm9vdFNjb3BlLiRicm9hZGNhc3QobmFtZSwgZGF0YSk7XG5cdFx0fVxuXHR9KSgpXG59XSkiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=