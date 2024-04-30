from django.urls import re_path
from board import consumers

websocket_urlpatterns = [
    re_path(r'^board/(?P<group>\w+)/$', consumers.BoardConsumer),
]