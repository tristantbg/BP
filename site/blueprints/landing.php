<?php if(!defined('KIRBY')) exit ?>

title: Landing
pages: false
deletable: false
files: true
fields:
  title:
    label: Title
    type:  text
  titleImage:
    label: Featured Image
    type: headline
  landingimage:
    label: Featured image
    type: selector
    mode:  single
    types:
        - image
    width: 1/2
  landingimageblur:
    label: Featured image blurred
    help: Automatic blur if none selected.
    type: selector
    mode:  single
    types:
        - image
    width: 1/2
  titleVideo:
    label: Featured Video
    type: headline
  landingvideo:
    label: Video File
    type: select
    options: videos
    width: 1/3
  landingvideolink:
    label: Video Link
    type: text
    icon: code
    help: Refers to a video URL
    width: 1/3
  uselink:
    label: Use link as video
    type: checkbox
    text: Play video from URL?
    width: 1/3
  titleTitle:
    label: Featured Image/Video Title
    type: headline
  featuredtitle:
    label: Featured Title
    type:  textarea
    width: 1/2
  arrowcolor:
    label: Arrow color
    type: color
    width: 1/2
  titleText:
    label: Customize text
    type: headline
  txtcolor:
    label: Text Color
    type:  color
    default: 000000
    width: 1/2
  txtsize:
    label: Text Size
    type:  number
    default: 2.4
    step: 0.01
    help: Font in percentage (vw units)
    width: 1/2
