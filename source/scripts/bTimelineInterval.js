/*
 * bTimelineInterval
 */
angular.module('bTimelineInterval', ['bTimeline'])

    .directive('bTimelineInterval', bTimelineIntervalDirective)
    .directive('bTimelineIntervalTemplate', bTimelineIntervalTemplateDirective)
    .directive('bTimelineIntervalTemplateTransclude', bTimelineIntervalTemplateTranscludeDirective)

;



function bTimelineIntervalDirective($compile) {

    return {

        require: '^bTimeline',

        controllerAs: 'bTimelineInterval',
        controller: function ($scope) {

            this.$templates= {}
            this.useTemplate= function (name, template) {
                this.$templates[name]= template
            }

            $scope.intervalDraft= null

            $scope.pickInterval= function (interval) {
                $scope.intervalDraft= {
                    beginDate: new Date(interval.beginDate),
                    endDate: new Date(interval.endDate),
                }
            }

        },

        link: function ($scope, $e, $a) {

            var template= ''+
                '<div class="b-timeline-interval">'+
                    '<div class="b-timeline-interval__interval b-timeline-interval__interval_draft" ng-if="intervalDraft" ng-style="{left:bTimeline.calcIntervalLeft(intervalDraft),right:bTimeline.calcIntervalRight(intervalDraft)}">'+
                        ''+
                    '</div>'+
                    '<div class="b-timeline-interval__interval" ng-click="pickInterval(interval)" ng-style="{left:bTimeline.calcIntervalLeft(interval),right:bTimeline.calcIntervalRight(interval)}">'+
                        '<div class="b-timeline-interval__form" ng-if="intervalDraft" ng-click="$event.stopPropagation()" b-timeline-interval-template-transclude="form">'+
                            ''+
                        '</div>'+
                    '</div>'+
                '</div>'+
            ''

            $e.append($compile(template)($scope))

        }
    }

}



function bTimelineIntervalTemplateDirective($parse) {

    return {
        restrict: 'A',
        require: '^bTimelineInterval',

        transclude: 'element',

        link: function ($scope, $e, $a, bTimelineInterval, $transclude) {
            if ($a.bTimelineIntervalTemplate) {
                bTimelineInterval.useTemplate($a.bTimelineIntervalTemplate, {
                    $e: $e,
                    $transclude: $transclude,
                    use: $parse($a.use)(),
                })
            }
        },
    }

}



function bTimelineIntervalTemplateTranscludeDirective() {

    return {

        transclude: true,

        link: function ($scope, $e, $a) {

            if ($scope.bTimelineInterval && $a.bTimelineIntervalTemplateTransclude) {
                var template= $scope.bTimelineInterval.$templates[$a.bTimelineIntervalTemplateTransclude]
                if (template) {
                    template.$transclude(function ($eTranscluded) {
                        var templateScope= $eTranscluded.scope()
                        if (template.use && template.use.length) {
                            angular.forEach(template.use, function (use) {
                                templateScope[use]= $scope[use]
                            })
                        }
                        $e.append($eTranscluded)
                    })
                }
            }

        }
    }

}
