from django.db import models
from django.contrib.auth.models import User
from polymorphic import PolymorphicModel
from .mixins import DateAware


class Person(PolymorphicModel, DateAware):
    full_name = models.CharField(max_length=250)
    bio = models.TextField(blank=True, null=True)
    home_page = models.URLField(blank=True, null=True)
    picture = models.ImageField(upload_to="images/people", blank=True,
            null=True)
    email = models.EmailField(blank=True, null=True)
    user_account = models.ForeignKey(User, blank=True, null=True)
    class Meta:
        app_label = "mit"
    def __unicode__(self):
        return self.full_name

class Faculty(Person):
    is_active = models.BooleanField(default=True)
    current_interests = models.ManyToManyField('Topic', null=True, blank=True)
    places_lived = models.ManyToManyField('Location', null=True, blank=True)
    official_title = models.CharField(max_length=150, null=True, blank=True)
    class Meta:
        app_label = "mit"
    def __unicode__(self):
        return self.full_name + ", " + self.official_title



