'use strict';

/**
 * @ngdoc function
 * @name inghackathonclientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the inghackathonclientApp
 */
angular.module('inghackathonclientApp')
  .controller('CustomerDetailsCtrl', ['smsFactory', function (smsFactory) {

    var vm = this;

    vm.smsMessage = {
      body: "",
      to: "0031624543741"
    };

    vm.sendSms = function() {
      console.log('send sms');
      smsFactory.save(vm.smsMessage);
    };

  }]);
