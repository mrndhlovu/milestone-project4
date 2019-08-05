from django.dispatch import Signal


user_is_active = Signal(providing_args=['instance', 'request'])
