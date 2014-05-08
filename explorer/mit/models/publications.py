from django.db import models
from .mixins import Named, CanHaveWebsite, CanBeDescribed
from .works import GenericWork

# medium choices are based on MLA format list:
# http://libguides.csuchico.edu/content.php?pid=72716&sid=538460

class PublicationFormat(Named, CanBeDescribed):
    parent_format = models.ForeignKey('PublicationFormat', null=True,
            blank=True)
    class Meta:
        app_label = "mit"
    def __unicode__(self):
        return self.name

class Publisher(Named, CanHaveWebsite, CanBeDescribed):
    """An entity that publishes work. Can be a blog, book publisher, or
    institution.
    """
    class Meta:
        app_label = "mit"
    def __unicode__(self):
        return self.name

class Periodical(Named, CanHaveWebsite, CanBeDescribed):
    """A regularly published academic journal, magazine, or newspaper
    """
    class Meta:
        app_label = "mit"
    def __unicode__(self):
        return self.name

class PublicationInfo(models.Model):
    """A generic published work by faculty.
    """
    work_item = models.OneToOneField('GenericWork')
    date_published = models.DateField()
    publishers = models.ManyToManyField('Publisher', null=True, blank=True)
    periodicals = models.ManyToManyField('Periodical', null=True, blank=True)
    medium = models.ForeignKey('PublicationFormat', null=True, blank=True)
    class Meta:
        app_label = "mit"
    def __unicode__(self):
        return "Publication Information"




