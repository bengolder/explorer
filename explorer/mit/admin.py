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

admin.site.register(Person)
admin.site.register(Faculty)
admin.site.register(Work)
admin.site.register(Project)
admin.site.register(Publisher)
admin.site.register(Publication)
admin.site.register(Book)
admin.site.register(Article)
admin.site.register(JournalArticle)
admin.site.register(Topic)
admin.site.register(Location)

