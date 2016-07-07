export default function ( $scope, $log ) {
    console.log( 'HomeController... OK' );

    $scope.todos = [
        {
            task: 'Wash Dishes',
            isCompleted: true
        },
        {
            task: 'Walk Outside',
            isCompleted: false
        },
        {
            task: 'Buy Cake',
            isCompleted: false
        },
        {
            task: 'Call Friend',
            isCompleted: true
        }
    ];

    $scope.onComplete = todo => {
        todo.isCompleted = !todo.isCompleted;
    }

}
