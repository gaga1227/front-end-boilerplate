/**
 * Service for products component
 */

app.service('productsService', ['$http',
	function($http) {
		/**
		 * Standard size options in a desired sequence
		 * this is used as a reference for validation and sorting
		 */
		this.standardSizeOptions = ['XS', 'S', 'M', 'L', 'XL'];

		/**
		 * Get products data asynchronously
		 * returns a promise
		 */
		this.getProducts = function() {
			return $http({
				method: 'GET',
				url: 'lib/data/products.json'
			});
		};

		/**
		 * Returns an array of size options extracted from
		 * input products data, validated and sorted
		 */
		this.getSizeOptions = function(products) {
			var result = [];

			// put size options from all products into one array
			products.forEach(function(item) {
				var sizeOptionsFromItem = item.size;
				if (angular.isArray(sizeOptionsFromItem)) {
					result = result.concat(sizeOptionsFromItem);
				}
			});

			// remove duplicates
			result = result.filter(function(item, index, array) {
				return index == array.indexOf(item);
			});

			// remove unrecognised options
			result = result.filter(function(item, index, array) {
				return this.standardSizeOptions.indexOf(item) != -1;
			}.bind(this));

			// sort result and return
			return result.sort(this._compareSizeOption.bind(this));
		};

		/**
		 * Comparator function to sort size options
		 */
		this._compareSizeOption = function(sizeA, sizeB) {
			var standard = this.standardSizeOptions;
			return standard.indexOf(sizeA) - standard.indexOf(sizeB);
		};
	}
]);