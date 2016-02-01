<?php snippet('header') ?>

<?php snippet('landing') ?>

<?php snippet('featured') ?>

<?php

$index = $pages->find("index");
$postUrisByYear = pagesByDate($index->children()->visible(), array('group'=>'year'));
$mediafile = 0

?>

<section class="slide content index text-mode">
	<div class="wrap">

		<div class="container">
			<ul class="mode_selector">
				<li class="image_mode">
				</li>
				<li class="text_mode active">
				</li>
			</ul>

			<?php if (!$postUrisByYear): ?>
				<article>
					<p>Sorry, nothing to show.</p>
				</article>
			<?php else: ?>

				<?php foreach($postUrisByYear as $year => $uris): ?>
					<article>
						<?php if (page()->date('Y') == $year): ?>
							<?php foreach($uris as $uri): ?>
								<?php if (page()->uri() == $uri): ?>
									<span class="ajax_display displayed">
										<div class="inner">
											<?php $project = page($uri); ?>
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

											<script>
												jQuery(document).ready(function($) {

													var target = $(".ajax.displayed");
													var owl = $('.owl-carousel').owlCarousel({
														items: 1,
														merge: true,
														loop: true,
														margin: 0,
														lazyLoad: true,
														video: true,
														mouseDrag: false,
														smartSpeed: 500,
														center: true
													});
													if (!isMobile) {
														$('.owl-carousel .cell, .owl-carousel .cell .boxclose, .owl-video-wrapper').click(function(e) {
															if (e.target == this) {
																owl.trigger('next.owl.carousel');
															}
														});
													}
													var elToHn = $('.ajax_display .hyphenate');
													for (var i = 0; i < elToHn.length; i += 1) {
														elToHn[i] = Hyphenator.hyphenate(elToHn[i], "en");
													}
													setTimeout(function() {
														var offsetElement = target.position().top + $('section.index').aPosition().top - 25;
														$site_content.animate({
															scrollTop: offsetElement
														}, 500);
													}, 400);
												});

											</script>
										<?php endif ?>
									<?php endforeach ?>

								<?php else: ?>
									<span class="ajax_display">
										<div class="inner">
										<?php endif ?>
									</div>
									<div class="boxclose" id="boxclose"></div>
								</span>
								<span class="year"><span><?php echo $year ?></span></span>
								<span class="projects">
									<?php foreach($uris as $uri): ?>
										<?php $post = $pages->find($uri); ?>
										<span class="project ajax" data-target="project/<?php echo $post->uid() ?>" href="<?php echo $post->url() . '/ajax' ?>">
											<?php 
											if(!$post->indexthumb()->empty()):
												$thumbimage = $post->image($post->indexthumb())->url();
											$thumbimage = thumb($post->image(), array('width' => 600))->url();
											else:
												$thumbimage = thumb($post->image(), array('width' => 600))->url();
											endif
											?>
											<div class="index_thumb" style="background-image: url('<?php echo $thumbimage ?>')" alt="<?php echo $post->title()->html() ?>" /></div>
											<div class="index_title">
												<?php echo $post->title() ?>
												<br>
												<strong><?php echo $post->client() ?></strong>
												<br>
												<?php echo strftime('%B', $post->date()) ?>
											</div>
										</span>
									<?php endforeach; ?>
								</span>
							</article>
						<?php endforeach; ?>

					<?php endif; ?>

				</article>
			</div>
		</div>
	</section>

	<?php snippet('studio') ?>

	<?php snippet('footer') ?>