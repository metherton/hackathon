'use strict';

/**
 * @ngdoc function
 * @name inghackathonclientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the inghackathonclientApp
 */
angular.module('inghackathonclientApp')
  .controller('CustomerDetailsCtrl', ['smsFactory', 'bulkSmsFactory','feedbackFactory', 'customerDetailsFactory', function (smsFactory, bulkSmsFactory, feedbackFactory, customerDetailsFactory) {

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


    vm.sendFeedback = function(alsoSendSms) {
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
        vm.smsMessage.message = "Hello " + newCustomer.name + ", could you provide feedback? Please use: " + feedbackResponse.link + " Regards, ING ";
        if(alsoSendSms) {
          vm.sendSms();
        }
      }, function(error) {
        console.log('there is an error with the feedback api.');
      });
    };

    vm.sendSms = function() {
      vm.smsMessage.to = vm.chosenCustomerDetail.to;
      smsFactory.save(vm.smsMessage);
    };

    var bulkSmsArray;

    vm.processAllCustomers = function(){
      if (vm.customerDetails.length > 0) {
        //start
        bulkSmsArray = [];
        vm.processNextCustomer(0);
      }
    }

    vm.processNextCustomer = function(id){
      var newCustomer = {};

      newCustomer.name = vm.customerDetails[id].name;
      newCustomer.to = vm.customerDetails[id].telephone;
      console.log(newCustomer.to);
      newCustomer.departmentId = vm.chosenCustomerDetail.department;
      newCustomer.question = vm.chosenCustomerDetail.question;

      feedbackFactory.save(newCustomer).$promise.then(function(feedbackResponse) {
        var newSms = {};

        newSms.to = newCustomer.to;
        newSms.message = "Hello " + newCustomer.name + ", could you provide feedback? Please use: " + feedbackResponse.link + " Regards, ING ";

        bulkSmsArray.push(newSms);
      }, function(error) {
        console.log('Skipping customer: ' + newCustomer);
      }).finally(function(){
        var nextId = id + 1;

        if (nextId < 3) { //if (nextId < vm.customerDetails.length) {
          vm.processNextCustomer(nextId);
        } else if(nextId == 3){ //} else if(nextId == vm.customerDetails.length){
          // end of the line, send sms
          console.log('Result: ' + bulkSmsArray);
          for(var i=0; i< bulkSmsArray.length; i++){
            console.log('Object: ' + bulkSmsArray[i].message);
          }
          bulkSmsFactory.save(bulkSmsArray).$promise.then(function(response) {});
        }
      });
    }


  }]);
