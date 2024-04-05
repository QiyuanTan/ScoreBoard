from channels.generic.websocket import WebsocketConsumer
from channels.exceptions import StopConsumer
from asgiref.sync import async_to_sync

class BoardConsumer(WebsocketConsumer):
    def connect(self, message):
        self.accept()

    def websocket_receive(self, message):
        self.send()

    def disconnect(self, message):
        raise StopConsumer()