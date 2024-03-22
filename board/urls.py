from django.urls import path

from board import views

urlpatterns = [
    path('', views.display_board, name='display_board'),
    path('request_score/', views.request_score, name='update_score'),
    path('update_raceinfo/', views.update_race, name='update_race'),
    path('set_timer/', views.set_timer, name='set_timer'),
    path('control/', views.control, name='set_timer'),
    path('set_timer/', views.set_timer, name='set_timer'),
    # path('umpire/', views.umpire, name='umpire'),
    # path('tqy', views.test, name='test')
]
