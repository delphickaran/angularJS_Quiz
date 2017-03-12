var myApp = angular.module('myApp',['ui.router','ngResource']);
myApp.config(function($stateProvider){
    $stateProvider
    .state('name',{
        url: '/quiz',
        templateUrl:'quiz.html',
        controller:'mainController'
    })    
})
//controller
 myApp.controller('mainController',['$scope','$http',function($scope,$http){
         $scope.name = "";
         $scope.enteredname = $scope.name;
         $scope.$watch('enteredname', function(){
         $scope.name = $scope.enteredname;
         $http.get('questions.json').then(function(response){
             $scope.questions = response.data ;
         })
        // $scope.questions = $scope.Api.query();
        console.log($scope.questions);
             
     });
     // Initialize Quiz
       $scope.start = function(){                           
          $scope.score = 0;
           $scope.currentStep = 1;
          $scope.inProgress = true;
          $scope.quizOver = false; 
        };
     //reset quiz
       $scope.reset = function() {
				$scope.inProgress = false;
				$scope.score = 0;
};
    
       //checkAnswer
       $scope.checkAnswer = function(ans){
           console.log(ans);
           var answer = ans.option ;
           $scope.$watch('answer', function(){
               ans.option = answer; 
           });
        //  if(!$('input[name=answer]:checked').length) return;
        //  var ans = $('input[name=answer]:checked').val();
          if(answer === $scope.options[$scope.answer])
            { $scope.score++;
              $scope.correctAns = true ;
            }
       else{
           $scope.correctAns = false ;
       }
           $scope.answerMode = false;
        
};
       //nextQuestion
       $scope.next = function(){
           if(correctAns = true){
               
           }
           $scope.currentStep++;
       }
      
       $scope.reset();
}]);