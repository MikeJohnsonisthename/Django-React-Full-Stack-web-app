from django.urls import path
from . import views


urlpatterns = [
    path('notes/', views.NotelistCreate.as_view(), name='notes_list'),
    path('notes/<int:pk>/', views.NoteDelete.as_view(), name='note_delete'),
]