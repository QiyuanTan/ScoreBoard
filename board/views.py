from django.contrib.admin.views.decorators import staff_member_required
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse
from django.shortcuts import render
from django.utils import timezone
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
                 'timer': {'start': race.timer_start.timestamp() if race.timer_start else None,
                           'end': race.timer_end.timestamp() if race.timer_end else None}
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
        score1_delta = int(request.POST.get('score1'))
        score2_delta = int(request.POST.get('score2'))
    except MultiValueDictKeyError:
        return HttpResponseBadRequest()

    race = CurrentRace.objects.get(id=1).race
    race.score1 += score1_delta
    race.score2 += score2_delta
    race.save()

    return HttpResponse('success')


@csrf_exempt
@staff_member_required
def set_timer(request):
    try:
        action = request.GET.get('action')
    except MultiValueDictKeyError:
        return HttpResponseBadRequest()

    race = CurrentRace.objects.get(id=1).race
    if action == 'start':
        race.timer_start = timezone.now()
        race.timer_end = None
    elif action == 'pause':
        race.timer_end = timezone.now()
    elif action == 'resume':
        delta = race.timer_end - race.timer_start
        race.timer_start = timezone.now() - delta
        race.timer_end = None
    else:
        return HttpResponseBadRequest()
    race.save()

    return HttpResponse("success")
