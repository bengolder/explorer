from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from mit.models import (
        Faculty,
        Work,
        Location,
        ResearchInitiative,
        Topic,
        )

from mit.serializers import (
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


