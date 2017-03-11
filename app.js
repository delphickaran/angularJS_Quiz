var myApp = angular.module('myApp',['ui.router']);
myApp.config(function($stateProvider){
    $stateProvider
    .state('name',{
        url: '/quiz',
        templateUrl:'quiz.html',
        controller:'mainController'
    })    
})
 myApp.controller('mainController',['$scope','quizQues',function($scope,quizQues){
         $scope.name = "";
         $scope.enteredname = $scope.name;
         $scope.$watch('enteredname', function(){
         $scope.name = $scope.enteredname; 
     });

       $scope.start = function(){                           
          $scope.id = 0;
          $scope.score = 0;
          $scope.inProgress = true;
          $scope.quizOver = false;
          $scope.getQues(); 
        };
       $scope.reset = function() {
				$scope.inProgress = false;
				$scope.score = 0;
};
       //getQuestion
       $scope.getQues = function(){
          var ques = quizQues.getQues($scope.id);
          if(ques){
            $scope.question = ques.question;
            $scope.options = ques.options;
            $scope.answer = ques.answer;
            $scope.answerMode = true;
          }
          else{
            $scope.quizOver = true;
          }
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
           $scope.id++;
           $scope.getQues();
       }
       $scope.reset();
}]);

myApp.factory('quizQues',function(){
    var questions = [
        {
            question : "What is the capital of India?",
            options : ['delhi','mumbai','chennai','kolkata'],
            answer : 0
        },
        {
            question : "Who is the current prime minister of India?",
            options : ['rajiv gandhi','salman khan','virat kohli','Narendera Modi'],
            answer: 3
        },
        {
            question : "How many strings are there in a guitar?",
            options : ['five','six','seven','eight'],
            answer : 1
        },
        {
            question : "If today is Sunday. What will be day after tomorrow?",
            options: ['monday','tuesday','wednesday','thursday'],
            answer : 1
        },
        {
            question : "What is the capital of Australia?",
            options : ['sydney','canberra','adelaide','melbourne'],
            answer : 1
        }
    ];
    return{
        getQues : function(id){
            if(id < questions.length){
                return questions[id];
            }
            else{
                return false;
            }
        }
    }
    
});

