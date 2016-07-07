import angular from 'angular';
import uiRouter from 'angular-ui-router';
import moduleDropdown from './modules/dropdown.module';
import modalModule from './modules/modal.module';
import homeController from './controller/HomeController'


const app = angular.module( 'app', [ uiRouter, 'dropdown.module', 'modal.module', 'modal.instance.module' ] );

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state( 'home', {
            url: '/',
            template: require( './views/home.html' ),
            controller: homeController
        })
        .state('todos', {
            url: '/todos',
            template: require( './views/todos.html' )
            //templateUrl: './views/todos.html'
        })
        .state('about', {
            url: '/about',
            template: require( './views/about.html' )
            //templateUrl: './views/about.html'
        });

    $locationProvider.html5Mode(true);
});

export default app;
