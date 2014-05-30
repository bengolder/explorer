from django.db import models
from .mixins import (Named, Titled, DateAware, CanBeDescribed, CanHaveWebsite)

class WorkType(Named):
    subtypes = models.ManyToManyField('WorkType', null=True, blank=True)
    class Meta:
        app_label = "mit"
    def __unicode__(self):
        return self.name


class GenericWork(Titled, CanBeDescribed, CanHaveWebsite):
    faculty = models.ManyToManyField('Faculty')
    non_dusp_collaborators = models.CharField(max_length=500, null=True,
            blank=True)
    work_types = models.ManyToManyField('WorkType')
    topics = models.ManyToManyField('Topic', null=True, blank=True)
    locations = models.ManyToManyField('Location', null=True, blank=True)
    partners = models.TextField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    subworks = models.ManyToManyField('GenericWork', null=True, blank=True)
    class Meta:
        app_label = "mit"
    def __unicode__(self):
        types = self.work_types.all().values_list('name', flat=True)
        if not types:
            types = ["work"]
        return "[%s] %s" % ( ", ".join(types), self.title[:50] )


