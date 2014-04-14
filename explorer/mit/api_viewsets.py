from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from django.contrib.contenttypes.models import ContentType

from mit.models import (
        Faculty,
        Work,
        Location,
        ResearchInitiative,
        Topic,
        )

from mit.serializers import (
        ContentTypeSerializer,
        TopicSerializer,
        LocationSerializer,
        FacultySerializer,
        WorkSerializer,
        ResearchInitiativeSerializer,
        )

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ResearchInitiativeViewSet(viewsets.ModelViewSet):
    queryset = ResearchInitiative.objects.all()
    serializer_class = ResearchInitiativeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ContentTypeViewSet(viewsets.ModelViewSet):
    queryset = ContentType.objects.filter(app_label='mit')
    serializer_class = ContentTypeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


