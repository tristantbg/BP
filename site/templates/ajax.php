<?php
if(kirby()->request()->ajax()) {

	$project = page($uri);


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
					<div class="cell owl-lazy" data-src="<?php echo $media->imagefile()->toFile()->url() ?>" <?php echo imgsrc($media->imagefile()->toFile(), array('bgimage' => true, 'width' => 600)); ?> alt="<?php echo $project->title()->html() ?>">

					</div>
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

	<?php
}
else {
	header::status('404');
}