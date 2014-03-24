from django.contrib import admin

from polymorphic.admin import (
        PolymorphicParentModelAdmin,
        PolymorphicChildModelAdmin
        )

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
    ordering = ('full_name',)

class TopicAdmin(admin.ModelAdmin):
    fields = ('name', 'description', 'parent_topics')
    ordering = ('name',)

class LocationAdmin(admin.ModelAdmin):
    fields = ('name', 'parent_locations', 'official_name', 'official_id', 'description')
    ordering = ('name',)

class PublisherAdmin(admin.ModelAdmin):
    fields = ('name', 'website', 'description')
    ordering = ('name',)

class WorkChildAdmin(PolymorphicChildModelAdmin):
    base_model = Work
    fields = ('title', 'authors', 'description', 'topics', 'website',
        'locations',
        )

class ProjectAdmin(WorkChildAdmin):
    fields = ('title', 'authors', 'description', 'topics', 'website',
        'locations', 'partners', 'start_date', 'end_date',
        )

class PublicationAdmin(WorkChildAdmin):
    fields = ('title', 'authors', 'date_published', 'publisher', 'description',
            'topics', 'website',
            'locations', 'medium',
            )

class BookAdmin(PublicationAdmin):
    fields = ('title', 'authors', 'date_published', 'publisher',
        'cities_published', 'edition', 'description', 'topics', 'website',
        'locations', 'medium',
        )

class ArticleAdmin(PublicationAdmin):
    fields = ('title', 'authors', 'date_published', 'periodical_name',
            'pages', 'publisher', 'description',
            'topics', 'website', 'locations', 'medium',
            )

class JournalArticleAdmin(ArticleAdmin):
    fields = ('title', 'authors', 'date_published', 'periodical_name',
            'volume', 'issue',
            'pages', 'publisher', 'description',
            'topics', 'website', 'locations', 'medium',
            )

class WorkParentAdmin(PolymorphicParentModelAdmin):
    base_model = Work
    child_models = (
            (Project, ProjectAdmin),
            (Publication, PublicationAdmin),
            (Book, BookAdmin),
            (Article, ArticleAdmin),
            (JournalArticle, JournalArticleAdmin),
    )


admin.site.register(Faculty, FacultyAdmin)
admin.site.register(Publisher, PublisherAdmin)
admin.site.register(Work, WorkParentAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Location, LocationAdmin)

