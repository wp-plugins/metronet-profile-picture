jQuery( document ).ready( function( $ ) {
	$('#metronet-upload-link a, #metronet-profile-image a').on( "click", function(e) {
		//Assign the default view for the media uploader
		var uploader = wp.media({
			state: 'featured-image',
			states: [ new wp.media.controller.FeaturedImage() ]
		});
		//Create featured image button
		uploader.on( 'toolbar:create:featured-image', function( toolbar ) {
				this.createSelectToolbar( toolbar, {
					text: metronet_profile_image.set_profile_text
				});
			}, uploader );
		
		//For when the featured thumbnail is set
		uploader.mt_featured_set = function( id ) {
			var settings = wp.media.view.settings;

			settings.post.featuredImageId = id;
			$.post( ajaxurl, { action: 'metronet_add_thumbnail', json: false, post_id: settings.post.id, user_id: jQuery( "#metronet_profile_id" ).val(), thumbnail_id: settings.post.featuredImageId,_wpnonce: settings.post.nonce }, function( response ) {
				jQuery( "#metronet-profile-image a" ).html( response );
			} );
		};
		
		//For when the featured image is clicked
		uploader.state('featured-image').on( 'select', function() {
			var settings = wp.media.view.settings,
				selection = this.get('selection').single();

			if ( ! settings.post.featuredImageId )
				return;
			
			uploader.mt_featured_set( selection ? selection.id : -1 );
		} );
		
		
		//Open the media uploader
		uploader.open();
		return false;
	});
} );