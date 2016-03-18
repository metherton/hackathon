'use strict';

/**
 * @ngdoc function
 * @name inghackathonclientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the inghackathonclientApp
 */
angular.module('inghackathonclientApp')
  .controller('CustomerDetailsCtrl', ['smsFactory', 'feedbackFactory', function (smsFactory, feedbackFactory) {

    var vm = this;

    vm.smsMessage = {
      body: "",
      to: "0031624543741"
    };

    vm.customerDetails = {
      id: "1234567",
      department: "ROSETTA",
      channelType: "CALL",
      corpKey: "DT10DW"
    };

    vm.sendFeedback = function() {
      console.log('send sms');
      feedbackFactory.save(vm.customerDetails).$promise.then(function(feedbackResponse) {
        vm.smsMessage.body += " " + feedbackResponse.url;
        return smsFactory.save(vm.smsMessage);
      }, function(error) {
        console.log('there is an error');
      });

    };

  }]);
