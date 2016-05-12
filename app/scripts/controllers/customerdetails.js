'use strict';

/**
 * Controller of the inghackathonclientApp
 */
angular.module('inghackathonclientApp')
  .controller('CustomerDetailsCtrl', ['smsFactory','feedbackFactory', function (smsFactory, feedbackFactory) {

    var vm = this;

	function initData(){
		// customer data
		vm.customerData = {};
		vm.customerData.department = "KantoorAmstelveen";
		vm.customerData.question = "Je hebt net ING kantoor Amstelveen bezocht";	
		vm.customerData.gender = "";
		vm.customerData.ageBracket = "";
		vm.customerData.privateData = {};
		vm.customerData.privateData.name = "Klant";
		vm.customerData.privateData.telephone = "";

		vm.smsMessage = {
		  message: "",
		  to: ""
		};
	}
	
	initData();
	
	vm.resultData = "";
	vm.busy = false;

    vm.sendFeedback = function(alsoSendSms) {
	  vm.busy = true;
	  
      var newCustomer = {};

      newCustomer.customerId = vm.customerData.gender + ';' + vm.customerData.ageBracket;
      newCustomer.to = vm.customerData.gender + ';' + vm.customerData.ageBracket;
      newCustomer.departmentId = vm.customerData.department;
      newCustomer.question = vm.customerData.question;

	  var customerName = vm.customerData.privateData.name;
	  
	  vm.smsMessage.to = vm.customerData.privateData.telephone;
	  
      feedbackFactory.save(newCustomer).$promise.then(function(feedbackResponse) {
        console.log(feedbackResponse);
        vm.smsMessage.message = "Beste " + customerName + ", je hebt ING kantoor Amstelveen bezocht. Geef je feedback via: " + feedbackResponse.link;
		
        if(alsoSendSms) {
          vm.sendSms(true);
        } else {
		  vm.busy = false;
		}
		vm.resultData = "Feedback aangevraagd... ";
      }, function(error) {
        console.log('there is an error with the feedback api.');
		vm.resultData = "Mislukt! Het is niet gelukt om de feedback te registreren...";
		vm.busy = false;
      });
    };

    vm.sendSms = function(phoneset) {
	  vm.busy = true;
	  
	  if(!phoneset){
		vm.smsMessage.to = vm.customerData.privateData.telephone;			
	  }
      smsFactory.save(vm.smsMessage).$promise.then(function(response) {
		console.log('SMS verzonden');
		initData();
		vm.resultData += "en SMS succesvol verzonden.";
		vm.busy = false;
      }, function(error) {
        console.log('there is an error with the sms api.');
		vm.resultData = "Mislukt! Het is niet gelukt de SMS te verzenden...";
		vm.busy = false;
      });
    };

  }]);
