
(function($) {
    $.fn.ucfirst = function() {
        return this.each(function() {
            var $this = $(this);
            var text = $this.text();
            if (text.length > 0) {
                $this.text(text.charAt(0).toUpperCase() + text.slice(1));
            }
        });
    };
})(jQuery);
