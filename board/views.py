from django.http import JsonResponse
from django.shortcuts import render
from board.models import *


# Create your views here.
def update_score(request):
    """更新计分板"""
    race = CurrentRace.objects.get(0).race
    race_info = {'race': str(race),
                 'score1': str(race.team1_score),
                 'score2': str(race.team2_score),
                 }
    return JsonResponse(race_info)


def update_race(request):
    """更新比赛信息"""
    race = CurrentRace.objects.get(0).race
    return JsonResponse({'team1': {'name': str(race.team1_name), 'logo': race.team1.logo},
                         'team2': {'name': str(race.team2_name), 'logo': race.team2.logo}})
