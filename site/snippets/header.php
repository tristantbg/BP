<!-- Website developed by Tristan Bagot -->

<!DOCTYPE html>
<html lang="en" class="no-js">
<head>

	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<title><?php echo $site->title()->html() ?></title>
	<meta name="description" content="<?php echo $site->description()->html() ?>">
	<meta name="keywords" content="<?php echo $site->keywords()->html() ?>">
	<meta property="og:url" content="<?php echo $site->homePage()->url() ?>"/>
	<meta property="og:image" content="<?= url('assets/images/og_image.jpg') ?>"/>
	<link rel="shortcut icon" href="<?= url('assets/images/favicon.ico') ?>">
	<link rel="icon" href="<?= url('assets/images/favicon.ico') ?>" type="image/x-icon">
	<?php 
	echo css('assets/css/app.min.css');
	?>

	<?php 
	echo js('assets/js/vendor/modernizr-build.js');
	?>

	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="<?= url('assets/js/vendor/jquery.min.js') ?>">\x3C/script>')</script>

	<?php if(!$site->customcss()->empty()): ?>
		<style type="text/css">
			<?php echo $site->customcss()->html() ?>
		</style>
	<?php endif ?>

</head>
<body>

<div class="loader">
	<div id="spin">
       </div>
</div>
	
	<div class="main logo">
		<div class="logo_bp">
			<img src="<?php echo url('assets/images/logo_bp.svg') ?>" onerror="this.src='<?php echo url('assets/images/logo_bp.png') ?>'; this.onerror=null;" alt="Bonsoir Paris" width="100%">
		</div>
		<div class="logo_dots dot_top">
			<img src="<?php echo url('assets/images/logo_dots_top.svg') ?>" onerror="this.src='<?php echo url('assets/images/logo_dots_top.png') ?>'; this.onerror=null;" alt="Bonsoir Paris" width="100%">
		</div>
		<div class="logo_dots dot_bottom">
			<img src="<?php echo url('assets/images/logo_dots_bottom.svg') ?>" onerror="this.src='<?php echo url('assets/images/logo_dots_bottom.png') ?>'; this.onerror=null;" alt="Bonsoir Paris" width="100%">
		</div>

	</div>

	<nav class="main menu is-visible">
		<ul>
			<li class="link project" data-target="page/project">Project</li>
			<li class="link index" data-target="page/archive">Archive</li>
			<li class="link studio" data-target="page/studio">Studio</li>
		</ul>
	</nav>
	<div class="site_wrap">