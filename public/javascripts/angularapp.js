var vinquisition = angular.module('vinquisition', ['appDirectives']);
var appDirectives= angular.module('appDirectives', []);

vinquisition.controller("VinquisitionController", ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
  $http.get('/game_data.json')
    .then(function(res){
      $rootScope.game_data = res.data;
    });
}]);

appDirectives.directive('item', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'E',
    template: '<a href="{{url}}" class="item {{item.keyword}}">{{item.name}}</a>',
    scope: true,
    link: function($scope, elem, attr) {
      console.log("key", attr.k);
      $rootScope.$watch('game_data', function () {
        if(!$rootScope.game_data) {
          return;
        }

        if($rootScope.game_data.items.hasOwnProperty(attr.k)) {
          $scope.item = $rootScope.game_data.items[attr.k];
          $scope.url = "/items#" + attr.k;

          var content = '<div><strong>' + $scope.item.name + '</strong></div><div>' + $scope.item.tags.join(", ") + '</div>';

          if($scope.item.hasOwnProperty("special_rules")) {
            content += ' <div>' + $scope.item.special_rules + '</div>';
          }

          elem.find('.item').removeClass('alert-danger').popover({
            placement: 'top',
            content: content,
            html: true
          });
          
          elem.find('.item').hover(function () {
            $(this).popover('show');
          }, function () {
            $(this).popover('hide');
          });
        }
        else {
          $scope.item = {
            name: 'Item Not Found: ' + attr.k
          };

          $scope.url = "#";

          elem.find('.item').addClass('alert-danger');
        }
      });
    }
  }
}]);