<?php if(!defined('KIRBY')) exit ?>

title: Featured
pages: false
files: false
deletable: false
fields:
  title:
    label: Title
    type:  text
  featuredprojects:
    label: Featured projects
    type: builder
    fieldsets:
      project:
        label: Project
        fields:
          page:
            label: Page
            type: select
            options: query
            query:
              page: index
              fetch: children
              flip: true