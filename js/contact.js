$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var formation = $("input[name=formation]").val();
            var name = $("input[name=name]").val();
            var email = $("input[name=email]").val();
            var telephone = $("input[name=telephone]").val();
            var souhait = $("input[name=souhait]:checked").val();
            var content = $("textarea[name=content]").val();
            var firstName = name; // For Success/Failure Message

            // Construction du message
            var message = "Bonjour,<br /><br />" + name + " (" + email + ") vous a contacté via le formulaire de formation.agiletribu.com afin ";

            if (souhait == "informations" ) {
                message += "d'obtenir des informations sur ";
            } else message += "de réserver une place pour";

            message += " la formation " + formation + ".<br />";

            if (content) {
                message += "<br />" + firstName + " a ajouté le commentaire suivant :<br />" + content + "<br />";
            };
            if (telephone) {
                message += "<br />" + firstName + " a indiqué son numéro de téléphone : " + telephone + "<br />";
            };
            
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "http://nodemailsender.herokuapp.com/mail",
                type: "POST",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    from: email,
                    to: "contact@agiletribu.com",
                    subject: "Contact avec AgileTribu de "+name+" concernant la formation "+formation,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Votre message a été envoyé. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contact-form').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Désolé " + firstName + ", il semblerait que notre serveur de mail ne répond plus. Merci de réessayer plus tard!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contact-form').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
