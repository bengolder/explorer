from rest_framework.serializers import ModelSerializer

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


class TopicSerializer(ModelSerializer):
    class Meta:
        model = Topic

class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location

class FacultySerializer(ModelSerializer):
    class Meta:
        model = Faculty

class WorkSerializer(ModelSerializer):
    class Meta:
        model = Work

class ResearchInitiativeSerializer(ModelSerializer):
    class Meta:
        model = ResearchInitiative






