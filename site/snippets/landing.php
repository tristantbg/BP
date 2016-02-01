<?php

$landing = $pages->find("landing");
$landingImage = $landing->image($landing->landingimage())->url();

if(!$landing->landingimageblur()->empty()):
	$landingImageBlur = $landing->image($landing->landingimageblur())->url();
endif;

if(!$landing->landingvideo()->empty() && $landing->uselink() == "0"):
	$landingVideo = $landing->file($landing->landingvideo())->url();
endif;

if(!$landing->landingvideolink()->empty() && $landing->uselink() == "1"):
	$landingVideo = $landing->landingvideolink()->html();
endif
?>

<section class="slide content landing">

	<article id="landingVisual" class="page">
		<div class="landingImage" style="background-image: url('<?php echo $landingImage ?>');"></div>

		<?php  if(isset($landingVideo)): ?>
			<div class="landingVideo">
				<video autoplay loop muted>
					<source src="<?php  echo $landingVideo ?>" type="video/mp4">
					</video>
				</div>
			<?php endif ?>

			<div class="logo">
				<div class="logo_full">
					<img src="<?= url('assets/images/logo_full.svg') ?>" onerror="this.src='img/logo_full.png'; this.onerror=null;" alt="Bonsoir Paris">
				</div>
			</div>

			<button class="arrow" type="button">
				<svg version="1.1" x="0px" y="0px"
				viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
				<polygon fill="<?php echo $landing->arrowcolor() ?>" points="50,74.6 0.9,31.7 4.9,27.2 50,66.6 95.1,27.2 99.1,31.7 "/>
				</svg>
			</button>

			<span class="landing_title">
				<?php echo $landing->featuredtitle()->kt() ?>
			</span>

	</article>
</section>

<section class="slide content landing">
	<article id="landingInfos" class="page" style="background-image: url('<?php echo $landingImage ?>');">

		<?php if(!$landing->landingimageblur()->empty()) { ?>
		<div class="landingImage" style="background-image: url('<?php echo $landingImageBlur ?>');"></div>
		<?php } else { ?>
		<div class="landingImage blur" style="background-image: url('<?php echo $landingImage ?>');"></div>
		<?php } ?>

		<?php  if(isset($landingVideo)): ?>
			<div class="landingVideo">
				<video autoplay loop muted>
					<source src="<?php  echo $landingVideo ?>" type="video/mp4">
					</video>
				</div>
			<?php endif ?>

			<div class="row">
				<div id="landingText" class="hyphenate" style="font-size: <?php echo $landing->txtsize() ?>vw;color: <?php echo $landing->txtcolor() ?>"><?php echo $site->description()->kt() ?>
				</div>
			</div>

		</article>

	</section>