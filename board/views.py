import json
from django.utils.timezone import *
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
            'start': race.timer_start,
            'end': race.timer_end,
        },
    }

    return JsonResponse(race_info)


def update_raceinfo(request):
    """更新比赛信息"""
    race = CurrentRace.objects.get(id=1).race
    update_info = {
        'race': str(race),
        'team1': {
            'score': str(race.team1_score),
            'total_score': str(race.team1_total_score),
        },
        'team2': {
            'score': str(race.team2_score),
            'total_score': str(race.team2_total_score),
        },
        'timer': {
            'start': race.timer_start,
            'end': race.timer_end,
        },
    }
    return JsonResponse(update_info)


def display_board(request):
    """显示比分面板"""
    # 手机页面搁置
    # if request.user_agent.is_mobile:
    # return render(request, 'phone.html')

    return render(request, 'board.html')


@staff_member_required
def referee(request):
    """裁判页面"""
    return render(request, template_name='referee.html')


@csrf_exempt
@staff_member_required
def change_raceinfo(request):
    """裁判信息同步至数据库"""
    if request.method == 'POST':
        data = json.loads(request.body)
        state = data.get('update_state')
        try:
            current_race = CurrentRace.objects.get(id=1)
            race = current_race.race

            if state == 'all':
                # Assuming you want to update the team names as well
                print('all')
                race.team1.name = data.get('team1_name')
                race.team1.save()
                race.team2.name = data.get('team2_name')
                race.team2.save()

                race.team1_score = data.get('team1_score')
                race.team1_total_score = data.get('team1_total_score')
                race.team2_score = data.get('team2_score')
                race.team2_total_score = data.get('team2_total_score')

                if data.get('timer_start') or data.get('timer_start') == 0:
                    race.timer_start = data.get('timer_start')
                else:
                    race.timer_start = 0

                if data.get('timer_end') or data.get('timer_end') == 0:
                    race.timer_end = data.get('timer_end')
                else:
                    race.timer_end = 0

                print(type(data.get('timer_start')))
                print(type(data.get('timer_end')))
                print(data.get('timer_start'))
                print(data.get('timer_end'))



            if state == 'timer':
                if data.get('timer_start') or data.get('timer_start') == 0:
                    race.timer_start = data.get('timer_start')
                else:
                    race.timer_start = 0

                if data.get('timer_end') or data.get('timer_end') == 0:
                    race.timer_end = data.get('timer_end')
                else:
                    race.timer_end = 0

                print(type(data.get('timer_start')))
                print(type(data.get('timer_end')))
                print(data.get('timer_start'))
                print(data.get('timer_end'))




            if state == 'score':
                print('score')
                race.team1_score = data.get('team1_score')
                race.team1_total_score = data.get('team1_total_score')
                race.team2_score = data.get('team2_score')
                race.team2_total_score = data.get('team2_total_score')

            race.save()

            print_database()

            return JsonResponse({'status': 'success'})
        except IndexError as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST method is accepted'}, status=405)

def print_database():
    races = Race.objects.all()
    for race in races:
        print('------------------------')
        print(race.team1_score)
        print(race.team1_total_score)
        print(race.team2_score)
        print(race.team2_total_score)
        print(race.timer_start)
        print(race.timer_end)
        print('------------------------')