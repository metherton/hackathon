'use strict';

angular.module('inghackathonclientApp.services', ['ngResource'])
  //.constant("baseURL","http://192.168.0.101:3000/")
  .constant("smsURL","http://141.138.139.81:8080/")
 // .constant("baseURL","http://localhost:8080/")
  .constant("feedbackURL","http://141.138.139.81:9050/")
  .constant("customerDetailsURL","http://141.138.139.81:3000/")
  //.constant("baseURL","http://141.138.139.81:3000/")
  .factory('feedbackFactory', ['$resource', 'feedbackURL', function($resource,feedbackURL) {
    //  .
    //.factory('smsFactory', [function() {


    return $resource(feedbackURL+"feedback/:id", {},
      {'save': {method: 'POST', headers: {'Content-Type':'application/json', 'Accept': 'application/json'} }});

  }])
  .factory('customerDetailsFactory', ['$resource', 'customerDetailsURL', function($resource,customerDetailsURL) {
    //  .
    //.factory('smsFactory', [function() {


    return $resource(customerDetailsURL+"customerDetails/:id", {},
      {'save': {method: 'POST', headers: {'Content-Type':'application/json', 'Accept': 'application/json'} }});

  }])
  .factory('smsFactory', ['$resource', 'smsURL', function($resource,smsURL) {
  //  .
  //.factory('smsFactory', [function() {


    return $resource(smsURL+"sms/:id", {},
      {'save': {method: 'POST', headers: {'Content-Type':'application/json', 'Accept': 'application/json'} }});

  }]);
