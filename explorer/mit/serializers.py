from rest_framework.serializers import ModelSerializer

from django.contrib.contenttypes.models import ContentType

from mit.models import (
        Faculty,
        Work,
        Project,
        ResearchInitiative,
        Publisher,
        Publication,
        Book,
        Article,
        JournalArticle,
        Topic,
        Location,
        Colloquium,
        )

class ContentTypeSerializer(ModelSerializer):
    class Meta:
        model = ContentType

class FacultySerializer(ModelSerializer):
    class Meta:
        model = Faculty

class ResearchInitiativeSerializer(ModelSerializer):
    class Meta:
        model = ResearchInitiative

class ColloquiumSerializer(ModelSerializer):
    class Meta:
        model = Colloquium

class JournalArticleSerializer(ModelSerializer):
    class Meta:
        model = JournalArticle

class ArticleSerializer(ModelSerializer):
    class Meta:
        model = Article

class BookSerializer(ModelSerializer):
    class Meta:
        model = Book

class PublicationSerializer(ModelSerializer):
    class Meta:
        model = Publication

class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project

class WorkSerializer(ModelSerializer):
    class Meta:
        model = Work

class TopicSerializer(ModelSerializer):
    class Meta:
        model = Topic

class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location


class WorkSerializer(ModelSerializer):
    class Meta:
        model = Work

    def to_native(self, obj):
        if isinstance(obj, ResearchInitiative):
            return ResearchInitiativeSerializer(obj).to_native(obj)
        elif isinstance(obj, Colloquium):
            return ColloquiumSerializer(obj).to_native(obj)
        elif isinstance(obj, JournalArticle):
            return JournalArticleSerializer(obj).to_native(obj)
        elif isinstance(obj, Article):
            return ArticleSerializer(obj).to_native(obj)
        elif isinstance(obj, Book):
            return BookSerializer(obj).to_native(obj)
        elif isinstance(obj, Publication):
            return PublicationSerializer(obj).to_native(obj)
        elif isinstance(obj, Project):
            return ProjectSerializer(obj).to_native(obj)
        else:
            return super(WorkSerializer, self).to_native(obj)







