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

    //vm.groups = [
    //  {name: "leeuwarden",
    //    id: 8},
    //  {name: "developers",
    //    id: 9},
    //  {name: "rutger",
    //    id: 10},
    //  {name: "twilio",
    //    id: 11},
    //  {name: "TestGroup",
    //    id: 1},
    //  {name: "SMILingDX",
    //    id: 2},
    //  {name: "Subjury1",
    //    id: 3},
    //  {name: "Subjury2",
    //    id: 4},
    //  {name: "Subjury3",
    //    id: 5},
    //  {name: "24hCodING",
    //  id: 6},
    //  {name: "ExtraGroup",
    //    id: 7}
    //];

    vm.groups = [
      {name: "mkbdemo",
        id: 1},
      {name: "demo",
        id: 2},
      {name: "test_feitze",
        id: 3}
    ];

    vm.chosenCustomerDetail = {};

    //vm.chosenCustomerDetail.department = "Hoofddorp";
    //vm.chosenCustomerDetail.question = "You visited an ING branch office";
    //
    //vm.chosenCustomerDetail.department = "24hCodING";
    //vm.chosenCustomerDetail.question = "You participated in the 24hCodING";

    vm.chosenCustomerDetail.department = "MKBdag";
    vm.chosenCustomerDetail.question = "You participated in the Mangement dag MKB";

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

      newCustomer.customerId = vm.chosenCustomerDetail.name;
      newCustomer.to = vm.chosenCustomerDetail.to;
      newCustomer.departmentId = vm.chosenCustomerDetail.department;
      newCustomer.question = vm.chosenCustomerDetail.question;

      feedbackFactory.save(newCustomer).$promise.then(function(feedbackResponse) {
        console.log(feedbackResponse);
        //vm.smsMessage.message = "Hello " + newCustomer.customerId + ", could you provide feedback? Please use: " + feedbackResponse.link + " Regards, ING ";
        vm.smsMessage.message = "Dear " + newCustomer.customerId + ", today you were part of the management dag MKB. Please use: " + feedbackResponse.link;

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

    vm.sendSmsBulk = function() {
      bulkSmsFactory.save(bulkSmsArray).$promise.then(function(response) {
        var nrOfMessagesSent = 0;
        for(var i=0; i< response.length; i++){
          if(response[i].status == "OK") {
            nrOfMessagesSent++;
          }
        }
        vm.bulkResultText = " " + nrOfMessagesSent + " messages sent";
      });
      vm.bulkSmsRecipients = "";
    };

    var bulkSmsArray;
    var nrOfFeedbackRequests;

    vm.processAllCustomers = function(){
      nrOfFeedbackRequests = 0;

      for(var i=0; i< vm.customerDetails.length; i++){
        if(vm.chosenGroup.name == vm.customerDetails[i].group){
          nrOfFeedbackRequests++;
        }
      }

      if (vm.customerDetails.length > 0) {
        //start
        bulkSmsArray = [];
        vm.bulkSmsRecipients = "";
        vm.processNextCustomer(0);
      }
    }

    vm.processNextCustomer = function(id){
      var newCustomer = {};

      newCustomer.customerId = vm.customerDetails[id].name;
      newCustomer.to = vm.customerDetails[id].telephone;
      newCustomer.departmentId = vm.chosenCustomerDetail.department;
      newCustomer.question = vm.chosenCustomerDetail.question;

      var correctGroup = false;

      if(vm.chosenGroup.name == vm.customerDetails[id].group){
        // correctGroup = true;
        feedbackFactory.save(newCustomer).$promise.then(succesFunc(newCustomer), errorFunc(newCustomer)).finally(finallyFunc(id));
      } else {
        //correctGroup = false;
        finallyFunc(id)();
      }
    }

    function succesFunc(newCustomer){
      return function(feedbackResponse) {
        var newSms = {};

        newSms.to = newCustomer.to;
        newSms.message = "Dear " + newCustomer.customerId + ", today you were part of the management dag MKB. Please use: " + feedbackResponse.link;
        bulkSmsArray.push(newSms);
      }
    }

    function errorFunc(newCustomer) {
      return function (error) {
        console.log('Skipping customer: ' + newCustomer);
      }
    }

    function finallyFunc(id) {
      return function(){
        var nextId = id + 1;
        vm.bulkProcessingText = " Busy with retrieving feedback link " + bulkSmsArray.length + " of " + nrOfFeedbackRequests + "...";

        //// Temp to bombard
        //if(nextId == vm.customerDetails.length && vm.bombard > 0){
        //  vm.bombard--;
        //  nextId = 0;
        //}

        if (nextId < vm.customerDetails.length) {
          vm.processNextCustomer(nextId);
        } else if(nextId == vm.customerDetails.length){
          // end of the line, send sms
          console.log('Result');
          vm.bulkSmsRecipients = "";
          for(var i=0; i< bulkSmsArray.length; i++){
            vm.bulkSmsRecipients += bulkSmsArray[i].to + "\n";
            //console.log('Object: ' + bulkSmsArray[i].message);
          }

          vm.bulkProcessingText = " Processed feedback link for " + bulkSmsArray.length + " of " + nrOfFeedbackRequests + "...";
        }
      }
    }



  }]);
