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
						<span class="ajax_display">
						<div class="inner"></div>
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