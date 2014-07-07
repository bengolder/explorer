from django.contrib import admin
from django.forms import ModelForm

from mit.models import (
        Department,
        Person,
        Faculty,
        GenericWork,
        Periodical,
        PublicationInfo,
        CourseInfo,
        WorkType,
        Publisher,
        PublicationFormat,
        Topic,
        Location,
        Semester,
        )

class SemesterAdmin(admin.ModelAdmin):
    fields = (('year', 'season'),)
    ordering = ('-year','season')

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

class WorkTypeAdmin(admin.ModelAdmin):
    ordering = ('name',)
    fields = (
            ('name', 'subtypes'),
            )

class PublicationInfoInline(admin.StackedInline):
    verbose_name = "Publication Info"
    verbose_name_plural = "Publication Info"
    model = PublicationInfo
    fields = (
            ('medium', 'publishers', 'periodicals'),
            ('date_published',),
            )


class CourseInfoInline(admin.StackedInline):
    verbose_name = "Course Info"
    verbose_name_plural = "Course Info"
    model = CourseInfo
    fields = (
            ('course_codes', 'semesters'),
            ('is_workshop', 'is_practicum', 'is_studio'),
            )

class GenericWorkAdmin(admin.ModelAdmin):
    fieldsets = (
            (None, {'fields': [
                'title',
                ('work_types', 'faculty'),
                ('topics', 'locations'),
                'website'
                ],}),
            ('Description', {
                'fields': ['description'],
                'classes': ('grp-collapse grp-closed',),
                }),
            ('Collaborators & Partners', {
                'fields': [('non_dusp_collaborators', 'partners')],
                'classes': ('grp-collapse grp-closed',),
                }),
            ('Dates', {
                'fields': [('start_date', 'end_date')],
                'classes': ('grp-collapse grp-closed',),
                }),
            ('Sub Items', {
                'fields': ['subworks',],
                'classes': ('grp-collapse grp-closed',),
                }),
        )
    ordering = ('title',)
    inlines = [
            PublicationInfoInline,
            CourseInfoInline
            ]




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


admin.site.register(Department)
admin.site.register(PublicationFormat, PublicationFormatAdmin)
admin.site.register(Faculty, FacultyAdmin)
admin.site.register(Publisher, PublisherAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Semester, SemesterAdmin)
admin.site.register(WorkType, WorkTypeAdmin)
admin.site.register(GenericWork, GenericWorkAdmin)

