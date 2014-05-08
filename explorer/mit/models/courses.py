from django.db import models

from .years import YEAR_CHOICES

SEMESTER_CHOICES = (
        ('fa', 'Fall'),
        ('sp', 'Spring'),
        ('ia', 'IAP'),
        ('sm', 'Summer'),
        )

LEVEL_CHOICES = (
        ('u', 'Undergraduate'),
        ('g', 'Graduate'),
        ('h', 'H-Level Graduate'),
        )

class Semester(models.Model):
    """A single academic semester at MIT
    """
    season = models.CharField(max_length=4, choices=SEMESTER_CHOICES)
    year = models.CharField(max_length=4, choices=YEAR_CHOICES, default=2014)
    class Meta:
        app_label = 'mit'
        unique_together = ('season', 'year',)
    def __unicode__(self):
        return "%s %s" % (self.year, self.get_season_display())
    def termParameter(self):
        """this is used for passing arguments to
        http://coursews.mit.edu/coursews
        example:
            2014 Spring --> 2014SP
        """
        return str(self.year) + self.season.upper()


class CourseInfo(models.Model):
    work_item = models.OneToOneField('GenericWork')
    course_codes = models.CharField(max_length=50)
    #level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='g')
    is_workshop = models.BooleanField(default=False)
    is_practicum = models.BooleanField(default=False)
    is_studio = models.BooleanField(default=False)
    semesters = models.ManyToManyField('Semester')
    class Meta:
        app_label = "mit"
    def __unicode__(self):
        return self.course_codes

