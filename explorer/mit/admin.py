from django.contrib import admin

from mit.models import (
        Person,
        Faculty,
        Work,
        Project,
        Publisher,
        Publication,
        Book,
        Article,
        JournalArticle,
        Topic,
        Location,
        )

class FacultyAdmin(admin.ModelAdmin):
    fields = ('full_name', 'official_title', 'current_interests', 'email',
    'home_page', 'bio', 'places_lived')

class TopicAdmin(admin.ModelAdmin):
    pass

# admin.site.register(Person)
admin.site.register(Faculty, FacultyAdmin)
# admin.site.register(Work)
admin.site.register(Project)
admin.site.register(Publisher)
admin.site.register(Publication)
admin.site.register(Book)
admin.site.register(Article)
admin.site.register(JournalArticle)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Location)

