<?php

/*

---------------------------------------
License Setup
---------------------------------------

Please add your license key, which you've received
via email after purchasing Kirby on http://getkirby.com/buy

It is not permitted to run a public website without a
valid license key. Please read the End User License Agreement
for more information: http://getkirby.com/license

*/

c::set('license', 'K2-PERSONAL-8df69012805173a0bd725c5661bbee6e');

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/

c::set('oembed.lazyvideo', true);
c::set('autopublish.templates', array('project', 'item'));
c::set('sitemap.exclude', array('error','featured','index','studio'));
//c::set('cache', true);
//c::set('thumbs.driver', 'im');
c::set('thumb.quality', 100);
c::set('routes', array(
    array(
        'pattern' => '(:all)/ajax',
        'action'  => function($uri) {
          tpl::load(kirby()->roots()->templates() . DS . 'ajax.php', array('uri' => $uri), false );
        }
    ),
    // array(
    //     'pattern' => 'index/(:any)',
    //     'action'  => function($uri,$uid) {
    //       $page = page('index/' . $uid);

    //   		// redirect to the article or the error page
    //   		go($page ? '/#!/project/'.$uri : 'error');
    //     }
    // )
));