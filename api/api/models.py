from django.db import models

class Project(models.Model):
    name = models.CharField('Project Name', max_length=100)
    company = models.CharField('Compant Name', max_length=100)
    data = models.TextField()
