from .serializers import *
import os
from urllib import request
from django.views import View
import requests
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from .models import CustomUser
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.kakao import views as kakao_view
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings
from .models import CustomUser
from allauth.socialaccount.models import SocialAccount
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.http import JsonResponse
from json.decoder import JSONDecodeError
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly
import logging
logger = logging.getLogger(__name__)

BASE_URL = "http://127.0.0.1:8000/"
KAKAO_CALLBACK_URI = BASE_URL + "accounts/kakao/login"

def kakao_login(request):
    client_id = os.environ.get("SOCIAL_AUTH_KAKAO_CLIENT_ID")
    return redirect(f"https://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={KAKAO_CALLBACK_URI}&response_type=code&scope=account_email")

def kakao_callback(request):
    client_id = os.environ.get("SOCIAL_AUTH_KAKAO_CLIENT_ID")
    cliend_secret = os.environ.get("SOCIAL_AUTH_KAKAO_SECRET")
    code = request.GET.get("code")
    data = {'grant_type': "authorization_code", 'client_id': client_id,'client_secret': client_secret,
            'redirect_uri': KAKAO_CALLBACK_URI,
            'code': code}
    headers = {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
    token_response = requests.post('https://kauth.kakao.com/oauth/token', data = data, headers = headers)
    access_token = token_response.json().get('access_token')

    headers = {"Authorization": f'Bearer {access_token}'}
    token_validate_response = requests.get('https://kapi.kakao.com/v1/user/access_token_info', headers = headers)
    print(token_validate_response.json())

    headers = {"Authorization": f'Bearer {access_token}', 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
    user_info_response = requests.post('https://kapi.kakao.com/v2/user/me', headers = headers)
    print(user_info_response.json())
    # code로 access token 요청

    token_response_json = token_response.json()

    # 에러 발생 시 중단
    error = token_response_json.get("error", None)
    if error is not None:
        raise JSONDecodeError(error)

    access_token = token_response_json.get("access_token")

    profile_request = requests.post(
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    profile_json = profile_request.json()

    kakao_account = profile_json.get("kakao_account")
    email = kakao_account.get("email", None) # 이메일!

    if email is None:
        return JsonResponse({'err_msg': 'failed to get email'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = CustomUser.object.get(email=email)
        social_user = SocialAccount.objects.get(user=user)

        data = {'access_token': access_token, 'code': code}
        accept = requests.post(f"{BASE_URL}accounts/kakao/login/finish/", data=data)
        accept_status = accept.status_code  

        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)

        accept_json = accept.json()
        accept_json.pop('user', None)
        return JsonResponse(accept_json)

    except CustomUser.DoesNotExist:
        # 전달받은 이메일로 기존에 가입된 유저가 아예 없으면 => 새로 회원가입 & 해당 유저의 jwt 발급
        user_data = {
            'email': email,
            'gender': kakao_account.get("gender"),
            'age_range': kakao_account.get("age_range"),
            'profile_image': kakao_account["profile"].get("profile_image_url"),
            'nickname': kakao_account["profile"].get("nickname"),
            'kakao_oid': profile_json.get("id"),
        }
        serializer = UserSerializer(data=user_data)
        
        if serializer.is_valid():
            user = serializer.save()
        else:
            return JsonResponse({'err_msg': 'failed to save user data', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


        data = {'access_token': access_token, 'code': code}
        accept = requests.post(f"{BASE_URL}accounts/kakao/login/finish/", data=data)
        accept_status = accept.status_code

        # 뭔가 중간에 문제가 생기면 에러
        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)

        accept_json = accept.json()
        accept_json.pop('user', None)
        return JsonResponse(accept_json)
    

class KakaoLogin(SocialLoginView):
    adapter_class = kakao_view.KakaoOAuth2Adapter
    callback_url = KAKAO_CALLBACK_URI
    client_class = OAuth2Client

# def kakao_logout(request):
#     client_id = os.environ.get("SOCIAL_AUTH_KAKAO_CLIENT_ID")
#     LOGOUT_REDIRECT_URI = 'http://127.0.0.1:8000/'
#     access_token = request.session.get('access_token')

#     if not access_token:
#         return JsonResponse({'err_msg': 'Access token not found'}, status=400)
    
#     headers = {"Authorization": f'Bearer {access_token}'}
    
#     logout_response = requests.post('https://kapi.kakao.com/v1/user/logout', headers=headers)
#     if logout_response.status_code != 200:
#         return JsonResponse({'err_  msg': 'Failed to logout from Kakao'}, status=logout_response.status_code)
    
#     logout_redirect_response = requests.get(f'https://kauth.kakao.com/oauth/logout?client_id={client_id}&logout_redirect_uri={LOGOUT_REDIRECT_URI}')
#     if logout_redirect_response.status_code != 200:
#         return JsonResponse({'err_msg': 'Failed to redirect after logout'}, status=logout_redirect_response.status_code)

#     return JsonResponse({'msg': 'Successfully logged out'}, status=200)


class Profile(ModelViewSet):
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    queryset=CustomUser.objects.all()
    serializer_class=UserSerializer

