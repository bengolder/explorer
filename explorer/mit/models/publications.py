from django.db import models
from .mixins import Named, CanHaveWebsite, CanBeDescribed
from .works import Work, GenericWork

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

class Publication(Work):
    """A generic published work by faculty.
    """
    date_published = models.DateField()
    publisher = models.ManyToManyField('Publisher')
    medium = models.ForeignKey('PublicationFormat', null=True, blank=True)
    class Meta:
        app_label = "mit"

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

class Book(Publication):
    """A book by faculty
    """
    cities_published = models.ManyToManyField('Location', null=True, blank=True)
    edition = models.CharField(max_length=50, null=True, blank=True)
    class Meta:
        app_label = "mit"

class Article(Publication):
    """An article written by faculty. Best for Magazines and Newspaper
    Articles. See JournalArticle for academic articles.
    """
    periodical_name = models.CharField(max_length=250)
    pages = models.CharField(max_length=15, null=True, blank=True)
    class Meta:
        app_label = "mit"

class JournalArticle(Article):
    """An academic article written by faculty.
    """
    volume = models.CharField(max_length=15, null=True, blank=True)
    issue = models.CharField(max_length=15, null=True, blank=True)
    class Meta:
        app_label = "mit"




