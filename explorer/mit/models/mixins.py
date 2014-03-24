from django.db import models

class DateAware(models.Model):
    date_added = models.DateTimeField(auto_now_add=True)
    date_edited = models.DateTimeField(auto_now=True)
    class Meta:
        app_label = "mit"
        abstract = True

class CanBeDescribed(models.Model):
    description = models.TextField(null=True, blank=True)
    class Meta:
        app_label = "mit"
        abstract = True

class CanHaveWebsite(models.Model):
    website = models.URLField(null=True, blank=True)
    class Meta:
        app_label = "mit"
        abstract = True

class Titled(models.Model):
    title = models.CharField(max_length=250)
    class Meta:
        app_label = "mit"
        abstract = True
    def __unicode__(self):
        return self.title

class Named(models.Model):
    name = models.CharField(max_length=250)
    class Meta:
        app_label = "mit"
        abstract = True
    def __unicode__(self):
        return self.name

