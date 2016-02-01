<?php

$studio = $pages->find("studio");
$slideshow = $studio->slideshow()->split(',');
if(count($slideshow) < 2) $slideshow = array_pad($slideshow, 2, '');
$files = call_user_func_array(array($studio->files(), 'find'), $slideshow);
$job_index = 1;
$job_menu = array();

function toUrl($title) {
	$stringURL = str_replace(' ', '-', $title);
	$stringURL = str_replace(' ', '-', $title);
	$stringURL = strtolower($stringURL);
	return $stringURL;
}

?>

<section id="studio" class="slide studio" style="background-image: url('<?php echo $studio->image()->url() ?>')">
	<div class="wrap">
		<div class="job_container" data-scroll-scope>
			<?php foreach($studio->jobs()->toStructure() as $job): ?>
				<?php if($job->_fieldset() == 'job'):?>
					<?php array_push($job_menu, $job->jobtitle()) ?>

					<div class="job" id="job-<?php echo toUrl($job->jobtitle()) ?>">

						<div class="header">
							<h3 class="date"><?php echo $job->date('d.m.Y', 'from') . ' — ' . $job->date('d.m.Y', 'to') ?></h3>
							<h1>Job Inquiries</h1>
							<h1><strong><?php echo $job->jobtitle()->html() ?></strong></h1>

						</div>

						<div class="infos">
							<div class="left">
								<p><strong>Salary</strong> : <?php echo $job->salary()->html() ?></p>
								<p><strong>Contract</strong> : <?php echo $job->contract()->html() ?></p>
								<p><strong>Reporting to</strong> : <?php echo $job->reporting()->html() ?></p>

							</div>
							<div class="right">
								<?php echo $job->additional()->kt() ?>
							</div>
						</div>

						<div class="job_content">
							<div class="description hyphenate">
								<?php echo $job->desc()->kt() ?>
							</div>
							<div class="skills">
								<h2><strong>Skills</strong></h2>
								<?php echo $job->skills()->kt() ?>
							</div>
						</div>

					</div>

				<?php endif ?>
				<?php $job_index++ ?>
			<?php endforeach ?>
			<div class="boxclose" id="boxclose"></div>
		</div>

		<div class="inner">
			<div class="container">
				<div class="top">
					<div class="left">
						<div class="box contact">
							<h2>Contact</h2>
							<?php echo $studio->contact()->kt() ?>
						</div>
					</div>
					<div class="right">
						<div class="box studio_description hyphenate">
							<h1>Studio</h1>
							<?php echo $studio->infos()->kt() ?>
						</div>
					</div>
				</div>
				
				<div class="bottom">
					<div class="left">
						<div class="box jobs">
							<h2>Job inquiries</h2>
							<ul>
								<?php foreach($job_menu as $job): ?>
									<li data-target="job/<?php echo toUrl($job) ?>"> 
										<h1><a class="invert"><?php echo $job ?></a></h1>
									</li>
								<?php endforeach ?>
							</ul>
						</div>

						<ul class="box social">
							<?php foreach($site->socials()->yaml() as $social): ?>
								<li>
									<a href="<?php echo $social['link'] ?>" target="_blank"><div class="social-btn"><?php echo $social['name'] ?></div></a>
								</li>
							<?php endforeach ?>
						</ul>
					</div>
					<div class="right">
						<div class="box recent_clients">
							<h2>Recent clients include</h2>
							<?php 
							$postUris = pagesByDate($pages->find("index")->children()->visible());
							$client_index = 1;
							$client_max = $studio->recentclients()->int();
							$clients = [];

							foreach($postUris as $uri):
								$post = $pages->find($uri); 
							if ($client_index <= $client_max && $post->private() != "1" ):
								array_push($clients, $post->client());
							endif;
							$client_index++;
							endforeach;


							$clients = array_unique($clients);

							foreach ($clients as $client):

								?>

							<span><?php echo $client ?></span>

						<?php endforeach ?>
					</div>
				</div>
			</div>
			<?php if(!$studio->slideshow()->empty()):?>
				<div class="gallery">
					<?php foreach($files as $file): ?>
						<div class="gallery_cell" style="background-image: url('<?php echo $file->url() ?>')">
						</div>
					<?php endforeach ?>
				</div>
			<?php endif ?>
		</div>
	</section>