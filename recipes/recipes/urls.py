from django.contrib import admin
from django.urls import path, include
from django.urls import re_path as url
from django.conf.urls.static import static
from django.conf import settings
from backend_api.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backend_api.urls')), 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


