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
         $scope.currentStep= 0;
         $scope.$watch('enteredname', function(){
         $scope.name = $scope.enteredname;
         
         //$scope.Api=$resource('questions.json');
        // $scope.questions = $scope.Api.query();
       
             
     });
     $http.get('questions.json').then(function(response){
             $scope.questions = response.data ;
              console.log($scope.questions);
         console.log($scope.questions[1].answer);
         
         })
     // Initialize Quiz
       $scope.start = function(){                           
          $scope.score = 0;
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
        //  if(!$('input[name=answer]:checked').length) return;
        //  var ans = $('input[name=answer]:checked').val();
          if(answer === $scope.questions[$scope.currentStep].options[$scope.questions[$scope.currentStep].answer])
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