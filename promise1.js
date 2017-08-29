angular.module("movieApp", [])
    .controller("GetMovieCtrl", function($scope, $log, movieService) {
        $scope.getMovieListing = function(movie) {
            var promise = movieService.getMovieListing('Jenkins');
            promise.then(
                function(payload) {
                    $scope.movieListing = payload.data;
                },
                function(error) {
                    $log.error("Failed loading the movie", error);
                }
            );
        }
    }).factory("movieService", function($http) {
        return {
            getMovieListing: function(name) {
                $http.get("/api/v1/movies/" + name);
            }
        }
    });

// A deferred object is simply an object that
// exposes a promise as well as the associated methods 
// for resolving that promise
.factory("movieService", function($http, $log, $q) {
    return {
        getMovieListing: function(name) {
            var defer = $q.defer(); // create defer object from $q
            $http.get("/api/v1/movies/" + name)
                .success(function(data) {
                    defer.resolve({
                        title: data.title,
                        cost: data.price
                    })
                })
                .failure(function(msg, code) {
                    defer.reject(msg);
                    $log.error(msg, code);
                });
            return defer.promise; // return a promise
        }
    }
});