// // var moduleName = 'kagd.directives';
//
// class Directive {
//   constructor( $rootScope ) {
//     this.restrict = 'A';
//     this.$rootScope
//   }
//
//   link( scope, ele ) {
//     this.$rootScope.$on('menuToggle', ( event, type ) =>
//       if type == 'open'
//         menuOpen = true
//       else if type == 'close'
//         menuOpen = false
//
//       ele.toggleClass( 'menu-open', menuOpen )
//     );
//   }
// }
//
// angular.module('kagd').directive('menuClasses', Directive);
// Directive.$inject = ['$rootScope'];
//
// // Directive = ( $rootScope ) ->
// //
// //   link = ( scope, ele ) ->
// //     $rootScope.$on 'menuToggle', ( event, type ) ->
// //       if type == 'open'
// //         menuOpen = true
// //       else if type == 'close'
// //         menuOpen = false
// //
// //       ele.toggleClass( 'menu-open', menuOpen )
// //
// //   return {
// //     restrict: 'EA'
// //     link: link
// //   }
// //
// // angular.module('kagd').directive 'menuClasses', Directive
// // Directive.$inject = ['$rootScope']
