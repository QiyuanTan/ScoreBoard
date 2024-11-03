from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    # foreign key link to user
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # user gender info
    gender = models.CharField()
    personal_pronoun = models.CharField()

class Team(models.Model):
    # foreign key link to user
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=100)
    # TODO:Team logo
    # logo = models.ImageField(upload_to='teamLogos/', null=True, blank=True)

    def __str__(self):
        return self.name


class Race(models.Model):
    # foreign key link to user
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # race name
    name = models.CharField(max_length=100)

    # foreign key link to team1 and team2
    team1 = models.ForeignKey(Team, on_delete=models.PROTECT, related_name='team1')
    team2 = models.ForeignKey(Team, on_delete=models.PROTECT, related_name='team2')

    # score info
    team1_score = models.IntegerField(default=0)
    team2_score = models.IntegerField(default=0)
    team1_total_score = models.IntegerField(default=0)
    team2_total_score = models.IntegerField(default=0)

    # race timber
    start_time = models.DateTimeField(auto_now_add=True)
    timer_start = models.IntegerField(default=0, blank=True)
    timer_end = models.IntegerField(default=0, blank=True)

    def __str__(self):
        return f"{self.name}: {self.team1} vs {self.team2}"


class CurrentRace(models.Model):
    # foreign key link to user
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # foreign key link to race
    race = models.ForeignKey(Race, on_delete=models.PROTECT)

    def __str__(self):
        return str(self.race)
