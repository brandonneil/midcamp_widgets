CKEDITOR.plugins.add('callout', {

  // CKEditor plugin dependencies.
  requires: 'widget',

  // Icon file name. callout.png.
  icons: 'callout',

  // Plugin initialization method.
  init: function( editor ) {

    // Register our callout widget.
    editor.widgets.add( 'callout', {
        // Button text on hover state.
        button: 'Create a simple callout',

        // The widget template.
        template:
            '<div class="callout">' +
                '<div class="callout-content"><p>Callout!</p></div>' +
            '</div>',

        // Widget editable areas.
        editables: {
            content: {
                selector: '.callout-content',
                allowedContent: 'p br ul ol li strong em'
            }
        },

        // ACF allowed content.
        allowedContent: 'div(!callout,align-left,align-right,align-center){width});'+
            'div(!callout-content);',

        // Required content for the widget to function. If editor does not
        // support this, the button does not function.
        requiredContent: 'div(callout)',

        // Function to determin if an element is a widget.
        upcast: function( element ) {
            return element.name == 'div' && element.hasClass( 'callout' );
        },

        dialog: 'callout',

        init: function() {
            var width = this.element.getStyle( 'width' );
            if ( width )
                this.setData( 'width', width );
            if ( this.element.hasClass( 'align-left' ) )
                this.setData( 'align', 'left' );
            if ( this.element.hasClass( 'align-right' ) )
                this.setData( 'align', 'right' );
            if ( this.element.hasClass( 'align-center' ) )
                this.setData( 'align', 'center' );
        },

        data: function() {
            if ( this.data.width == '' )
                this.element.removeStyle( 'width' );
            else
                this.element.setStyle( 'width', this.data.width );

            this.element.removeClass( 'align-left' );
            this.element.removeClass( 'align-right' );
            this.element.removeClass( 'align-center' );
            if ( this.data.align )
                this.element.addClass( 'align-' + this.data.align );
        }
    });
    CKEDITOR.dialog.add( 'callout', this.path + 'dialogs/callout.js' );
  }
});
