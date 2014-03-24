from django.db import models
from .mixins import Named, CanHaveWebsite, CanBeDescribed
from .works import Work

# medium choices are based on MLA format list:
# http://libguides.csuchico.edu/content.php?pid=72716&sid=538460
MEDIUM_CHOICES = (
        ('Print', (
            ('print', 'Print'),
            ('letter', 'Letter, Memo, or E-Mail'),
            ('map', 'Map or Chart'),
            ('comic', 'Cartoon or Comic Strip'),
            ('ad', 'Advertisement'),
            ('music', 'Musical Score or Libretto'),
            ('script', 'Manuscript or Typescript'),
            )
        ),
        ('web', 'Web'),
        ('radio', 'Radio'),
        ('tv', 'Television'),
        ('micro', 'Microform'),
        ('disc', 'CD or DVD'),
        )

class Publisher(Named, CanHaveWebsite, CanBeDescribed):
    """An entity that publishes work. Can be a blog, book publisher, or
    institution.
    """
    pass
    class Meta:
        app_label = "mit"

class Publication(Work):
    """A generic published work by faculty.
    """
    date_published = models.DateField()
    publisher = models.ManyToManyField('Publisher')
    medium = models.CharField(max_length=50, choices=MEDIUM_CHOICES,
            default="print")
    class Meta:
        app_label = "mit"

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




