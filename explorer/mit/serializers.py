from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from django.contrib.contenttypes.models import ContentType

from mit.models import (
        Faculty,
        WorkType,
        GenericWork,
        PublicationInfo,
        CourseInfo,
        Topic,
        Location,
        )

class ContentTypeSerializer(ModelSerializer):
    class Meta:
        model = ContentType

class FacultySerializer(ModelSerializer):
    class Meta:
        model = Faculty

class TopicSerializer(ModelSerializer):
    class Meta:
        model = Topic

class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location

class WorkTypeSerializer(ModelSerializer):
    class Meta:
        model = WorkType

class CourseInfoSerializer(ModelSerializer):
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

class PublicationInfoSerializer(ModelSerializer):
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
    publicationinfo = PublicationInfoSerializer()
    courseinfo = CourseInfoSerializer()
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





