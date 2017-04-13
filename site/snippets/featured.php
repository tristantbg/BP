<?php

$featured = $pages->find("index")->children()->visible();
$index = $pages->find("index");
$featured = $pages->find("featured");
$mediafile = 0

?>

<?php foreach($featured->featuredprojects()->toStructure() as $featuredproject): ?>
	<?php $project = $index->find($featuredproject->page()) ?>
	<?php if($project->isVisible()): ?>
		<?php $mediaindex = 1 ?>

		<section class="slide content projects snap">
			<div class="wrap">

				<article class="page project openInfo start" id="<?php echo $project->title()->html() ?>">
					<div class="tab project_infos">
						<div class="opener">
							<button class="arrow" type="button">
								<svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg>
							</button>
						</div>
						<div class="header">
							<h3 class="date"><?php echo $project->date('Y') ?></h3>
							<h1 data-target="project/<?php echo $project->uid() ?>" href="<?php echo $project->url() . '/ajax' ?>"><?php echo $project->title()->html() ?></h1>
							<h1 data-target="project/<?php echo $project->uid() ?>" href="<?php echo $project->url() . '/ajax' ?>"><strong><?php echo $project->client()->html() ?></strong></h1>
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
					<div class="gallery">
					<div class="section-nav previous-section"></div>
					<div class="section-nav next-section"></div>

						<?php foreach($project->medias()->toStructure() as $media): ?>
							<?php if(s::get('device_class') != 'mobile'): ?>
								<?php if($media->_fieldset() == 'video'):?>

									<?php 
									if(!$media->videofile()->empty() && $media->uselink() == "0"): 
										$mediafile = $media->videofile()->toFile()->url();
									?>

									<div class="gallery_cell video_media" alt="<?php echo $project->title()->html() ?>">
										<video src="<?php echo $mediafile ?>" autoplay loop muted></video>
									</div>
									
									<?php 
									elseif(!$media->videoextlink()->empty() && $media->uselink() == "1"):
										$mediafile = $media->videoextlink()->html(); 
									?>

									<div class="gallery_cell video_media" alt="<?php echo $project->title()->html() ?>">
										<video src="<?php echo $mediafile ?>" autoplay loop muted></video>
									</div>
									

									<?php endif ?>


								<?php endif ?>
							<?php endif ?>
							<?php if($media->_fieldset() == 'image'):?>
								<?php if($media->imagefile()->toFile() !== null):?>
									<?php 
									$image = $media->imagefile()->toFile();
									$srcset = '';
									for ($i = 600; $i <= 2100; $i += 300) {
										if($i<2100): $srcset .= resizeOnDemand($image, $i) . ' ' . $i . 'w,';
										else: $srcset .= $image->url() . ' ' . $i . 'w,';
										endif;
									}
										?>
									<img 
									class="gallery_cell lazyload"
									src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" 
									data-flickity-lazyload="<?php echo resizeOnDemand($image, 1000) ?>" 
									data-srcset-flickity="<?php echo $srcset ?>" 
									sizes="100vw"
									alt="<?php echo $project->title()->html() ?>">
									<noscript>
										<img class="gallery_cell" src="<?php echo $image->url() ?>" alt="<?php echo $project->title()->html() ?>"/>
									</noscript>
								<?php endif ?>
							<?php endif ?>
							<?php $mediaindex++ ?>
						<?php endforeach ?>
						
						<?php if(s::get('device_class') == 'mobile'): ?>
							<div class="gallery_cell">
								<div class="project_infos">
									<div class="header">
										<h3 class="date"><?php echo $project->date('Y') ?></h3>
										<h1 data-target="project/<?php echo $project->uid() ?>" href="<?php echo $project->url() . '/ajax' ?>"><?php echo $project->title()->html() ?></h1>
										<h1 data-target="project/<?php echo $project->uid() ?>" href="<?php echo $project->url() . '/ajax' ?>"><strong><?php echo $project->client()->html() ?></strong></h1>
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
							</div>
						<?php endif ?>

						<div class="slide_number"><div class="inner"><span class="active_slide">1</span>—<span><?php echo $mediaindex-1 ?></span></div></div>

					</div>
				</div>
			</article>

		</section>
	<?php endif ?>
<?php endforeach ?>