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
    vm.chosenCustomerDetail.department = "Hoofddorp";
    vm.chosenCustomerDetail.question = "Hoe vond u uw bezoek aan het ING kantoor?";

    vm.smsMessage = {
      message: "",
      to: "+31624543741"
    };

    vm.customerDetails = [];

    vm.customerDetails = customerDetailsFactory.query(function(response) {
       vm.customerDetails = response;
      console.log(vm.customerDetails);
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
      vm.chosenCustomerDetail.to = vm.chosenCustomerDetail.customerObject.telephone;
      vm.chosenCustomerDetail.name = vm.chosenCustomerDetail.customerObject.name;

      //vm.smsMessage.to = vm.chosenCustomerDetail.to

      feedbackFactory.save(vm.chosenCustomerDetail).$promise.then(function(feedbackResponse) {

        vm.smsMessage.message = "Hallo " + vm.chosenCustomerDetail.name + ", zou je ons feedback geven over je kantoorbezoek via http://ing-smilingdx.rhcloud.com/smile/" + feedbackResponse._id + " ";
        //console.log(' - message ' + vm.smsMessage.message);
        //return smsFactory.save(vm.smsMessage);
      }, function(error) {
        console.log('there is an error with the feedback api.');
      });
    };

    vm.sendSms = function() {
      vm.smsMessage.to = vm.chosenCustomerDetail.to;
      smsFactory.save(vm.smsMessage);
    };

    vm.sendAll = function() {
      vm.sendSms();
      vm.sendFeedback();
    };

  }]);
