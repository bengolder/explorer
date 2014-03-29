from django.db import models
from .works import Work


class Colloquium(Work):
    """Can be used for Colloquia and Symposia
    """
    partners = models.TextField(null=True, blank=True)
    speakers = models.TextField(null=True, blank=True)
    date = models.DateField()
    class Meta:
        app_label = "mit"


