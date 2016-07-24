myApp

.factory('$apiservice', ['$apis','$http','$q','$ionicLoading',function($apis,$http,$q,$ionicLoading){

	var init = function(){
		for(var i in $apis){
			$apis[i].send = send;
		}
	};

	var send = function(params,body,loaddingTitle){
		var self = this;
		var url = params ? formateUrl(self.url,params) : self.url;
		var params = {
			url:self.host ? self.host + url : url,
			method: self.method
		};
		if(body){
			params.data = body;
		}
		var showLoadding = function(context){
			var loading = context ? context : "加载中...";
			$ionicLoading.show({
				template:loading
			});
		}
		showLoadding(loaddingTitle);
		var deferred = $q.defer();
		$http(params).then(function(data){
			$ionicLoading.hide();
			deferred.resolve(data.data);
		},function(){
			$ionicLoading.hide();
			deferred.reject();
		});

		return deferred.promise;

	}


	var formateUrl = function(url,params){
		for(var i in params){
			url = url.replace('{' + i + '}', encodeURIComponent(params[i]));
		}
		return url;
	}
	return {
		init: init
	};

}]);