import angular from 'angular';
import uiRouter from 'angular-ui-router';

const app = angular.module( 'app', [ uiRouter ] );

app.config(( $stateProvider, $urlRouterProvider, $locationProvider ) => {
  $urlRouterProvider.other( '/' );

  $stateProvider
    .state( 'todos', {
      url: '/',
      template: require( '../views/todos.html' )
    } )
    .state( 'about', {
      url: '/about',
      template: require( '../views/about.html' )
    } );

  $locationProvider.html5Mode( true );
});

export default app;
