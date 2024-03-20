from django.contrib import admin
from django.urls import path, include

from board import views

urlpatterns = [
    path('update_score/', views.update_score, name='update_score'),
    path('update_raceinfo/', views.update_race, name='update_race'),
]
