# ScoreBoard
一个基于Django的排球计分板

## 下载
使用git glone  
```shell
git clone https://github.com/tanqiyuaneric/ScoreBoard.git
```  
或：  
[点击此链接](https://codeload.github.com/tanqiyuaneric/ScoreBoard/zip/refs/heads/master)  

## 部署
>需提前安装Python运行环境

``` shell
pip install -r requirements.txt #安装依赖
```

``` shell
python manage.py migrate #创建数据库
```

``` shell
python manage.py collectstatic # 生成静态文件
```  

```shell
python manage.py createsuperuser # 创建管理员账号
```  

### 使用Django的测试服务器部署
（不推荐，但这个方法确实简单）
```shell
python manage.py runserver [本机IP地址] # 运行测试服务器
```

将部署地址添加到```ScoreBoard/settings.py```中的```ALLOWED_HOSTS```中
```python
ALLOWED_HOSTS = ['本机IP地址']
```

### 使用标准方法部署
参考：[Django官方文档](https://docs.djangoproject.com/zh-hans/5.0/howto/deployment/)


## 部署至公网
使用任意内网穿透服务即可将网站部署至公网  

将公共网域名和地址添加至```ScoreBoard/settings.py```中的```ALLOWED_HOSTS```和```CSRF_TRUSTED_ORIGINS```中
```python
ALLOWED_HOSTS = ['公网域名']
CSRF_TRUSTED_ORIGINS = ['公网地址']
```

## URL结构
| 地址       | 功能                   |
|----------|----------------------|
| /        | 主页&计分板               |
| /control | 计分管理（需登录管理员后使用）      |
| /admin   | Django数据库管理，用于管理比赛信息 |

## 使用方法
### 创建比赛
进入```/admin```，登入后在team中创建队伍，在race中创建比赛
### 设置当前比赛
在```/admin```中进入current_race页面，选择第一个current_race对象并设置当前比赛。
如是第一次使用则需创建一个current_race对象。
> 注意：由于读取当前比赛的逻辑为读取```id=1```current_race对象，所以只有创建数据库后创建的第一个current_race对象是有效的。