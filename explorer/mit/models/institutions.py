#!/usr/bin/python
# -*- coding: utf-8 -*-
from django.db import models
from .mixins import Named

class Department(Named):
    course_number = models.CharField(max_length=12)
    class Meta:
        app_label = "mit"
    def __unicode__(self):
        return self.course_number + u" — " + self.name

