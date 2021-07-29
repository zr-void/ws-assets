/*
 * wafasalaf 
 * Responsive base theme for Drupal.
 * 
 *
 * Copyright (c) 2021, 
 * Released under the  license.
*/

//== Scaffolding
//
//## Settings for some of the most global objects.
// @todo: Add viewport example
// @todo: Add Variables example.
// @todo: update nomcloture.
(function ($, Drupal) {
    "use strict";

    Drupal.vactory = Drupal.vactory || {};
    Drupal.vactory.utility = Drupal.vactory.utility || {};
    Drupal.vars = Drupal.vars || {};
    Drupal.vars.vactory = Drupal.vars.vactory || {};

    //== Variables
    //
    //## Global variables
    Drupal.vars.vactory = {
        lang: ($("html").attr("lang") && $("html").attr("lang").length) ? $("html").attr("lang").replace("eng", "en") : 'en',
        is_rtl: ($('html[dir=\'rtl\']').length) ? true : false
    };

})(jQuery, Drupal);
;(function($, Drupal) {
  "use strict";

  Drupal.vactory.utility.chat = function() {
    if(typeof zE != "undefined"){
      zE(function() {
        zE.hide();
      });

      $('.btn-chat').click(function() {
        zE.activate({hideOnClose: true});
      });
    }
  };

})(jQuery, Drupal);
;//== Deal tooltip
//
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.refreshTooltipDeal = function () {
      // refresh position tootltip Deal & show it
      var dealTooltip = $('.simulator-deal-tooltip');
      // remove tooltip cloned
      $('.js-deal-tooltip .simulator-deal-tooltip').remove();

      // break if tooltip not exist
      if(!$('.js-form-fields-simulator .simulator-deal-tooltip').length) return;
      // Clone element Deal tootip
      $('.js-form-fields-simulator .simulator-deal-tooltip').each(function() {
        var _this = this;
        $(_this).clone().appendTo($(_this).parents('form').find('.js-deal-tooltip')).fadeIn(function(){
            $(_this).parents('form').find('.js-deal-tooltip .simulator-deal-tooltip').addClass('show');
        });
      });
      // close tooltip
      $('.simulator-deal-tooltip .icon-close').on('click touch', function(){
        $('.js-deal-tooltip .simulator-deal-tooltip').remove();
      });
    };

})(jQuery, Drupal);
;//== Disable links
//
//## Target elements with CSS class .disablelink and prevent default.
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.disableLink = function () {
        var isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        // Activate Call option juste on mobile
        $(document).on('click', '[href^="tel:"]', function(e){
            if(!isDevice) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $('.disablelink').click(function (e) {
            e.preventDefault();
        });
    };

})(jQuery, Drupal);;//== Files
//
//## Apply custom skin to upload fields.
(function($, Drupal) {
  "use strict";

  Drupal.vactory.utility.filesUpload = function() {
    var managedFile = jQuery('.form-managed-file, .form-item.form-type-file');
    var fileWrapper = jQuery('.skined-file-wrapper');
    if (managedFile.length) {
      managedFile.each(function(index, el) {

        // Move descriptions below input field.
        var descriptionField = $(el).next('.description');
        if (descriptionField.length) {
          descriptionField.appendTo($(el).parent().parent());
          descriptionField.addClass('file-description');
        }

        // Add label text to input field.
        $(el).append('<span class="help-block">' + Drupal.t("Upload your file") + '</span>');

        $(el).find('input[type="file"]').on('change', function(event) {
          var $this = $(this);

          if ($this[0].files.length) {
            $this.closest('.form-item').find('label').text($this[0].files[0].name);
            $this.closest('.form-item').find('.error').remove();
          } else {
            $this.closest('.form-item').find('label').text($this.closest('.form-item').attr('data-label'));
            $this.closest('.form-item').find('.error').detach().insertAfter($this.closest('.form-item .form-managed-file'));
          }
        });
        $(el).closest('.form-item').attr('data-label', $(el).closest('.form-item').find('label').text());
      });
    } else if (fileWrapper.length) {
      fileWrapper.find('input[type="file"]').on('change', function(event) {
        var $that = $(this);
        if ($that[0].files.length) {
          fileWrapper.find('.help-block').text($that[0].files[0].name);
        } else {
          fileWrapper.find('.help-block').text(Drupal.t('No file chosen'));
        }
      });
    }
  };

})(jQuery, Drupal);
;//== Form validation
//
//## add validation to forms.
(function($, Drupal) {
  "use strict";

  Drupal.vactory.utility.formValidation = function() {

    var _modalError = $('<div></div>').attr({
      'class':'modal fade',
      'id': 'form-validation-modal-wrapper'
    });
    _modalError.append($('<div></div>').attr({'class':'modal-dialog modal-dialog-centered'}).append($('<div></div>').attr({'class':'modal-content'})));
    _modalError.find('.modal-content').append($('<div></div>').attr({'class':'modal-body'}));
    _modalError.find('.modal-body').append($('<div></div>').attr({'class':'messages messages--danger alert alert-danger m-0 messages-error-wrapper'}));
    _modalError.find('.messages').append($('<ul></ul>').attr({'class':'messages__list'}));
    _modalError.find('.modal-body').after($('<div></div>').attr({'class':'modal-footer'}));
    _modalError.find('.modal-footer').append($('<button>'+Drupal.t('Close')+'</button>').attr({
      'class': 'btn btn-sm btn-primary',
      'data-dismiss': 'modal',
      'type': 'button'
    }));
    $('body').append(_modalError);

    jQuery.validator.setDefaults({

      debug: false,
      // change error class
      errorClass: "is-invalid",
      // change valid class
      validClass: "is-valid",
      // comment this two fields to use bootstrap default markup for error
      wrapper: "li",
      errorLabelContainer: $('#form-validation-modal-wrapper').find('.messages__list'),

      // personalised messages
      messages: {
        // required:Drupal.t("This field is required."),
        remote: Drupal.t("Veuillez corriger ce champ."),
        email: Drupal.t("Veuillez saisir une adresse email valide."),
        url: Drupal.t("Veuillez saisir un URL valide."),
        date: Drupal.t("Veuillez saisir une date valide."),
        dateISO: Drupal.t("Veuillez saisir une date valide (ISO)."),
        number: Drupal.t("Veuillez saisir un numéro valide."),
        digits: Drupal.t("Ne saisissez que des chiffres."),
        creditcard: Drupal.t("Veuillez saisir un numéro de carte de crédit valide."),
        equalTo: Drupal.t("Veuillez saisir la même valeur."),
        accept: Drupal.t("Veuillez saisir une valeur avec une extension valide."),
        maxlength: jQuery.validator.format(Drupal.t("Veuillez saisir au plus {0} caractères.")),
        minlength: jQuery.validator.format(Drupal.t("Veuillez saisir au moin {0} caractères.")),
        rangelength: jQuery.validator.format(Drupal.t("Veuillez saisir une velur de taille entre {0} et {1} caractères.")),
        range: jQuery.validator.format(Drupal.t("Veuillez saisir une valeur entre {0} et {1}.")),
        max: jQuery.validator.format(Drupal.t("Veuillez saisir une valeur inférieure ou égale à {0}.")),
        min: jQuery.validator.format(Drupal.t("Veuillez saisir une valeur supérieur ou égale à {0}."))
      },

      highlight: function (element) {
        var phoneLabelIndex = "";

        $.each(this.errorList, function (key, value) {
          if (value.element.name == 'phone' && value.method == 'emailOrPhone') {
            phoneLabelIndex = key;
          }
        });

        if (phoneLabelIndex !== "") {
          this.errorList.splice(phoneLabelIndex, 1);
        }

        var _el = $(element);
        if (_el.is('select')) {
          _el.siblings('button').addClass('is-invalid');
          _el.siblings('.btn-group').find('button').addClass('is-invalid');
          _el.parents('.form-group').find('label').addClass('is-invalid');
        } else if (_el.is('input:radio')) {
          _el.parents('fieldset').addClass('is-invalid');
        } else if (_el.is('input:file')) {
          _el.addClass('is-invalid');
        } else if (_el.is('input[type="date"]')) {
          _el.addClass('is-invalid').siblings('label').addClass('is-invalid');
        } else if (_el.is("textarea")) {
          _el.addClass('is-invalid').parents('.form-group').find('label').addClass('is-invalid');
        } else {
          _el.addClass('is-invalid');
        }
      },

      unhighlight: function (element) {
        var _el = $(element);
        if (_el.is('select')) {
          _el.siblings('button').removeClass('is-invalid');
          _el.siblings('.btn-group').find('button').removeClass('is-invalid');
          _el.parents('.form-group').find('label').removeClass('is-invalid');
        } else if (_el.is('input:radio')) {
          _el.parents('fieldset').removeClass('is-invalid');
        } else if (_el.is('input:file')) {
          _el.removeClass('is-invalid');
        } else if (_el.is('input[type="date"]')) {
          _el.removeClass('is-invalid').siblings('label').removeClass('is-invalid');
        } else if (_el.is("textarea")) {
          _el.removeClass('is-invalid').parents('.form-group').find('label').removeClass('is-invalid');
        } else {
          _el.removeClass('is-invalid');
        }
      },

      // handler for invalid form
      invalidHandler: function(event, validator) {
        // 'this' refers to the form
        var errors = validator.numberOfInvalids();
        if (errors) {
          // comment if not using errors messages wrapper
          $('#form-validation-modal-wrapper').modal('show');
        } else {
          // comment if not using errors messages wrapper
          $('#form-validation-modal-wrapper').modal('hide');
        }
      },
      // handler for valid form
      submitHandler: function(form) {
        // do other things for a valid form
        form.submit();
      }

    });

    // override default messages for specific form field
    $.validator.messages.required = function (param, input) {
      var _input = $(input), _name = "";

        if (_input.is("input[type='radio']")) {
          _name = $(input).parents('fieldset').find('.fieldset-legend').text();
        } else {
          _name = $(input).parents('.form-group').find('label').text();
        }
      return _name.replace('*','') + ' ' + Drupal.t('est obligatoire');
    };

    // override default messages for input type minlength
    $.validator.messages.minlength = function (param, input) {
        var _name = $(input).parents('.form-group').find('label').text();
        return  Drupal.t("Le champ @name doit être composé de @param lettres au moins", {
          '@name': _name.replace('*',''),
          '@param': param
        });
    };

    // override default messages for input type alphab
    $.validator.messages.alphab = function (param, input) {
      var _name = $(input).parents('.form-group').find('label').text();
      return  Drupal.t("Le champ @name ne doit contenir que des lettres", {
        '@name': _name.replace('*','')
      });
    };

      $.validator.messages.no_arabic = function (param, input) {
          var _name = $(input).parents('.form-group').find('label').text();
          return  Drupal.t("Le champ @name ne doit contenir que des lettres latins", {
              '@name': _name.replace('*','')
          });
      };

    // override default messages for input type password
    $.validator.messages.ws_password = function (param, input) {
        var _name = $(input).parents('.form-group').find('label').text();
        return  Drupal.t("Le champ @name doit contenir au moins 8 caractères alphanumériques (au moins une lettre et un chiffre)", {'@name': _name.replace('*','')});
    };

    // add specific method - Letter & letter acented & Arabic caracters
    jQuery.validator.addMethod('alphab', function (value, element){
      return this.optional(element) || /^[\u0041-\u005A\u0061-\u007A\u00C0-\u00F6\u0600-\u06FF \s]+$/.test(value)
      //return this.optional(element) || /^[\u0000-\u007F\u0600-\u06FF \-_\s]+$/.test(value)
     // return this.optional(element) || /^[\p{L}]+[\p{L}\s-]*$/.test(value)
    });

    jQuery.validator.addMethod('no_arabic', function (value, element){
      return this.optional(element) || /^[^\u0600-\u06FF]+$/.test(value)
    });

    jQuery.validator.addMethod('tele', function (value, element) {
      return this.optional(element) || /[+]{0,1}[0-9]{1,4}[\s]{0,1}[0-9]{9,14}$/.test(value);
    }, Drupal.t("Veuillez saisir un numéro de téléphone valide"));

    jQuery.validator.addMethod('fullEmail', function (value, element) {
      return this.optional(element) || /\S+@\S+\.\S+/.test(value);
    }, Drupal.t("Veuillez saisir une adresse email valide"));

    jQuery.validator.addMethod('emailOrPhone', function (value, element) {
      return $("#edit-email").val() !== "" || $("#edit-mobile-phone").val() !== "";
    }, Drupal.t("Vous devez renseigner au moin un champ de contact"));

    jQuery.validator.addMethod("extension", function(value, element, param) {
      param = typeof param === "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
      return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
    }, Drupal.t("Veuillez saisir une valeur avec une extension valide."));

    jQuery.validator.addMethod('tele_wafasalaf', function (value, element) {
      return this.optional(element) || /^0[6|7]\d{8}$/.test(value);
    }, Drupal.t("Veuillez saisir un numéro de téléphone mobile valide"));

    jQuery.validator.addMethod('tele_fixe_wafasalaf', function (value, element) {
        return this.optional(element) || /^05\d{8}$/.test(value);
    }, Drupal.t("Veuillez saisir un numéro de téléphone fixe valide"));

    jQuery.validator.addMethod('cin', function (value, element) {
        return this.optional(element) ||
            // CIN maroc sans tiret.
            /^(([a-zA-Z]{1,2})([0-9]{3,6}))$/.test(value) ||
            // CIN maroc avec tiret sans espace.
            /^(([a-zA-Z]{2})[-]([0-9]{3,6}))$/.test(value) ||
            // CIN maroc avec tiret et espace.
            /^(([a-zA-Z]{1})[ ][-]([0-9]{3,6}))$/.test(value) ||
            // CIN Etranger avec tiret avec espace.
            /^(([a-zA-Z]{1})[ ][-]([0-9]{1,6})([a-zA-Z]{1}))$/.test(value) ||
            // CIN Etranger avec tiret sans espace.
            /^(([a-zA-Z]{2})[-]([0-9]{1,6})([a-zA-Z]{1}))$/.test(value) ||
            // CIN Etranger sans tiret.
            /^(([a-zA-Z]{1,2})([0-9]{1,6})([a-zA-Z]{1}))$/.test(value)
    }, Drupal.t("Format de la CIN incorrecte"));

    jQuery.validator.addMethod('captcha_validation', function (value, element) {
        var googleResponse = jQuery('#g-recaptcha-response').val();
        return googleResponse.length > 0;
    }, Drupal.t("Veuillez valider le captcha"));

    jQuery.validator.addMethod('ws_password', function (value, element) {
        return this.optional(element) || (value.length >= 8 && /^(?=.*\d)(?=.*([a-zA-Z])).{8,20}$/.test(value));
    });

    jQuery.validator.addMethod('password', function (value, element) {
        return this.optional(element) || (value.length >= 5);
    });

    jQuery.validator.addMethod('date_range', function (value, element) {
      var _date = value.split('/');
      return (this.optional(element) ||
          (_date[0] > 0 && _date[0] < 32) &&
          (_date[1] > 0 && _date[1] < 13) &&
          (_date[2] > 1930 && _date[2] < 2100)
      );
    }, Drupal.t("Veuillez saisir une date valide"));

    jQuery.validator.addMethod('birth_date_validation', function (value, element) {
        var _birthDate = process(value);
        var _today = new Date();
        var diff = _today.getFullYear() - _birthDate.getFullYear();
        var m = _today.getMonth() - _birthDate.getMonth();
        if (m < 0 || (m === 0 && (_today.getDate() < _birthDate.getDate()))) {
            diff--;
        }
        return this.optional(element) || (diff >= 18 && diff < 73);
    }, Drupal.t("Vous devez avoir entre 18 ans et 72 ans."));

    jQuery.validator.addMethod("require_from_group", function(value, element, options) {
      var validator = this;
      var selector = options[1];
      var validOrNot = $(selector, element.form).filter(function() {
        return validator.elementValue(this);
      }).length >= options[0];

      if(!$(element).data('being_validated')) {
        var fields = $(selector, element.form);
        fields.data('being_validated', true);
        fields.valid();
        fields.data('being_validated', false);
      }
      return validOrNot;
    }, Drupal.t("Veuillez renseigner au moin {0} champs."));

    jQuery.validator.addMethod('minAge', function(value, element, min) {
      var today = new Date();
      var userDate = value.split('/');
      var birthDate = new Date(userDate[2], userDate[1]-1, userDate[0]);
      var age = today.getFullYear() - birthDate.getFullYear();

      if (age > min+1) {
        return true;
      }

      var m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age >= min;

    }, Drupal.t("Vous devez avoir entre 18 ans et 72 ans"));

    jQuery.validator.addMethod('maxAge', function(value, element, max) {
      var today = new Date();
      var userDate = value.split('/');
      var birthDate = new Date(userDate[2], userDate[1]-1, userDate[0]);
      var age = today.getFullYear() - birthDate.getFullYear();

      if (age <= max) {
        return true;
      }

      var m = today.getMonth() - birthDate.getMonth();

      if (m > 0 || (m === 0 && today.getDate() > birthDate.getDate())) {
        age++;
      }

      return age <= max;

    }, Drupal.t("Vous devez avoir entre 18 ans et 72 ans"));


    $(function() {
        // Date fields masks function.
        addMaskToDateFields();
        // Date time fields masks function
        addMaskToDateTimeFields();

      // add validation for form Newsletter
      $('.block--footer-mailchimp form').validate({
        rules: {
          email: {
            required: true,
            fullEmail: true
          }
        }
      });

      //add validation for form  user login
      $('.user-login-form').validate({
        rules: {
          name: {
            required: true
          },
          pass: {
            required: true,
            minlength: 3
          }
        }
      });

      //add validation for form  user pass
      $('.user-pass').validate({
        rules: {
          name: {
            required: true,
            fullEmail: true
          }
        }
      });

      // Add validation to date fields
      $('.js-field-date').rules("add", {date_range: true});
    });

  };

})(jQuery, Drupal);


function addMaskToDateFields() {
    (function($) {
        if(!$('.js-field-date').length)
          return;
        $(".js-field-date").mask("99/99/9999");
    })(jQuery);
}

function addMaskToDateTimeFields() {
  (function($) {
    if(!$('.js-field-time').length)
      return;
    $(".js-field-time").mask("99:99");
  })(jQuery);
}

function process(date){
    var parts = date.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

;//== Go Back Button.
//
//##
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.goBackButton = function () {
      var $btn_back_form = $('#button-back-form'),
          $btn_back_home = $('#button-back-home'),
          $form_back = $('input[data-drupal-selector="edit-previous"]');

      $btn_back_form.click(function (e) {
          e.preventDefault();
          if ($form_back.length > 0) {
            $form_back.trigger('click');
          }
      });
    };

})(jQuery, Drupal);
;//== Go TOP Sticky Button.
//
//## Show or hide the sticky footer button
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.gotoStickyButton = function () {
      var $element = $('.vf-go-back-top'),
      $document = $('html, body');

      $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
          $element.fadeIn(200);
        } else {
          $element.fadeOut(200);
        }
      });

      // Animate the scroll to top.
      $element.click(function (event) {
        event.preventDefault();
        $document.animate({scrollTop: 0}, 300);
      });
    };

})(jQuery, Drupal);
;//== Portrait / Landscape detection
//
//## Disable Portrait for Tablet & Landscape for Mobile.
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.detectInterstitiel = function () {
      var isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
          $_body = $('body'),
          $_window = $(window);

      // Init defaults
      // Whatever we have passed this before or not.
      $_body.data('interstitielDisabled', false);

      // deactivate when focus on input in mobile
      if (isDevice) {
        $(document).on('focus', 'input, textarea', function() {
          $_body.data('interstitielDisabled', true);
        });

        $(document).on('blur', 'input, textarea', function() {
          $_body.data('interstitielDisabled', false);
        });
      }

      // Apply interstitiel
      if (matchMedia("(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)").matches || matchMedia("(max-width: 768px) and (orientation: landscape)").matches) {
        $_body.addClass("interstitiel-mode");
      }

      // Wait until innerheight changes, for max 45 frames
      function orientationChanged() {
        var timeout = 45;
        return new window.Promise(function (resolve) {
          var go = function (i, height0) {
            window.innerHeight != height0 || i >= timeout ?
            resolve() :
            window.requestAnimationFrame(function () {
              go(i + 1, height0);
            }); // jshint ignore:line
          };
          go(0, window.innerHeight);
        });
      }

      $_window.on("orientationchange", function () {
        orientationChanged().then(function () {
          // Apply interstitiel
          if ($_body.data('interstitielDisabled') === false) {
            if (matchMedia("(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)").matches || matchMedia("(max-width: 768px) and (orientation: landscape)").matches) {
              $_body.addClass("interstitiel-mode");
            }
          }
        });
      });

      // Close Interstitiel
      $('#interstitiel-button--close').on("click touchstart", function (e) {
        e.preventDefault();
        $_body.removeClass("interstitiel-mode");
        $_body.data('interstitielDisabled', true);
      });
    };

})(jQuery, Drupal);
;//== form label animations
//
//## Apply custom class to add animations to forms label.
(function($, Drupal) {
  "use strict";

  Drupal.vactory.utility.labelAnimation = function() {
    $('input').each(function(i, e) {
      if (typeof $(this).data('placeholder') !== 'undefined') {
        var pholder = $(this).data('placeholder');
        $(this).attr("placeholder", pholder).addClass('js-placeholder');
      }
    });

    $('input[type="number"]').on('keydown', function(event) {
      var validkeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ',', '.', 'Backspace', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
      if (validkeys.indexOf(event.key) < 0) {
        event.preventDefault();
      }
    });


    $('form .animated-label input').each(function(index, value) {
      ($(value).val() != '') ? $(value).parent().find('label').addClass('animated'): $(value).parent().find('label').removeClass('animated');
    });

    $('form .animated-label input[autofocus="autofocus"]').parent().find('label').addClass('animated');

    // $('form .animated-label input[autofocus]').trigger('focusin');

    $('form .animated-label input').on('focusin', function() {
      $(this).parent().find('label').addClass('animated');
    });

    $('form .animated-label input').on('focusout blur', function(e) {
      if (!this.value) {
        $(this).parent().find('label').removeClass('animated');
      }
    });

    $('form .animated-label input').on('checkval', function() {
      var label = $(this).parent().find('label');
      if (this.value !== '') {
        label.addClass('animated');
      } else {
        label.removeClass('animated');
      }
    }).on('keyup change blur input', function() {
      $(this).trigger('checkval');
    });
  };

})(jQuery, Drupal);
;//== Go TOP Sticky Button.
//
//## Show or hide the sticky footer button
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.messagesOnModal = function () {
      if( $("#modal-messages").length ){//region will be printed even if the highlighted area is blank
          $('#modal-messages').modal('show');
      }
    };

})(jQuery, Drupal);
;//== select picker
//
//## Apply selectpicker


(function($, Drupal) {
  "use strict";

  Drupal.vactory.utility.selectpicker = function() {
    var isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if(!isDevice) {

      $.each($('select.selectpicker, select:not([multiple="multiple"]), #lang-dropdown-select-language'), function (i, el) {
        $(el).selectpicker({
          style: 'custom'
        });
      });
      $('select:not([multiple="multiple"])').each(function(index, value){
        ($(value).is(':visible') && $(value).hasClass('js-autocomplete')) ? $(value).attr('data-live-search', true).attr('data-none-results-text', Drupal.t('Aucun résultat')) : null;
        ($(value).is(':visible')) ? $(value).selectpicker() : null;
      });

      // referesh simulator select picker

      $('.simulator-item select').on('change', function() {
        var refreshSelect = setTimeout(function(){
          $('.simulator-item select').selectpicker('refresh');
          clearTimeout(refreshSelect);
        },100);
      });

    }
    else {

      $('select').each(function(){
        if (!$(this).parent().hasClass('group-select')) {
          $(this).parent().addClass('group-select');
        }

        if(!($(this).siblings().is("span"))){
          $(this).parent().append("<span class='selected-option'> "+$(this).find("option:selected").text()+"</span>");
        }

      });

      $('select').change(function () {
        var str =  $(this).find( "option:selected").text();
        $(this).parent().find(".selected-option").text(str);
      });

    }
  };

})(jQuery, Drupal);
;//== Tabs
(function ($, Drupal) {
    "use strict";

    Drupal.vactory.utility.bootstrap_tabs = function () {
      // Show first tab by default.
      // Ignore the "primary" tabs on the node edit page.
      if ($.fn.tab) {
        var tabs = $('.nav-tabs').not('.primary'),
        hash = window.location.hash;
        tabs.children('li').first().find('a').tab('show');

        if (hash) {
          $('.nav-tabs > li > a[href$="' + hash + '"]').tab('show');
        }
      }
    };

})(jQuery, Drupal);
;//== reskin select picker after ajax callback
//
//##
(function ($, Drupal) {
    "use strict";

    Drupal.behaviors.ajaxCallback = {
      attach: function(context, settings) {
        $.ajaxSetup({
          cache: true
        });

        $(context).find('select').once('reSkinSelect').each(function(){
          Drupal.vactory.utility.selectpicker();
        });
        $(context).find('input').once('reCheckValue').each(function(){
          Drupal.vactory.utility.labelAnimation();
        });

      }
    };

})(jQuery, Drupal);
;// Language popup.
(function ($, Drupal, drupalSettings) {
    "use strict";

    Drupal.behaviors.campaigns = {

        attach: function (context, settings) {

            // if (drupalSettings.utm_source !== undefined && localStorage.getItem('utm_source') == null) {
            if (drupalSettings.utm_source !== undefined) {
              localStorage.setItem('utm_source', drupalSettings.utm_source);
            }

            if (drupalSettings.utm_campaign !== undefined) {
              localStorage.setItem('utm_campaign', drupalSettings.utm_campaign);
            }
        }

    };

})(jQuery, Drupal, drupalSettings);
;// Language popup.
(function ($, Drupal, drupalSettings) {
    "use strict";

    Drupal.behaviors.lang_popup = {

        attach: function (context, settings) {

            if ($.isFunction($.cookie) && typeof $.cookie('ws_custom_lang_selector') === 'undefined'){
              $.cookie("ws_custom_lang_selector", "1", { expires : 365, path: '/'});

              if (localStorage.getItem('ws_custom_lang_selector') == null) {
                localStorage.setItem('ws_custom_lang_selector', '1');
                var fr = drupalSettings.selectedLang[0].lang_url.frensh;
                var ar = drupalSettings.selectedLang[0].lang_url.arabic;

                var element = '<div class="modal fade modal-language" id="modal-language" tabindex="-1" role="dialog" aria-labelledby="modal-language"\n' +
                  '     aria-hidden="true">\n' +
                  '    <div class="modal-dialog modal-dialog-centered" role="document">\n' +
                  '        <div class="modal-content">\n' +
                  '            <div class="modal-body text-center">\n' +
                  '                <h2> Choisissez votre langue </br>\n' +
                  '                اختر لغتك </h2>\n' +
                  '                <a  href="' + fr + '" id="fr_link" class="btn btn-primary"> Français </a>\n' +
                  '                <a href="' + ar + '" id="ar_link" class="btn btn-primary"> العربية </a>\n' +
                  '            </div>\n' +
                  '        </div>\n' +
                  '    </div>\n' +
                  '</div>\n';
                $(element).modal();
              }
            }
        }
    };


})(jQuery, Drupal, drupalSettings);
;// page load event

(function ($, Drupal) {
  "use strict";
  // override lazysizes options
  window.lazySizesConfig = window.lazySizesConfig || {};
  window.lazySizesConfig.loadMode = 1;
  // window.lazySizesConfig.preloadAfterLoad = false;
  window.lazySizesConfig.init = false;

  // function addScript(path) {
  //   var script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.src = path;
  //   script.setAttribute("defer", "defer");
  //   document.getElementsByTagName("head")[0].appendChild(script);
  // }

  // var wow = new WOW({
  //   boxClass: 'wow',
  //   animateClass: 'animated',
  //   mobile: false,
  //   duration: '.3s',
  //   offset: -20,
  //   live: true,
  //   callback: function (box) {
  //     if ($(box).find('.js-number-animate').length) {
  //       goToNumber($(box).find('.js-number-animate'));
  //     }
  //   }
  // });


  Drupal.behaviors.page_load = {
    attach: function (context, setting) {

      document.addEventListener('readystatechange', function (event) {
        if (event.target.readyState === 'loading') {
          // The document is still loading.
        } else if (event.target.readyState === 'interactive') {
          // The document has finished loading. We can now access the DOM elements.
          // But sub-resources such as images, stylesheets and frames are still loading.
        } else if (event.target.readyState === 'complete') {
          // The page is fully loaded.
          // addScript('/themes/wafasalaf/simulator/build/static/js/main.js');

          document.documentElement.className += " js-loaded";
          document.querySelector('body').classList.add('domLoaded');

          // wow.init();
          lazySizes.init();
        }
      });
    }
  };

})(jQuery, Drupal);
;// Bootstrap popover.

(function ($, Drupal) {
    "use strict";

    Drupal.behaviors.bootstrap_popover = {
        attach: function (context, setting) {
            if ($.fn.popover) {
                $("[data-toggle='popover']").popover();
            }
        }
    };

})(jQuery, Drupal);
;(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.sticky_bar = {
    attach: function () {

      $(document).ready(function () {

        // Variables
        var _tab_wrapper = $('.bar-tabs-wrapper'),

          _tab = $('.bar-tabs'),

          _tab_home = $('.bar-tabs.main-actions-home'),

          _last_active_tab = {
            tab: null,
            height: null,
            active: false
          },

          _tab_height = (_tab.length) ? _tab.find('.tab-content').outerHeight(true) + 56 : null,

          homeTabOffset = (_tab_home.length) ? _tab_home.offset().top + _tab_height + 30 : null,

          windowScrollTop,

          _headerHeight = $('.vh-header.vh-variant3').outerHeight(true),

          homePage = $('body.page--front'),

          isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

          lastScroll = 0;

        if (!_tab.length) {
          return;
        }

        // button sticky closer
        $('.bar-tabs .tab-closer').on('click', function(event) {
          event.preventDefault();
          _last_active_tab.tab = $('.tabs-items .item .active');
          _last_active_tab.height = _tab.find('.tab-content').outerHeight(true) + 56;
          _last_active_tab.active = true;
          $('.bar-tabs').removeClass('item-active').find('*').removeClass('active show');
        });

        // Fixed the block of sticky_bar when scroll to bottom
        $(window).on('scroll', function () {
          windowScrollTop = $(window).scrollTop();

          _tab_height  = (_tab.length) ? _tab.find('.tab-content').outerHeight(true) + 56 : null;

          if (homePage.length && matchMedia('(min-width: 992px)').matches) {

            homeTabOffset = (!_tab.hasClass('sticky-bar')) ? _tab_home.offset().top + _tab_height + 30 : homeTabOffset;

            // Front page
            if (windowScrollTop > homeTabOffset) {

              _tab.addClass('sticky-bar');
              if (_last_active_tab.height !== null) {
                _tab_wrapper.css('height', _last_active_tab.height);
              } else {
                _tab_wrapper.css('height', _tab_height);
              }
              // $('body').css('padding-bottom', _tab_height);

              if (windowScrollTop < lastScroll) {
                // $('body').css('padding-bottom', '0');
                var _timer = setTimeout(function () {
                  _tab.removeClass('sticky-bar-bottom').addClass('sticky-bar-top');
                  clearTimeout(_timer);
                }, 300);
              } else {
                  // $('body').css('padding-bottom', _tab_height);
                var _timer = setTimeout(function () {
                  _tab.removeClass('sticky-bar-top').addClass('sticky-bar-bottom');
                  clearTimeout(_timer);
                }, 300);
              }

              lastScroll = windowScrollTop;

            } else if (windowScrollTop <= homeTabOffset) {
              _tab_wrapper.css('height', 'auto');
              // $('body').css('padding-bottom', '0');
              _tab.removeClass('sticky-bar').removeClass('sticky-bar-top');
              if (_last_active_tab.tab !== null && _last_active_tab.active) {
                _last_active_tab.tab.trigger('click');
                _last_active_tab.active = false;
              }
            }

          } else {
            // not home page
            if (windowScrollTop > _headerHeight) {

              if (windowScrollTop < lastScroll) {
                var _timer = setTimeout(function () {
                  _tab.removeClass('sticky-bar-bottom').addClass('sticky-bar-top');
                  clearTimeout(_timer);
                }, 300);
              } else {
                var _timer = setTimeout(function () {
                  _tab.removeClass('sticky-bar-top').addClass('sticky-bar-bottom');
                  clearTimeout(_timer);
                }, 300);
              }

            } else {
              _tab.removeClass('sticky-bar-bottom').addClass('sticky-bar-top');
            }

            lastScroll = windowScrollTop;
          }
        });

        // Activate tabs on click
        $('.bar-tabs').find('.bar-tab-head li a:not([data-type="link"])').on('click', function (e) {
          e.preventDefault();

          // initialize map when click on map tabs
          if ( $(this).attr('data-id') == "#agences-home" || $(this).attr('data-id') == "#agences" ) {
            var target = $(this).attr('data-id');
            var map_element = $(target).find('.location-map');
            if (!map_element.hasClass('map-initialized')) {

              var clusterScript = "https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/src/markerclusterer.js";
              var locatorScript = "/modules/vactory/vactory_locator/js/locator.min.js";

              $.getScript(clusterScript, function () {
                $.getScript(locatorScript, function () {
                });
              });
            }
          }

          // if the tab is not active
          if (!$(this).hasClass('active')) {

            var target = $(this).attr('data-id');

            $(this).parents('.bar-tabs').addClass('item-active');
            $(this).addClass('active').parents('li').addClass('active').siblings().removeClass('active').find('a').removeClass('active');
            $(target).addClass('show').siblings().removeClass('show');

            // add body padding when change tabs
            // if (homePage.length && _tab.hasClass('sticky-bar')) {
            //   _tab_height = _tab.find('.tab-content').outerHeight(true) + _tab.find('.tabs-wrapper').outerHeight(true);
            //   $('body').css('padding-bottom', _tab_height);
            // }

            if (matchMedia('(max-width: 991.98px)').matches) {
              if (!$(this).parents('.bar-tabs').find('.tab-content').hasClass('is-open')) {
                $(this).parents('.bar-tabs').find('.tab-content').addClass('is-open');
              }
              $(target).addClass('active').siblings().removeClass('active');
              $('body').addClass('overflow-y');
              $('body').addClass('simulator-open');
            }

          } else {
            if (matchMedia('(max-width: 991.98px)').matches) {
              var target = $(this).attr('data-id');
              $('body').removeClass('simulator-open');
              $('body').removeClass('overflow-y');
              $(this).removeClass('active');
              $(this).parents('.bar-tabs').removeClass('item-active').find('.tab-content').removeClass('is-open');
            } else {
              if (!homePage.length) {
                $(this).parents('.bar-tabs').removeClass('item-active').find('*').removeClass('active show');
              }
            }
          }
        });

        // on click out of tabs wrapper close tab
        // $(document).on('click', function(e) {

        //   if (!homePage.length && matchMedia('(min-width: 992px)').matches) {
        //     var _target = e.target,
        //         _targetContainer = document.querySelector('.main-actions-tabs'),
        //         _targetIframe = document.querySelector('#vactory_locator_map iframe');
        //     if ($.contains(_targetContainer, _target) || _targetIframe.contents().find(_target)) {
        //       console.log('test click agence');

        //       console.log($(e.target).parent());
        //       // _tab.removeClass('item-active').find('*').removeClass('active show');
        //     }
        //   }
        // });

        // click in close button mobile
        $('.vh-header--simulator-closer > a').on('click', function(event) {
          event.preventDefault();
          _tab.find('.tabs-items a.active').trigger('click');
        });

        //activate first item if page front
        if (homePage.length && matchMedia('(min-width: 992px)').matches) {
          _tab.find('.tabs-items .item:first-child a').trigger('click');
        };



      });

    }
  };
})(jQuery, Drupal);
;//== Tooltip
//
//## Apply custom tooltip for links.
(function ($, Drupal) {
    "use strict";

    // Bootstrap tooltip.
    Drupal.behaviors.bootstrap_tooltip = {
        attach: function (context, setting) {
            if ($.fn.tooltip) {
                $("[data-toggle='tooltip']").tooltip();
            }
        }
    };

})(jQuery, Drupal);
;/**
 * Provides an HTML markup for a button.
 *
 * @param {object} button
 *   Configuration object for function.
 * @param {string} button.icon
 *   Button icon using Vactory Font (example: icon-chevron-right, icon-chevron-left).
 * @param {object} button.text
 *   Button body text.
 * @param {object} button.cssClass
 *   Button css class name.
 *
 * Usage: Drupal.theme('vButtonMarkup', {'css': 'slick-next','icon': 'icon-chevron-right'})
 *
 * @return {string}
 *   A string of HTML with a button and an icon enclosed by a i.
 */

(function ($, Drupal) {
    "use strict";

    Drupal.theme.vButtonMarkup = function (button) {

        var buttonIcon = button.icon;
        var buttonText = button.text;

        // Assemble the markup--string manipulation is fast, but if this needs
        // to become more complex, we can switch to creating dom elements.
        var buttonMarkup = '<button type="button" class="' + button.css + '" aria-label="Button">';

        if (buttonIcon) {
            buttonMarkup += '<i class="' + buttonIcon + '"></i>';
        }

        if (buttonText) {
            buttonMarkup += buttonText;
        }

        buttonMarkup += '</button>';

        return buttonMarkup;
    };

})(jQuery, Drupal);
;//== Init
//
//## Load custom utilities.
(function ($, Drupal) {
    "use strict";
    $(function (e) {
      Drupal.vactory.utility.formValidation();
      // Drupal.vactory.utility.animateNumbers();
      Drupal.vactory.utility.gotoStickyButton();
      Drupal.vactory.utility.detectInterstitiel();
      Drupal.vactory.utility.disableLink();
      Drupal.vactory.utility.filesUpload();
      Drupal.vactory.utility.bootstrap_tabs();
      Drupal.vactory.utility.selectpicker();
      Drupal.vactory.utility.labelAnimation();
      Drupal.vactory.utility.chat();
      Drupal.vactory.utility.goBackButton();
      Drupal.vactory.utility.messagesOnModal();
    });
})(jQuery, Drupal);
