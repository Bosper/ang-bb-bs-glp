import angular from 'angular';
import uiRouter from 'angular-ui-router';

const app = angular.module( 'app', [ uiRouter ] );

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('todos', {
            url: '/',
            template: require( '../views/todos.html' )
            //templateUrl: './views/todos.html'
        })
        .state('about', {
            url: '/about',
            template: require( '../views/about.html' )
            //templateUrl: './views/about.html'
        });

    $locationProvider.html5Mode(true);
});

export default app;
