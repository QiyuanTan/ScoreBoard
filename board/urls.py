from django.urls import path

from board import views

urlpatterns = [
    path('', views.display_board, name='display_board'),
    path('request_score/', views.request_score, name='update_score'),
    path('update_raceinfo/', views.update_race, name='update_race'),
    path('control/', views.control, name='control'),
    path('update_score/', views.update_score, name='update_score'),
    path('set_timer/', views.set_timer, name='set_timer'),
    path('exchange/', views.exchange, name='exchange'),
]
