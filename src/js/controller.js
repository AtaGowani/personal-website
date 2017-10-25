var app = angular.module('AtaGowaniApp', ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){

  $stateProvider
    .state({
      name: 'index',
      url: '/',
      views: {
        'image': {
          templateUrl: './src/views/mainPicture.html',
          controller: 'mainController'
        },
        'content': {
          templateUrl: './src/views/main.html',
          controller: 'mainController'
        }
      }
    })

    .state({
      name: 'blog',
      url: '/blog',
      views: {
        'image': {
          templateUrl: './src/views/blogPicture.html',
          controller: 'blogController'
        },
        'content': {
          templateUrl: './src/views/blog.html',
          controller: 'blogController'
        }
      }
    })

    .state({
      name: 'projects',
      url: '/projects',
      views: {
        'image': {
          templateUrl: './src/views/projectsPicture.html',
          controller: 'projectsController'
        },
        'content': {
          templateUrl: './src/views/projects.html',
          controller: 'projectsController'
        }
      }
    })

    .state({
      name: 'resume',
      url: '/resume',
      views: {
        'image': {
          templateUrl: './src/views/resumePicture.html',
          controller: 'resumeController'
        },
        'content': {
          templateUrl: './src/views/resume.html',
          controller: 'resumeController'
        }
      }
    })

    .state({
      name: 'favorites',
      url: '/favorites',
      views: {
        'image': {
          templateUrl: './src/views/favoritesPicture.html',
          controller: 'favoritesController'
        },
        'content': {
          templateUrl: './src/views/favorites.html',
          controller: 'favoritesController'
        }
      }
    })

    .state({
      name: 'PageNotFound',
      url: '/404',
      templateUrl: './src/views/404.html',
      controller: '404Controller'
    })

    $urlRouterProvider.otherwise('/')

    //$locationProvider.html5Mode(true)
    //$locationProvider.hashPrefix(' ')

})

app.controller('mainController', ['$scope', function($scope){
  $scope.imgURL = './src/imgs/main.png'
}])

app.controller('blogController',['$scope', '$http', function($scope, $http){
  $scope.imgURL = './src/imgs/blog.png'
}])

app.controller('projectsController', ['$scope', '$http', function($scope, $http){
  $scope.imgURL = './src/imgs/projects.png'
  $scope.projects = []

  $http.get('https://api.github.com/users/atagowani/repos?sort=updated').then(function (res) {
    res.data.forEach(function (repo) {
      if (repo.fork === false && repo.description) {
        var languagesUsed = []
        var languages_api = repo.languages_url
        $http.get(languages_api).then(function(res){
          console.log(res.data)
          languagesUsed = res.data
          var repo_name_array = repo.name.split("-")
          var repo_name = null;
          repo_name_array.map(function(name){
            if (!repo_name) {
              repo_name = name;
            } else {
              repo_name += name + " "
            }
          })
          console.log("REPO NAME:" + repo_name)
          $scope.projects.push({
            name: repo_name,
            description: repo.description,
            github: repo.html_url,
            URL: repo.homepage,
            languages: languagesUsed
          })
        }, function (error) {
          console.log(error)
        })
      }
    })}, function (error) {
    console.error(error)
  })

  console.log($scope.projects)
}])

app.controller('resumeController', ['$scope', function($scope){
  $scope.imgURL = './src/imgs/resume.png'
}])

app.controller('favoritesController', ['$scope', '$http', function($scope, $http){
  $scope.imgURL = './src/imgs/favorites.png'

  $http.get('./src/data/books.json').then(function(res){
    $scope.books = res.data
  }, function(error){
    console.log(error)
  })

  $http.get('./src/data/shows.json').then(function(res){
    $scope.shows = res.data
  }, function(error){
    console.log(error)
  })

  $http.get('./src/data/heros.json').then(function(res){
    $scope.heros = res.data
  }, function(error){
    console.log(error)
  })
}])