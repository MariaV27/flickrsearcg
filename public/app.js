angular.module('githubApp', ['ngTable'])
.controller('GithubController', function($scope, $http, $filter, NgTableParams) {
  $scope.githubTable = new NgTableParams({
    orderby: {
      full_name: 'asc'
    }
  }, {
    getData: function($defer, params) {
      return $http.get('https://api.github.com/users/' + $scope.username + '/repos')
      .then(function(response) {
        var filteredData = $filter('filter')(response.data, params.filter())
        var sortedData = $filter('orderBy')(filteredData, params.orderBy());
        return sortedData;
      });
    }
  });

  $scope.loadRepos = function() {
    $scope.githubTable.reload();
  }
});