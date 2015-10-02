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

          var tags = $scope.item.tags;



          var content = '<div><strong>' + $scope.item.name + '</strong></div><div>';

          var first = true;
          for(var i in tags) {
            var tag = tags[i];

            console.log("tag", tag);

            if(typeof(tag) == "object") {
              tag = tag[1] + " " + tag[0];
            }

            content += (first ? '' : ', ') + tag;

            first = false;
          }

          content += '</div>';

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

appDirectives.directive('tag', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'EC',
    template: '<span class="tag-tooltip">{{tag_name}}</a>',
    scope: true,
    link: function($scope, elem, attr) {
      $rootScope.$watch('game_data', function () {
        if(!$rootScope.game_data) {
          return;
        }

        var tag_key = attr.k;
        var tag_meta = false;

        if(tag_key.indexOf(",") >= 0) {
          var parts = tag_key.split(",");

          tag_key = parts[0];
          tag_meta = parts[1];
        }

        if($rootScope.game_data.tags.hasOwnProperty(tag_key)) {

          var tag = $rootScope.game_data.tags[tag_key];
          $scope.tag_name = tag.name;

          if(tag_meta !== false) {
            $scope.tag_name = tag_meta + " " + $scope.tag_name;
          }

          elem.find('.tag-tooltip').tooltip({
            placement: "top",
            html: true,
            title: tag.description
          }).addClass('has-description');
        }
        else {
          $scope.tag_name = attr.k
          elem.find('.tag-tooltip').addClass('no-description');
        }
      });
    }
  }
}]);

appDirectives.directive('skill', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'E',
    template: '<a href="{{url}}">{{skill_name}}<span class="glyphicon"></span></a>',
    scope: true,
    link: function($scope, elem, attr) {
      $rootScope.$watch('game_data', function () {
        if(!$rootScope.game_data) {
          return;
        }

        if($rootScope.game_data.skills.hasOwnProperty(attr.k)) {
          var skill = $rootScope.game_data.skills[attr.k];

          if(skill.external_link) {
            $scope.url = skill.external_link;
            elem.find('a').attr("target", "_blank");
            elem.find('.glyphicon').addClass('glyphicon-new-window');
            $scope.skill_name = skill.name;
          }
          else {
            $scope.url = '/skills#' + attr.k;
            $scope.skill_name = skill.name;
            elem.find('a').attr("target", "");            
          }

        }
        else {
          $scope.skill_name = attr.k;
          $scope.url = "#";
          elem.find('a').addClass('no-description');
        }
      });
    }
  }
}]);