/**
 * Controller for products component
 */

app.controller('productsController', ['productsService',
	function(productsService) {
		// define 'this' reference object for 'controller as'
		var products = this;

		/**
		 * view model fields
		 */

		// view states and messages
		this.isLoading = false;
		this.loadingMessage = 'Loading products...';

		this.isLoadingError = false;
		this.errorMessage = 'Products information is unavailable right now, please try again later.';

		// size options
		this.sizeOptions = [];
		this.selectedSizeOption = null;

		// products
		this.items = [];

		/**
		 * Load products data
		 */
		this.loadProductsData = function() {
			// loading state on
			this.isLoading = true;

			// start loading via service
			productsService.getProducts()
			.success(function(data) {
				this.onProductsDataSuccess(data);
			}.bind(this))
			.error(function(error, status) {
				this.onProductsDataError(error, status);
			}.bind(this))
			.finally(function() {
				// loading state off either way
				this.isLoading = false;
			}.bind(this));
		};

		/**
		 * Callbacks handlers for products data call
		 */
		this.onProductsDataSuccess = function onProductsDataSuccess(dataResponse) {
			// check response data
			if (!angular.isArray(dataResponse) || !dataResponse.length) {
				// error state on
				this.isLoadingError = true;
				console.error('Invalid products data', dataResponse);
				return false;
			}

			// error state off
			this.isLoadingError = false;
			// copy response data to view model field
			this.items = angular.copy(dataResponse);
			// populate size options from products data
			this.sizeOptions = productsService.getSizeOptions(this.items);
		};

		this.onProductsDataError = function onProductsDataError(errorResponse, errorStatus) {
			// error state on
			this.isLoadingError = true;
			console.error('Error retrieving products information:', errorResponse, errorStatus);
		};

		/**
		 * Utility method to check if user selected size option
		 * matches any of the size options of a product
		 */
		this.matchSelectedSize = function(sizes) {
			// return as match when user not selecting any size
			if (!this.selectedSizeOption) {
				return true;
			}
			// return as no match when product has invalid size data
			if (!angular.isArray(sizes) || !sizes.length) {
				return false;
			}
			// return match result
			return sizes.indexOf(this.selectedSizeOption) != -1;
		};

		/**
		 * init
		 */
		this.loadProductsData();
	}
]);