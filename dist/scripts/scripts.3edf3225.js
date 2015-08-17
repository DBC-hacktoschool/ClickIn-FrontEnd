"use strict";angular.module("clickInFrontEndApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","chart.js"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/session",{templateUrl:"views/session.html",controller:"SessionCtrl",controllerAs:"session"}).when("/results",{templateUrl:"views/results.html",controller:"ResultsCtrl",controllerAs:"results"}).otherwise({redirectTo:"/"})}]),angular.module("clickInFrontEndApp").controller("MainCtrl",["$scope","$log","$location","sessionService",function(a,b,c,d){a.sessionCode=d.code,a.email="",a.$watch("sessionCode",function(){d.code=a.sessionCode}),a.update=function(e,f){a.sessionCode=e,d.code=e,a.email=f,b.log("Session Code: ",a.sessionCode,"Service Code: ",d.code,"Email: ",a.email),c.path("/session")},this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("clickInFrontEndApp").controller("SessionCtrl",["$scope","$location","$resource","$log","sessionService",function(a,b,c,d,e){0===e.code.length&&b.path("/"),a.sessionCode=e.code;var f=c("http://clickin-backend.herokuapp.com/api/sessions/:session_code",{session_code:e.code},{pupdate:{method:"PATCH"}});f.get().$promise.then(function(c){void 0===c.poll&&b.path("/"),a.question=c.poll.question,a.answers=c.poll.answers,e.question=c.poll.question,e.answers=c.poll.answers}),a.clickin=function(a){d.log("selected answer: ",a),e.lecture=f.pupdate(a).$promise.then(function(a){e.question=a.poll.question,e.answers=a.poll.answers}),b.path("/results")},this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("clickInFrontEndApp").service("sessionService",["$resource",function(a){this.code="",this.question={},this.answers=[]}]),angular.module("clickInFrontEndApp").controller("ResultsCtrl",["$scope","$resource","$log","$location","sessionService",function(a,b,c,d,e){0===e.code.length&&d.path("/"),a.sessionCode=e.code,c.log("SESSION LECTURE: ",e.answers),a.question=e.question,a.answers=e.answers;var f=function(b,c){a.legend=!0,a.labels=[],a.data=[],a.answers=c,a.question=b,c.forEach(function(b){a.labels.push(b.content),a.data.push(b.count)})};f(a.question,a.answers);var g=io("http://clickin-backend.herokuapp.com");g.on("result",function(b){console.log("RECEIVED: ",b),c.log(b.poll.answers),f(b.poll.question,b.poll.answers),a.$apply()}),this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("clickInFrontEndApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="container"> <div class="form-group"> <div><h4>Enter a Code</h4></div> <input type="text" ng-model="sessionCode" class="form-control" placeholder="Session Name"> <h4>Email</h4> <input type="text" ng-model="email" class="form-control" placeholder="Email"><br> <div class="center-btn"> <div class="btn btn-primary" ng-click="update(sessionCode, email)">Click In!</div> </div> </div> </div>'),a.put("views/results.html",'<div class="text-center"><h3>{{question.content}}</h3></div> <div class="text-center"><h4>Click-Ins: {{question.count}}</h4></div> <div class="text-center"><h3>Results</h3></div> <canvas id="pie" class="chart chart-pie" data="data" labels="labels" legend="legend"> </canvas>'),a.put("views/session.html",'<div class="text-center"><h3>{{question.content}}</h3></div> <div class="row"> <div class="col s12"> <div ng-repeat="answer in answers" class="answer-wrapper"> <div class="btn btn-lg answer-button" ng-click="clickin(answer)">{{answer.content}}</div> </div> </div> </div>')}]);