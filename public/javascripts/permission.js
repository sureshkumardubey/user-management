var app = angular.module('UserPermission', []);
app.controller('permissionController', function($scope, $http) {
	$scope.permissionFormData = {};
	function populate()
	{
		$http({
			method: 'GET',
			url: '/permissions/permissionlist'
		  }).success(function(data, status) {
			$scope.permissions = data
		  }).error(function(data, status) {
			// Some error occurred
		  });
	}
	
	$scope.savePermission = function () {
			//$scope.userFormData._id='';
			$http({
				method  : 'POST',
				url     : '/permissions/savepermission',
				data    : $scope.permissionFormData
			})
				.success(function(data) {
					//console.log(data);
					$scope.permissionFormData = {};
					$scope.permissionForm.$setPristine();
					populate();
				});
        };
		
	$scope.editPermission = function(permission) {
		$scope.permissionFormData._id=permission._id;
		$scope.permissionFormData.name = permission.name;
	};
	
	$scope.deletePermission = function(recordId) {
		var confirmation = confirm('Are you sure you want to delete this Permission?');
		if (confirmation === true) 
		{
			$http({
				method  : 'DELETE',
				url     : '/permissions/deletepermission/'+recordId,
				data    : $scope.permissionFormData
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
	
	$scope.cancel = function() {
		$scope.permissionFormData = {};
		$scope.permissionForm.$setPristine();
	};
	populate();
});