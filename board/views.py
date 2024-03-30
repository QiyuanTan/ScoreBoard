from django.contrib.admin.views.decorators import staff_member_required
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse
from django.shortcuts import render
from django.utils import timezone
from django.utils.datastructures import MultiValueDictKeyError
from django.views.decorators.csrf import csrf_exempt
from board.models import *


def request_raceinfo(request):
    """请求全部比赛信息"""
    race = CurrentRace.objects.get(id=1).race
    race_info = {
        'race_name': str(race.name),
        'race': str(race),
        'team1': {
            'name': str(race.team1.name),
            'score': str(race.team1_score),
            'total_score': str(race.team1_total_score),
        },
        'team2': {
            'name': str(race.team2.name),
            'score': str(race.team2_score),
            'total_score': str(race.team2_total_score),
        },
        'timer': {
            'start': race.timer_start.timestamp() if race.timer_start else None,
            'end': race.timer_end.timestamp() if race.timer_end else None
        }
    }

    return JsonResponse(race_info)

def update_raceinfo(request):
    """更新比赛信息"""
    race = CurrentRace.objects.get(id=1).race
    update_info = {
        'race': str(race),
        'team1': {
            'score': str(race.team1_score),
        },
        'team2': {
            'score': str(race.team2_score),
        },
        'timer': {
            'start': race.timer_start.timestamp() if race.timer_start else None,
            'end': race.timer_end.timestamp() if race.timer_end else None
        }
    }
    return JsonResponse(update_info)


def display_board(request):
    """显示比分面板"""
    # 手机页面搁置
    # if request.user_agent.is_mobile:
    # return render(request, 'phone.html')

    return render(request, 'board.html')


@csrf_exempt
@staff_member_required
def change_raceinfo(request):
    """更新比赛信息"""
    pass



@csrf_exempt
@staff_member_required
def update_score(request):
    try:
        score1_delta = int(request.POST.get('score1'))
        score2_delta = int(request.POST.get('score2'))
    except MultiValueDictKeyError:
        return HttpResponseBadRequest()

    race = CurrentRace.objects.get(id=1).race
    race.team1_score += score1_delta
    race.team2_score += score2_delta
    race.save()

    return HttpResponse('success')


@csrf_exempt
@staff_member_required
def set_timer(request):
    try:
        action = request.POST.get('action')
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
    elif action == 'reset':
        race.timer_start = None
        race.timer_end = None
    else:
        return HttpResponseBadRequest()
    race.save()

    return HttpResponse(f"timer {action}ed successfully")


@staff_member_required
def control(request):
    return render(request, 'control.html')


@csrf_exempt
@staff_member_required
def exchange(request):
    race = CurrentRace.objects.get(id=1).race
    try:
        update = str(request.POST.get('update'))

        if update == 'true':
            if race.team1_score < race.team2_score:
                race.team2_total_score += 1
            elif race.team1_score > race.team2_score:
                race.team1_total_score += 1
            race.team1_score, race.team2_score = 0, 0

        else:
            race.team1_score, race.team2_score = race.team2_score, race.team1_score

    except MultiValueDictKeyError:
        pass
    race.team1, race.team2 = race.team2, race.team1
    race.team1_total_score, race.team2_total_score = race.team2_total_score, race.team1_total_score

    # race.timer_start = timezone.now()
    # race.timer_end = timezone.now()
    race.save()
    return HttpResponse('success')
