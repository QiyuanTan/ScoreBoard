from django.urls import path

from board import views

urlpatterns = [
    # Display board
    path('', views.display_board, name='display_board'),

    # Update information via Polling request
    path('request_raceinfo/', views.request_raceinfo, name='request_raceinfo'),
    path('update_raceinfo/', views.update_raceinfo, name='update_raceinfo'),

    # Update information via WebSocket
    # path(),


    # control Panel
    path('referee/',views.referee, name='referee'),
    path('change_raceinfo/', views.change_raceinfo, name='change_raceinfo'),
]
