from django.contrib import admin
from django.urls import path, include

from board import views

urlpatterns = [
    path('update/scoreboard/', views.update_scoreboard, name='update_scoreboard'),
    path('update/raceinfo/', views.update_race, name='update_race'),
    path('update/score/', views.update_score, name='update_score'),
]
