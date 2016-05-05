'use strict';

angular.module('inghackathonclientApp.services', ['ngResource'])
  .constant("smsURL", "http://141.138.139.81:8081/")
  .constant("feedbackURL", "http://ing-smilingdx.rhcloud.com/api/smileys/")
  .factory('feedbackFactory', ['$resource', 'feedbackURL', function ($resource, feedbackURL) {
    return $resource(feedbackURL + ":id", {},
      {'save': {method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}});
  }])
  .factory('smsFactory', ['$resource', 'smsURL', function ($resource, smsURL) {
    return $resource(smsURL + "sms/:id", {},
      {'save': {method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}});
  }]);
