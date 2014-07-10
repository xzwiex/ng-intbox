angular.directive('ngIntbox', ->
  {
    restrict: 'A',
    terminal: true,
    require: "?ngModel",
    link: ($scope, element, attrs, ngModel) ->

      ngModel.$parsers.unshift( (viewValue) ->
        if isNaN viewValue || !!viewValue
          currentValue = ngModel.$modelValue
          ngModel.$setViewValue(currentValue)
          ngModel.$render()
          currentValue
        else
         parseInt  viewValue;
      )
      
      $(element).wrap('<div class="intbox-wrapper"></div>')

      parent = $(element).parent()

      lessBtn = document.createElement('span')
      lessBtn.className = 'intbox-less intbox-button'

      moreBtn = document.createElement('span')
      moreBtn.className = 'intbox-more intbox-button'

      $(lessBtn).on('click', () ->
        ngModel.$setViewValue(parseInt(ngModel.$modelValue) - 1)
        ngModel.$render()
        $scope.$apply()
      )

      $(moreBtn).on('click', () ->
        ngModel.$setViewValue(parseInt(ngModel.$modelValue) + 1)
        ngModel.$render()
        $scope.$apply()
      )

      parent.append(lessBtn).append(moreBtn)
  }
)