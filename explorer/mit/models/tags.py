from django.db import models
from polymorphic import PolymorphicModel

from .mixins import Named, CanBeDescribed

class Topic(PolymorphicModel, Named, CanBeDescribed):
    """A topic of interest. This is used to find works that deal with specific
    topics. Topics can have parent topics, which allows them to
    """
    parent_topics = models.ManyToManyField('Topic', blank=True, null=True,
            related_name="subtopics")
    class Meta:
        app_label = 'mit'
    @staticmethod
    def autocomplete_search_fields():
        return ("id__iexact", "name__icontains",)

class Location(PolymorphicModel, Named, CanBeDescribed):
    parent_locations = models.ManyToManyField('Location', blank=True,
            null=True, related_name="sublocations")
    official_name = models.CharField(max_length=250, null=True, blank=True)
    official_id = models.CharField(max_length=50, null=True, blank=True)
    class Meta:
        app_label = 'mit'
    @staticmethod
    def autocomplete_search_fields():
        return ("id__iexact", "name__icontains",)



