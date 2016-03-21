'use strict';

/**
 * @ngdoc function
 * @name inghackathonclientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the inghackathonclientApp
 */
angular.module('inghackathonclientApp')
  .controller('CustomerDetailsCtrl', ['smsFactory', 'feedbackFactory', 'customerDetailsFactory', function (smsFactory, feedbackFactory, customerDetailsFactory) {

    var vm = this;

    vm.chosenCustomerDetail = {};

    vm.smsMessage = {
      message: "",
      to: "+31624543741"
    };

    vm.customerDetails = [];

    vm.customerDetails = customerDetailsFactory.query(function(response) {
       vm.customerDetails = response;
    }, function(error) {
      console.log(error + "ho");
    });

    //vm.customerDetails = {
    //  id: "1234567",
    //  department: "ROSETTA",
    //  channelType: "CALL",
    //  corpKey: "DT10DW"
    //};

    vm.sendFeedback = function() {
      console.log('send sms');
      feedbackFactory.save(vm.chosenCustomerDetail).$promise.then(function(feedbackResponse) {
        vm.smsMessage.message += " " + "Hi " + vm.chosenCustomerDetail.name + " please give us your feedback at " + feedbackResponse.url;
        return smsFactory.save(vm.smsMessage);
      }, function(error) {
        console.log('there is an error');
      });

    };

  }]);
