<?php if(!defined('KIRBY')) exit ?>

title: Studio
pages: false
deletable: false
files: true
fields:
  title:
    label: Title
    type:  text
  titleInfos:
    label: General infos
    type: headline
  infos:
    label: Studio infos
    type:  textarea
  contact:
    label: Contact
    type:  textarea
   	width: 1/2
  recentclients:
    label: Recent clients
    type:  number
    min: 3
   	width: 1/2
  titleSlideshow:
    label: Slideshow
    type: headline
  slideshow:
    label: Slideshow
    type: selector
    mode: multiple
    types:
      - image
  titleJobs:
    label: Job inquiries
    type: headline
  jobs:
    label: Job inquiries
    type: builder
    fieldsets:
      job:
        label: Job
        entry: >
          <strong>{{jobtitle}}</strong>
          <br>From {{from}} to {{to}}
        fields:
          from:
            label: From
            type: date
            width: 1/2
          to:
            label: To
            type: date
            width: 1/2
          titleInfos:
            label: Infos
            type: headline
          jobtitle:
            label: Job title
            type: text
          salary:
            label: Salary
            type: text
          contract:
            label: Contract
            type: text
          reporting:
            label: Reporting to
            type: text
          additional:
            label: Additional infos
            type: textarea
          desc:
            label: Description
            type: textarea
          skills:
            label: Skills
            type: textarea