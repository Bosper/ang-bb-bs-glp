export default function ( $scope, $log ) {
    console.log( 'HomeController... OK' );

    let params = {
        createHasInput: false
    };

    $scope.todos = [
        {
            task: 'Wash Dishes',
            isCompleted: true,
            isEditing: false
        },
        {
            task: 'Walk Outside',
            isCompleted: false,
            isEditing: false
        },
        {
            task: 'Buy Cake',
            isCompleted: false,
            isEditing: false
        },
        {
            task: 'Call Friend',
            isCompleted: true,
            isEditing: false
        }
    ];

    $scope.onEditClick = todo => {
        todo.isEditing = true;
    }

    $scope.onSave = todo => {
        todo.task = todo.updatedTask;
        console.log(todo.task + ' ' + todo.updatedTask);
        todo.isEditing = false;

    }

    $scope.onCancel = todo => {
        todo.isEditing = false;
    }

    $scope.onComplete = todo => {
        todo.isCompleted = !todo.isCompleted;
    }

    $scope.createTask = () => {
        params.createHasInput = false;
        $scope.createTaskInput = '';
    }

    $scope.$watch( 'createTaskInput', val => {
        if (!val && params.createHasInput){
            $scope.todos.pop();
            params.createHasInput = false;
        }
        if (val && !params.createHasInput) {
            $scope.todos.push({ task: val, isCompleted: false });
            params.createHasInput = true;
        } else if ( val && params.createHasInput ) {
            $scope.todos[ $scope.todos.length - 1 ].task = val;
        }

    } )

}
