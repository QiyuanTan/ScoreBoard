from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required, permission_required
from django.http import JsonResponse, HttpResponseBadRequest
from django.shortcuts import render
from django.utils.datastructures import MultiValueDictKeyError
from django.views.decorators.csrf import csrf_exempt
from board.models import *


# Create your views here.
def request_score(request):
    """更新计分板"""
    race = CurrentRace.objects.get(id=1).race
    race_info = {'race': str(race),
                 'score1': str(race.team1_score),
                 'score2': str(race.team2_score),
                 }
    return JsonResponse(race_info)


def update_race(request):
    """更新比赛信息"""
    race = CurrentRace.objects.get(id=1).race
    return JsonResponse({'race_name': str(race.name),
                         'team1': {'name': str(race.team1.name), 'logo_url': race.team1.logo.url},
                         'team2': {'name': str(race.team2.name), 'logo_url': race.team2.logo.url}})


def display_board(request):
    """显示比分面板"""
    return render(request, template_name='board.html')


@csrf_exempt
@staff_member_required
def update_score(request):
    try:
        score1_delta = int(request.POST['score1'])
        score2_delta = int(request.POST['score2'])
    except MultiValueDictKeyError:
        return HttpResponseBadRequest()

    race = CurrentRace.objects.get(id=1).race
    race.score1 += score1_delta
    race.score2 += score2_delta
    race.save()

    return "success"
