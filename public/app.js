angular.module('githubApp', ['ngTable'])
.controller('GithubController', function($scope, $http, $filter, NgTableParams) {
  $scope.flickrTable = new NgTableParams({
    orderby: {
      full_name: 'asc'
    }
  }, {
    getData: function($defer, params) {
      // return $http.get('https://api.github.com/users/' + $scope.username + '/repos')
      return $http.get('https://api.flickr.com/services/rest/?api_key=5d0b99b598780adb1ce7f682110a03e6&method=flickr.photos.search&format=json&nojsoncallback=1&text=' + $scope.search)
      .then(function(response) {
        var photos = response.data.photos.photo;
        var filteredData = $filter('filter')(photos, params.filter())
        var sortedData = $filter('orderBy')(filteredData, params.orderBy());
        return sortedData;
      });
    }
  });

  $scope.loadPhotos = function() {
    $scope.flickrTable.reload();
  }
});