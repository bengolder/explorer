from rest_framework import routers
from mit.api_viewsets import (
        TopicViewSet,
        LocationViewSet,
        FacultyViewSet,
        ContentTypeViewSet,
        GenericWorkViewSet,
        WorkTypeViewSet,
        )

router = routers.DefaultRouter()
router.register('topic', TopicViewSet)
router.register('location', LocationViewSet)
router.register('faculty', FacultyViewSet)
router.register('models', ContentTypeViewSet)
router.register('work', GenericWorkViewSet)
router.register('worktypes', WorkTypeViewSet)
urlpatterns = router.urls
