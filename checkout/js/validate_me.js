$.fn.goValidate = function() {
    var $form = this,
        $inputs = $form.find('input:text, input:password'),
        $selects = $form.find('select'),
        $textAreas = $form.find('textarea');
  
    var validators = {
        name: {
            regex: /^[A-Za-z ç']{3,}$/
        },
        username: {
            regex: /^[A-Za-z]{6,}$/
        },
        firstName: {
            regex: /^[A-Za-z]{3,}$/
        },
        lastName: {
            regex: /^[A-Za-z]{3,}$/
        },
        town: {
            regex: /^[A-Za-z]{3,}$/
        },
        postcode: {
            // regex: /^.{3,}$/
            regex: /^[0-9-]{8,9}$/,
        },
        password1: {
            regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
        },
        password1_repeat: {
            regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
        },
        email: {
            regex: /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/
        },
        phone: {
            regex: /^[0-9 ()-+]{8,}$/,
        },
        body: {
            regex: /^.{3,}$/
        },
        cpf: {
            regex: /^[0-9.-]{14}$/,
        },
        country: {
            regex: /^(?=\s*\S).*$/,
        }
    };
    var validate = function(klass, value) {
        var isValid = true,
            error = '';
            
        if (!value && /required/.test(klass)) {
            error = 'Este campo deve ser preenchido';
            isValid = false;
        } else {
            klass = klass.split(/\s/);
            $.each(klass, function(i, k){
                if (validators[k]) {
                    if (value && !validators[k].regex.test(value)) {
                        isValid = false;
                        error = validators[k].error;
                    }
                }
            });
        }
        return {
            isValid: isValid,
            error: error
        }
    };
    var showError = function($e) {
        var klass = $e.attr('class'),
            value = $e.val(),
            test = validate(klass, value);
      
        $e.removeClass('invalid');
        $e.addClass('valid');
        $('#form-error').addClass('hide');
        
        if (!test.isValid) {
            $e.addClass('invalid');
            $e.removeClass('valid');
            
            if(typeof $e.data("shown") == "undefined" || $e.data("shown") == false){
               $e.popover('show');
            }
            
        }
      else {
        $e.popover('hide');
      }
    };
   
    $inputs.keyup(function() {
        showError($(this));
    });
    $selects.change(function() {
        showError($(this));
    });
    $textAreas.keyup(function() {
        showError($(this));
    });
  
    $inputs.on('shown.bs.popover', function () {
  		$(this).data("shown",true);
	});
  
    $inputs.on('hidden.bs.popover', function () {
  		$(this).data("shown",false);
	});
  
    $form.submit(function(e) {
      
        $inputs.each(function() { /* test each input */
        	if ($(this).is('.required') || $(this).hasClass('invalid')) {
            	showError($(this));
        	}
    	});
    	$selects.each(function() { /* test each input */
        	if ($(this).is('.required') || $(this).hasClass('invalid')) {
            	showError($(this));
        	}
    	});
    	$textAreas.each(function() { /* test each input */
        	if ($(this).is('.required') || $(this).hasClass('invalid')) {
            	showError($(this));
        	}
    	});
        if ($form.find('input.invalid').length) { /* form is not valid */
        	e.preventDefault();
            $('#form-error').toggleClass('hide');
        }
    });
    return this;
};



$('form').goValidate();