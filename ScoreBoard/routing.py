from django.utils import re_path
from board import consumers

websocket_urlpatterns = [
    re_path(r'^ws/board/(?P<group>\w+)/$', consumers.BoardConsumer),
]