from django.contrib import admin
from django.forms import ModelForm

from polymorphic.admin import (
        PolymorphicParentModelAdmin,
        PolymorphicChildModelAdmin
        )

from mit.models import (
        Department,
        Person,
        Faculty,
        Work,
        Project,
        ResearchInitiative,
        Colloquium,
        Publisher,
        PublicationFormat,
        Publication,
        Book,
        Article,
        JournalArticle,
        Topic,
        Location,
        Semester,
        Subject,
        Course,
        )

class SemesterAdmin(admin.ModelAdmin):
    fields = (('year', 'season'),)
    ordering = ('-year','season')

class CourseInline(admin.StackedInline):
    model = Course
    verbose_name = ""
    verbose_name_plural = "Specific Subject Versions"
    raw_id_fields = ('instructors', 'topics', 'places_of_study')
    autocomplete_lookup_fields = {
            'm2m':['instructors', 'topics', 'places_of_study'],
            }
    fieldsets = (
            (None, {'fields': (('semesters', 'instructors'),),}),
            ('Version Title & Description', {
                'fields': (('title', 'website'), 'description',
                    ('is_workshop', 'is_practicum', 'is_studio'),),
                'classes': ('grp-collapse grp-closed',)
                }),
            ('Locations Studied', {
                'fields': ('places_of_study',),
                'classes': ('grp-collapse grp-closed',)
                }),
    )
    extra = 1
    ordering = ('semesters',)

class SubjectAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': (('course_codes', 'title', 'level'),) }),
        ('Canonical Subject Description', {
            'classes': ('grp-collapse grp-closed',),
            'fields': ('description',),
            }),
    )
    ordering = ('course_codes',)
    inlines = [
            CourseInline,
            ]

class FacultyAdminForm(ModelForm):

    class Meta:
        model = Faculty

    def __init__(self, *args, **kwargs):
        if 'initial' not in  kwargs:
            kwargs['initial'] = {}
        default_department, created = Department.objects.get_or_create(
            course_number="11",
            name="Urban Studies and Planning")
        if created:
            default_department.save()
        kwargs['initial'].update({
            'departments':[default_department.id],
            })
        super(FacultyAdminForm, self).__init__(*args, **kwargs)

class FacultyAdmin(admin.ModelAdmin):
    fieldsets = (
            (None, {'fields': ['full_name', 'official_title', 'departments'],}),
            ('Contact Info', {'fields': [('email', 'home_page'),],
                'classes': ('grp-collapse grp-closed',),
                }),
            ('Biographic Details', {'fields': [('current_interests',
                'places_lived'), 'bio'],
                'classes': ('grp-collapse',),
                }),
    )
    ordering = ('full_name',)
    form = FacultyAdminForm


class TopicAdmin(admin.ModelAdmin):
    fields = (('name', 'description'), 'parent_topics')
    ordering = ('name',)

class LocationAdmin(admin.ModelAdmin):
    fields = (('name', 'parent_locations'), ('official_name', 'official_id'), 'description')
    ordering = ('name',)

class PublisherAdmin(admin.ModelAdmin):
    fields = (('name', 'website'), 'description')
    ordering = ('name',)

class PublicationFormatAdmin(admin.ModelAdmin):
    fields = (('name', 'parent_format'),
            'description')

class WorkChildAdmin(PolymorphicChildModelAdmin):
    base_model = Work
    fields = (('title', 'authors', 'partners'), 'description', 'topics', 'website',
        'locations',
        )

class ProjectAdmin(WorkChildAdmin):
    fields = ('title', 'authors', 'description', 'topics', 'website',
        'locations', 'partners', 'start_date', 'end_date',
        )

class ResearchInitiativeAdmin(WorkChildAdmin):
    fields = ('title', 'authors', 'description', 'topics', 'website',
        'locations', 'partners', 'start_date', 'end_date', 'subprojects',
        )

class ColloquiumAdmin(WorkChildAdmin):
    fields = ('title', 'authors', 'description', 'topics', 'website',
        'locations', 'partners', 'date',
        )


class PublicationAdmin(WorkChildAdmin):
    fields = (('title', 'authors','partners'), 'date_published', 'publisher', 'description',
            'topics', 'website',
            'locations', 'medium',
            )

class BookAdmin(PublicationAdmin):
    fields = (('title', 'authors', 'partners'), 'date_published', 'publisher',
        'cities_published', 'edition', 'description', 'topics', 'website',
        'locations', 'medium',
        )

class ArticleAdmin(PublicationAdmin):
    fields = (('title', 'authors', 'partners'), 'date_published', 'periodical_name',
            'pages', 'publisher', 'description',
            'topics', 'website', 'locations', 'medium',
            )

class JournalArticleAdmin(ArticleAdmin):
    fields = (('title', 'authors', 'partners'), 'date_published', 'periodical_name',
            'volume', 'issue',
            'pages', 'publisher', 'description',
            'topics', 'website', 'locations', 'medium',
            )

class WorkParentAdmin(PolymorphicParentModelAdmin):
    base_model = Work
    child_models = (
            (Project, ProjectAdmin),
            (ResearchInitiative, ResearchInitiativeAdmin),
            (Colloquium, ColloquiumAdmin),
            (Publication, PublicationAdmin),
            (Book, BookAdmin),
            (Article, ArticleAdmin),
            (JournalArticle, JournalArticleAdmin),
    )

admin.site.register(Department)
admin.site.register(PublicationFormat, PublicationFormatAdmin)
admin.site.register(Faculty, FacultyAdmin)
admin.site.register(Publisher, PublisherAdmin)
admin.site.register(Work, WorkParentAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Semester, SemesterAdmin)
admin.site.register(Subject, SubjectAdmin)

