# Generated by Django 5.0.6 on 2024-07-04 23:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('place_name', models.TextField(verbose_name='장소명')),
                ('place_detail', models.TextField(verbose_name='설명')),
                ('place_img', models.ImageField(upload_to='', verbose_name='대표 사진')),
                ('place_time', models.TextField(verbose_name='운영시간')),
                ('place_site', models.URLField(verbose_name='관련 사이트')),
                ('place_call', models.TextField(verbose_name='전화번호')),
                ('place_location', models.TextField(verbose_name='도로명 주소')),
                ('place_lat', models.FloatField(verbose_name='위도')),
                ('place_lon', models.FloatField(verbose_name='경도')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('review_content', models.TextField(verbose_name='리뷰 내용')),
                ('review_rate', models.IntegerField(verbose_name='별점')),
                ('review_place_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='place.place', verbose_name='리뷰가 달린 장소 id')),
                ('review_writer_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='작성자')),
            ],
        ),
        migrations.CreateModel(
            name='WomenOnlyPlace',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('women_only_category', models.CharField(blank=True, choices=[('BEAUTY', '뷰티'), ('GYM', '헬스장'), ('STUDY', '스터디카페/독서실'), ('HOSPITAL', '병원'), ('ACCOMMODATION', '숙박'), ('HOUSING', '주거'), ('RESTAURANT', '술집/음식점'), ('CENTER', '여성전용센터'), ('SAUNA', '사우나'), ('RESTROOM', '화장실')], max_length=20)),
                ('place', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='women_only_places', to='place.place')),
            ],
        ),
    ]