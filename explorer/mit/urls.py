from rest_framework import routers
from mit.api_viewsets import (
        TopicViewSet,
        LocationViewSet,
        FacultyViewSet,
        WorkViewSet,
        ResearchInitiativeViewSet,
        ContentTypeViewSet,
        )

router = routers.DefaultRouter()
router.register('topic', TopicViewSet)
router.register('location', LocationViewSet)
router.register('faculty', FacultyViewSet)
router.register('work', WorkViewSet)
router.register('lab', ResearchInitiativeViewSet)
router.register('models', ContentTypeViewSet)
urlpatterns = router.urls
