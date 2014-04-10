from django.db import models
from polymorphic import PolymorphicModel

from .mixins import (Titled, DateAware, CanBeDescribed, CanHaveWebsite)

class Work(PolymorphicModel, Titled, CanBeDescribed, CanHaveWebsite):
    """The most generic category of an item of work done by faculty
    """
    authors = models.ManyToManyField('Faculty')
    topics = models.ManyToManyField('Topic', null=True, blank=True)
    locations = models.ManyToManyField('Location', null=True, blank=True)
    partners = models.TextField(null=True, blank=True)
    class Meta:
        app_label = "mit"

class Project(Work):
    """A generic project done by faculty
    """
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    class Meta:
        app_label = "mit"

class ResearchInitiative(Project):
    """A research lab or collaborative research initiative run by DUSP faculty
    """
    subprojects = models.ManyToManyField('Work', related_name='research_labs',
            null=True, blank=True)
    class Meta:
        app_label = "mit"

