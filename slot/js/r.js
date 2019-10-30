var results = ['KGI','KSS','KDH','RSJ','HSE'];
var fixIndex = 0;
var randRoll = 0;


    // Listen for "hold"-button clicks
    $(document).on("click", ".wheel button", function() {
        var button = $(this);
        button.toggleClass("active");
        button.parent().toggleClass("hold");
        button.blur(); // get rid of the focus
    });

    $(document).on("click", "#spin", function() {
        // get a plain array of symbol elements
        var symbols = $(".wheel").not(".hold").get();
        $('body').removeClass('end');
        randRoll = Math.floor(Math.random() * 70 + 50);

        if (symbols.length === 0) {
            alert("All wheels are held; there's nothing to spin");
            return; // stop here
        }

        var button = $(this);

        // get rid of the focus, and disable the button
        button.prop("disabled", true).blur();

        // counter for the number of spins
        var spins = 0;

        // inner function to do the spinning
        function update() {
            for (var i = 0, l = symbols.length; i < l; i++) {
                $('.wheel').html();
                //Switched append to prepend
                // $('.wheel').prepend('<div style="display: none;" class="new-link" name="link[]"><input type="text" value="' + getRandomIndex() + '" /></div>');
                $('.wheel').prepend('<div style="display: none;" class="new-link" name="link[]"><input type="text" value="' + results[fixIndex] + '" /></div>');
                fixIndex++;
                if(fixIndex >= results.length) fixIndex = 0;
                //Using "first-of-type" rather than "last"
                $('.wheel').find(".new-link:first-of-type").slideDown("fast");

            }

            if (++spins < randRoll) {
                // set a new, slightly longer interval for the next update. Makes it seem like the wheels are slowing down
                setTimeout(update, 10 + spins * 2);
            } else {
                // re-enable the button
                button.prop("disabled", false);

                setTimeout(function(){
                    $("body").addClass("end");
                }, 500);
            }
        }

        // Start spinning
        setTimeout(update, 1);
    });
