from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from django.contrib.contenttypes.models import ContentType

from mit.models import (
        Faculty,
        WorkType,
        Work,
        GenericWork,
        Project,
        ResearchInitiative,
        Publisher,
        Publication,
        PublicationInfo,
        CourseInfo,
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

class WorkTypeSerializer(ModelSerializer):
    class Meta:
        model = WorkType

class CourseInfoSerizalizer(ModelSerializer):
    semesters = serializers.RelatedField(many=True)
    class Meta:
        model = CourseInfo
    fields = (
            'course_codes',
            'is_studio',
            'is_workshop',
            'is_practicum',
            'semesters',
        )

class PublicationInfoSerizalizer(ModelSerializer):
    medium = serializers.RelatedField()
    publishers = serializers.RelatedField(many=True)
    periodicals = serializers.RelatedField(many=True)
    class Meta:
        model = PublicationInfo
        fields = (
            'date_published',
            'publishers',
            'periodicals',
            'medium',
                )

class GenericWorkSerializer(ModelSerializer):
    publicationinfo = PublicationInfoSerizalizer()
    courseinfo = CourseInfoSerizalizer()
    class Meta:
        model = GenericWork
        fields = (
                'work_types',
                'title',
                'faculty',
                'website',
                'topics',
                'locations',
                'non_dusp_collaborators',
                'start_date',
                'end_date',
                'subworks',
                'publicationinfo',
                'courseinfo',
            )





