function TodoListController($scope, $http) {
  $scope.todos = [];
  $scope.newTodo = {
    done : false,
    due : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    description : ''
  };

  $scope.doneFilter = { done : true };
  $scope.notDoneFilter = { done : false };

  $scope.setTodos = function(todos) {
    $scope.todos = todos;
  };

$scope.update = function(todo) {
    $http.put('/todo/' + todo._id + '.json', todo).success(function(data) {
      if (!data.todo) {
        alert(JSON.stringify(data));
      }
    });
  };

  $scope.updateList = function() {
    $http.get('/todos.json').success(function(data) {
      $scope.todos = data.todos;
    });

    setInterval(function() {
      $scope.updateList();
    }, 30 * 1000); 
  };

  setInterval(function() {
    $scope.updateList();
  }, 30 * 1000);

  $scope.updateList();

  $scope.addNewTodo = function() {
    $http.post('/todo.json', $scope.newTodo).success(function(data) {
      if (data.todo) {
        $scope.todos.push(data.todo);
        $scope.newTodo.description = '';
      } else {
        alert(JSON.stringify(data));
      }
    });
  };
}
/*function LeaseController($scope)
	$scope.leases = [];

	$scope.setLeases = functions(leases) {
		$scope.leases = leases;
	};
}*/
