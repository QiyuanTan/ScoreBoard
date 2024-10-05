[English](README_EN.md) | [简体中文](README.md)

# ScoreBoard
A scoreboard based on Django with a forward timer.

## Download
Use git clone:  
```shell
git clone https://github.com/tanqiyuaneric/ScoreBoard.git
```  
Or:  
[Click this link](https://codeload.github.com/tanqiyuaneric/ScoreBoard/zip/refs/heads/master)  

## Deployment
> Python runtime environment needs to be installed in advance

```shell
pip install -r requirements.txt # Install dependencies
```

```shell
python manage.py migrate # Create the database
```

```shell
python manage.py collectstatic # Generate static files
```

```shell
# Create an admin account enter your username and password when prompted
python manage.py createsuperuser 
```

### Deploying with Django's development server
(Not recommended, but it is simple)

```shell
python manage.py runserver [local IP address] # Run the development server
```

Add the deployment address to the `ALLOWED_HOSTS` in `ScoreBoard/settings.py`
```python
ALLOWED_HOSTS = ['local IP address']
```

### Standard deployment method
Refer to: [Django official documentation](https://docs.djangoproject.com/en/5.0/howto/deployment/)

## Deploying to public internet
You can use any internal network penetration service to deploy the site to the public internet.

Add the public domain name and address to `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` in `ScoreBoard/settings.py`
```python
ALLOWED_HOSTS = ['public domain name']
CSRF_TRUSTED_ORIGINS = ['public address']
```

## URL Structure
| Address    | Function                    |
|------------|-----------------------------|
| /          | Homepage & Scoreboard        |
| /referee   | Score management (requires admin login) |
| /admin     | Django admin site for managing competition info |

## Usage
### Creating a competition
Go to `/admin`, log in, and create teams in the `team` section. Then, create a competition in the `race` section.

### Setting the current competition
In `/admin`, go to the `current_race` page, select the first `current_race` object and set the current competition.
If it's your first time using it, you need to create a `current_race` object.
> Note: The logic for reading the current competition is to read the `id=1` `current_race` object. Therefore, only the first `current_race` object created after the database is set up will be valid.