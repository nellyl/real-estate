//importing modules
var express = require( 'express' );
var request = require( 'request' );
var cheerio = require( 'cheerio' );

//url = document.getElementById( 'url' ).value;

// alert( 'toto' );
//creating a new express server
var app = express();

//setting EJS as the templating engine
app.set( 'view engine', 'ejs' );

//setting the 'assets' directory as our static assets dir (css, js, img, etc...)
app.use( '/assets', express.static( 'assets' ) );


//makes the server respond to the '/' route and serving the 'home.ejs' template in the 'views' directory
app.get( '/', function ( req, res ) {


    //makes http calls
    request( 'https://www.leboncoin.fr/ventes_immobilieres/999621886.htm?ca=12_s', function ( error, response, html ) {
        if ( !error && response.statusCode == 200 ) {
            var $ = cheerio.load( html );
            var prix = parseInt( $( 'h2.item_price span.value' ).get()[0].children[0].data.replace( /\s/g, '' ), 10 );
            //parseInt : enlève tout, affiche seulement le nombre, data.replace(1,'') : remplace les 1 par rien
            var ville = $( 'div.line.line_city span.value' ).get()[0].children[0].data.replace( /\s/g, '' );
            var type = $( 'h2.clearfix span.value' ).get()[2].children[0].data.replace( /\s/g, '' );
            var pièces = $( 'h2.clearfix span.value' ).get()[3].children[0].data.replace( /\s/g, '' );
            var surface = parseInt( $( 'h2.clearfix span.value' ).get()[4].children[0].data.replace( /\s/g, '' ), 10 );
            var ges = $( 'h2.clearfix span.value' ).get()[5].children[0].data.replace( /\s/g, '' );
            var classe = $( 'h2.clearfix span.value' ).get()[6].children[0].data.replace( /\s/g, '' );
            console.log( prix );
            console.log( ville );
            console.log( type );
            console.log( pièces );
            console.log( surface );
            console.log( ges );
            console.log( classe );

            var prixM2 = prix / surface
            console.log( prixM2 )
        }

    });

    request( 'https://www.meilleursagents.com/prix-immobilier/courbevoie-92400/', function ( error, response, html ) {
        if ( !error && response.statusCode == 200 ) {
            var $ = cheerio.load( html );
            var price = $( $( '.prices-summary_values .row' )[2] ).find( '.columns' )[2];
            console.log( price );
        }
    });

    request( '/', function ( prixM2, price ) {
        if ( price >= prixM2 ) {
            console.log( 'Good Deal ! :)' )
        }
        else {
            console.log( 'Not a Good Deal ! :(' )
        }
    });

    res.render( 'home', {
        message: 'GOOD DEAL OR NOT ? '

    });
});


//launch the server on the 3000 port
app.listen( 3000, function () {
    console.log( 'App listening on port 3000!' );
});
