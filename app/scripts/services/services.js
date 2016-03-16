'use strict';

angular.module('inghackathonclientApp.services', ['ngResource'])
  //.constant("baseURL","http://192.168.0.101:3000/")
  .constant("baseURL","http://localhost:8080/")
  //.constant("baseURL","http://141.138.139.81:3000/")
  .factory('smsFactory', ['$resource', 'baseURL', function($resource,baseURL) {
  //  .
  //.factory('smsFactory', [function() {


    return $resource(baseURL+"sms/:id");
 // return {};

  }]);
