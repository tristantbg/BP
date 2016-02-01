<?php if(!defined('KIRBY')) exit ?>

title: Project
pages: false
files: true
fields:
  title:
    label: Title
    type:  text
    width: 1/2
  date:
    label: Date
    type: date
    format: MM/YYYY
    width: 1/4
  private:
    label: Personal project
    type: checkbox
    help: Not in recent clients
    width: 1/4
  client:
    label: Client
    type:  text
    width: 1/2
  categories:
    label: Categories
    type: tags
    lower: true
    width: 1/2
  infos:
    label: Infos
    type:  textarea
   	width: 1/2
  indexthumb:
    label: Index thumbnail
    type: select
    options: images
    help: Must be 500x300px or equivalent ratio (5/3).
    width: 1/2
  description:
    label: Description
    type:  textarea
  medias:
    label: Medias
    type: builder
    fieldsets:
      image:
        label: Image
        entry: >
          <img src="{{_fileUrl}}{{imagefile}}" height=120px/></br>
          <br>{{imagefile}}
        fields:
          imagefile:
            label: Photo
            type: selector
            mode: single
            types:
              - image
      video:
        label: Video
        entry: >
          File : {{videofile}}
          <br>Link : {{videolink}}
          <br>External Link : {{videoextlink}}
          <br>Use link : {{uselink}}
        fields:
          videofile:
            label: Video file
            help: Will be displayed on landing featured projects.
            type: selector
            mode: single
            types:
              - video
          videolink:
            label: Link URL
            help: Youtube or Vimeo URL
            type: text
          videoextlink:
            label: External link URL
            type: text
            help: Refers to a video URL
            width: 1/2
          uselink:
            label: Use link as video
            type: checkbox
            text: Play video from external URL?
            width: 1/2