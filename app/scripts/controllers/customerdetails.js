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
    vm.chosenCustomerDetail.question = "You visited an ING branch office";

    vm.chosenCustomerDetail.department = "24hCodING";
    vm.chosenCustomerDetail.question = "You participated in the 24hCodING";

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


    vm.sendFeedback = function() {
      vm.chosenCustomerDetail.to = vm.chosenCustomerDetail.customerObject.telephone;
      vm.chosenCustomerDetail.name = vm.chosenCustomerDetail.customerObject.name;

      //vm.smsMessage.to = vm.chosenCustomerDetail.to

      var newCustomer = {};

      newCustomer.name = vm.chosenCustomerDetail.name;
      newCustomer.to = vm.chosenCustomerDetail.to;
      newCustomer.departmentId = vm.chosenCustomerDetail.department;
      newCustomer.question = vm.chosenCustomerDetail.question;

      feedbackFactory.save(newCustomer).$promise.then(function(feedbackResponse) {
        console.log(feedbackResponse);
        vm.smsMessage.message = "Hallo " + newCustomer.name + ", zou je ons feedback geven via " + feedbackResponse.link + " ";
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
      vm.sendFeedback();
      vm.sendSms();
    };


    vm.processAllCustomers = function(){
      var newBulkArray = [];

      for (var i = 0; i < vm.customerDetails.length; i++) {
        //console.log(vm.customerDetails[i]);

        var newCustomer = {};

        newCustomer.name = vm.customerDetails[i].name;
        newCustomer.to = vm.customerDetails[i].to;
        newCustomer.department = vm.chosenCustomerDetail.department;
        newCustomer.question = vm.chosenCustomerDetail.question;

        feedbackFactory.save(newCustomer).$promise.then(function(feedbackResponse) {
          newCustomer.message = "Hallo " + newCustomer.name + ", zou je ons feedback geven via " + newCustomer.link + " ";

          newBulkArray.push(newCustomer);
        }, function(error) {
          console.log('Skipping customer: ' + newCustomer);
        });

      }
      console.log('Result: ' + newBulkArray);
    }

  }]);
