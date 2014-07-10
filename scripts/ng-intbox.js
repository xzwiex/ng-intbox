angular.directive('ngIntbox', function() {
  return {
    restrict: 'A',
    terminal: true,
    require: "?ngModel",
    link: function($scope, element, attrs, ngModel) {
      var lessBtn, moreBtn, parent;
      ngModel.$parsers.unshift(function(viewValue) {
        var currentValue;
        if (isNaN(viewValue || !!viewValue)) {
          currentValue = ngModel.$modelValue;
          ngModel.$setViewValue(currentValue);
          ngModel.$render();
          return currentValue;
        } else {
          return parseInt(viewValue);
        }
      });
      $(element).wrap('<div class="intbox-wrapper"></div>');
      parent = $(element).parent();
      lessBtn = document.createElement('span');
      lessBtn.className = 'intbox-less intbox-button';
      moreBtn = document.createElement('span');
      moreBtn.className = 'intbox-more intbox-button';
      $(lessBtn).on('click', function() {
        ngModel.$setViewValue(parseInt(ngModel.$modelValue) - 1);
        ngModel.$render();
        return $scope.$apply();
      });
      $(moreBtn).on('click', function() {
        ngModel.$setViewValue(parseInt(ngModel.$modelValue) + 1);
        ngModel.$render();
        return $scope.$apply();
      });
      return parent.append(lessBtn).append(moreBtn);
    }
  };
});