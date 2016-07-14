/**
 * Mini POS for angularjs testing
 *
 * This webapp built using angular
 *
 * @version 1.0.0
 *
 */


var miniPOS = angular.module('miniPOS', ['ngRoute']);

// fetchData().then(bootstrapApp);
bootstrapApp();


/**
 * Fetch Data on the first load
 *
 *
 */
function fetchData() {
	var initInjector = angular.injector(["ng"]),
	$http = initInjector.get("$http");

}

/**
 * Initial angular load
 *
 */
function bootstrapApp() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ["miniPOS"]);
    });
}


/**
 * Route Config
 *
 * @since 1.0.0
 */
miniPOS.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'InputCtrl'
		});
});


/**
 * Main Controller
 *
 * @since 1.0.0
 */
miniPOS.controller('MainCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 
	function($scope, $rootScope, $http, $location, $routeParams) {

	    

}]);


/**
 * Input Controller
 *
 * @since 1.0.0
 */
miniPOS.controller('InputCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

	$rootScope.products = [];

	// Init var input
	$scope.desc = '', $scope.qty = 0, $scope.price = 0;

	var tax = 0.1; var importVal = 0.05;

    // Totaling the all products in cart
	$scope.doTotal = function () { 
		var products = [];
		angular.copy($rootScope.products, products); 

		if (products.length !== 0) {
			var totalPrice = 0;
			var temp = 0;
            var taxTemp = 0;
			angular.forEach(products, function(value) { 
				temp = temp + (value.qty * value.price);
                taxTemp = taxTemp + (value.qty * value.price) * tax;
			});

            $rootScope.tax = taxTemp;
			
			$rootScope.total = temp + taxTemp;
		} else {
			$rootScope.total = 0;
            $rootScope.tax = 0;
		}
	};
	
    // Put the product on the cart
	$scope.submitProduct = function() {
		
		// Populate the data
		var product = {'desc': $('#desc').val(), 'qty': $('#qty').val(), 'price': $('#price').val()};

		// Push product to scope
		$rootScope.products.push(product);

        $scope.doTotal();

        $scope.reset();
	};


    $scope.remove = function(product) {

        var products = [];
        var temp = [];
        angular.copy($rootScope.products, products);

        _.each(products, function(value) {
            if (value.desc !== product.desc) {
                temp.push(value);
            }
        });
        
        $rootScope.products = temp;
        $scope.doTotal();

    };


    // Reset the input form
    $scope.reset = function() {
        $('#desc').val('');
        $('#qty').val('');
        $('#price').val('');
    };


	$scope.init = function() {
		$scope.doTotal();
	};

	$scope.init();
	
}]);
