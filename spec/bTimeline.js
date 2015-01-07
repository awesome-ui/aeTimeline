describe('bTimeline', function() {

    beforeEach(module('bTimeline'))

    var beginDate= new Date(2015,0,7,0,0,0,0)
    var endDate= new Date(2015,0,8,0,0,0,0)
    var intervals= [
        { beginDate: new Date(2015,0,7,0,0,0,0), endDate: new Date(2015,0,7,8,0,0,0) },
    ]

    describe('bTimeline create isolate scope', function () {

        var scope, element, elementScope

        beforeEach(inject(function ($compile, $rootScope) {
            scope= $rootScope.$new()
            scope.getBeginDate= function () {
                return beginDate
            }
            scope.getEndDate= function () {
                return endDate
            }
            scope.getIntervals= function () {
                return intervals
            }
            element= angular.element('<div b-timeline timeline-begin-date="getBeginDate()" timeline-end-date="getEndDate()" timeline-intervals="getIntervals()"></div>')
            $compile(element)(scope)
            scope.$digest()
            elementScope= element.isolateScope()
        }))

        it('exists', inject(function () {
            assert.isDefined(elementScope)
        }))

        it('encapsulates controller', inject(function () {
            assert.isDefined(elementScope.bTimeline)
        }))

        it('encapsulates link to beginDate', inject(function () {
            assert.isDefined(elementScope.beginDate)
            assert.strictEqual(elementScope.beginDate, beginDate)
        }))

        it('encapsulates link to endDate', inject(function () {
            assert.isDefined(elementScope.endDate)
            assert.strictEqual(elementScope.endDate, endDate)
        }))

        it('encapsulates link to intervals', inject(function () {
            assert.isDefined(elementScope.intervals)
            assert.strictEqual(elementScope.intervals, intervals)
        }))

    })

    describe('bTimeline controller', function () {

        var scope, element, elementScope

        beforeEach(inject(function ($compile, $rootScope) {
            scope= $rootScope.$new()
            scope.getBeginDate= function () {
                return beginDate
            }
            scope.getEndDate= function () {
                return endDate
            }
            scope.getIntervals= function () {
                return intervals
            }
            element= angular.element('<div b-timeline timeline-begin-date="getBeginDate()" timeline-end-date="getEndDate()" timeline-intervals="getIntervals()"></div>')
            $compile(element)(scope)
            scope.$digest()
            elementScope= element.isolateScope()
        }))

        it('exists', inject(function () {
            assert.isDefined(elementScope)
            assert.isDefined(elementScope.bTimeline)
        }))

        it('expose #calcIntervalLeft', inject(function () {
            assert.isDefined(elementScope.bTimeline.calcIntervalLeft)
        }))

        it('expose #calcIntervalRight', inject(function () {
            assert.isDefined(elementScope.bTimeline.calcIntervalRight)
        }))

    })

})
