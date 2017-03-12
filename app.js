var myApp = angular.module('myApp',['ui.router','ngResource','chart.js','angularRipple']);
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
        $scope.answers = [];
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
     //Graph
        $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
        $scope.labels = ['Ques1', 'Ques2', 'Ques3', 'Ques4', 'Ques5'];
        $scope.data = $scope.answers;
        $scope.datasetOverride = [
          {
        label: "Bar chart",
        borderWidth: 1,
        type: 'bar'
      },
      {
        label: "Line chart",
        borderWidth: 3,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
    //    type: 'line'
      }
    ];
     
     
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
           $scope.currentStep = 0;
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
             $scope.answers.push(1);
            }
       else{
           $scope.correctAns = false ;
           $scope.answers.push(0);
       }
           $scope.answerMode = false;
        
};
       //nextQuestion
       $scope.next = function(){
            $scope.currentStep++;
           if($scope.currentStep>4){
               $scope.quizOver = true ;
               $scope.answers = [];               
           }
       }
      
       $scope.reset();
}]);