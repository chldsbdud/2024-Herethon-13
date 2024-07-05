// Kakao SDK 초기화
// Kakao.init('LPrFegF5QT1vgrlI2Li0b20zlJONhoLI');

// 로그인 버튼 클릭 이벤트 리스너
document.getElementById('login-btn').addEventListener('click',  async function () {
  window.location.href = '/Frontend/pages/Signup.html';

    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/kakao/login/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
      });

      if (response.ok) {
        const data = await response.json();

        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
  
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
  
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
  
        window.location.href = '/Frontend/pages/Signup.html';
    } else {
        console.error('Failed to submit post', response);
    }
    
  } catch (error) {
      console.error('Error:', error);
  }


    // Kakao.Auth.login({
    //     success: function (authObj) {
    //         // console.log(authObj); // access토큰 값
    //         // Kakao.Auth.setAccessToken(authObj.access_token); // access토큰값 저장
    //         // 로그인 성공시 사용자 정보 요청
    //         Kakao.API.request({
    //             url: '/v2/user/me',
    //             success: function (response) {
    //                 // console.log(res);
    //                 const userGender = response.kakao_account.gender;

    //                 if (userGender === 'female') {
    //                     // 성별이 여성인 경우
    //                     window.location.href = '/Frontend/pages/Signup.html';
    //                 } else {
    //                     alert('여성만 접근 가능합니다.');
    //                 }
    //             },
    //             fail: function (error) {
    //                 console.error('사용자 정보 요청 실패', error);
    //             }
    //         });
    //     },
    //     fail: function (err) {
    //         console.error('로그인 실패', err);
    //     }
    // });
});