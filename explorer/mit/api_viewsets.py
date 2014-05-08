from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from django.contrib.contenttypes.models import ContentType

from mit.models import (
        Faculty,
        Location,
        Topic,
        GenericWork,
        WorkType,
        )

from mit.serializers import (
        ContentTypeSerializer,
        TopicSerializer,
        LocationSerializer,
        FacultySerializer,
        GenericWorkSerializer,
        WorkTypeSerializer,
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

class ContentTypeViewSet(viewsets.ModelViewSet):
    queryset = ContentType.objects.filter(app_label='mit')
    serializer_class = ContentTypeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class WorkTypeViewSet(viewsets.ModelViewSet):
    queryset = WorkType.objects.all()
    serializer_class = WorkTypeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class GenericWorkViewSet(viewsets.ModelViewSet):
    queryset = GenericWork.objects.all()
    serializer_class = GenericWorkSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]



