var app = angular.module('UserManagement', []);
app.controller('userController', function($scope, $http) {
	$scope.userFormData = {};
	$scope.usserInfo = {};
	function populate()
	{
		$http({
			method: 'GET',
			url: '/users/userlist'
		  }).success(function(data, status) {
			$scope.users = data
		  }).error(function(data, status) {
			// Some error occurred
		  });
	}
	
	$scope.saveUser = function () {
			//$scope.userFormData._id='';
			$http({
				method  : 'POST',
				url     : '/users/saveuser',
				data    : $scope.userFormData
			})
				.success(function(data) {
					//console.log(data);
					$scope.userFormData = {};
					$scope.userForm.$setPristine();
					populate();
				});
        };
		
	$scope.editUser = function(user) {
		$scope.userFormData._id=user._id;
		$scope.userFormData.firstname = user.firstname;
		$scope.userFormData.lastname = user.lastname;
		$scope.userFormData.email = user.email;
		$scope.userFormData.password = user.password;
		$scope.userFormData.age = user.age;
		$scope.userFormData.permissions = user.permissions;
		$scope.userFormData.sex = user.sex;
	};
	
	$scope.deleteUser = function(recordId) {
		var confirmation = confirm('Are you sure you want to delete this user?');
		if (confirmation === true) 
		{
			$http({
				method  : 'DELETE',
				url     : '/users/deleteuser/'+recordId,
				data    : $scope.userFormData
			})
			.success(function(data) {
					if (data.msg === '') {
					}
					else {
						alert('Error: ' + data.msg);
					}

					// Update the table
					populate();
				});
		}
	};
	
	$scope.showUserInfo = function(user) {
		$scope.usserInfo.firstname = user.firstname;
		$scope.usserInfo.lastname = user.lastname;
		$scope.usserInfo.email = user.email;
		$scope.usserInfo.password = user.password;
		$scope.usserInfo.age = user.age;
		$scope.usserInfo.permissions = user.permissions.join();
		$scope.usserInfo.sex = user.sex;
	};
	
	$scope.cancel = function() {
		$scope.userFormData = {};
		$scope.userForm.$setPristine();
	};
	populate();
});