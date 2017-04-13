<?php snippet('header') ?>

<?php 

function _bot_detected() {

  if (isset($_SERVER['HTTP_USER_AGENT']) && preg_match('/bot|crawl|slurp|spider/i', $_SERVER['HTTP_USER_AGENT'])) {
    return TRUE;
  }
  else {
    return FALSE;
  }

}

$bot = _bot_detected();

?>

<?php if(!$bot): ?>
<script>
	window.location = window.location.href.replace("index", "#!/project");
</script>
<?php endif ?>

<?php

$project = page();

?>

<div class="owl-carousel owl-theme">
		<?php foreach($project->medias()->toStructure() as $media): ?>
			<?php if($media->_fieldset() == 'video'):?>

				<?php if(!$media->videolink()->empty()): ?>
				<?php $mediafile = $media->videolink(); ?>
					<div class="cell video_media" alt="<?php echo $project->title()->html() ?>">
						<a class="owl-video" href="<?php echo $mediafile ?>"></a>
						<div class="boxclose"></div>
					</div>
				<?php endif ?>
			<?php endif ?>
			<?php if($media->_fieldset() == 'image'):?>
				<?php if($media->imagefile()->toFile() !== null):?>
					<div class="cell owl-lazy" data-src="<?php echo thumb($media->imagefile()->toFile(), array('height' => 1000))->url() ?>" <?php echo imgsrc($media->imagefile()->toFile(), array('bgimage' => true, 'width' => 600)); ?> alt="<?php echo $project->title()->html() ?>">

					</div>
					<img src="<?php echo thumb($media->imagefile()->toFile(), array('height' => 1000))->url() ?>" <?php echo imgsrc($media->imagefile()->toFile(), array('bgimage' => true, 'width' => 600)); ?> alt="<?php echo $project->title()->html() ?>" />
				<?php endif ?>
			<?php endif ?>
			<?php //$mediaindex++ ?>
		<?php endforeach ?>

	</div>
	<div class="project_infos">
		<div class="header">
			<h1 data-target="<?php echo $project->uid() ?>" href="<?php echo $project->url() . '/ajax' ?>"><?php echo $project->title()->html() ?></h1>
			<h1><strong><?php echo $project->client()->html() ?></strong></h1>
		</div>
		<div class="infos">
			<div class="summary">
				<?php echo $project->infos()->kirbytext() ?>
			</div>

			<div class="desc hyphenate">
				<hr>
				<?php echo $project->description()->kirbytext() ?>
				<hr>
			</div>

			<ul class="tags">
				<?php $tags = $project->categories()->split(','); ?>
				<?php foreach($tags as $tag): ?>
					<li data-filter="<?php echo html($tag) ?>"><?php echo html($tag) ?></li>
				<?php endforeach ?>
			</ul>

		</div>
	</div>

<?php snippet('footer') ?>