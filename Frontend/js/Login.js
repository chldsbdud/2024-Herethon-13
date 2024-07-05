// Kakao SDK 초기화
// Kakao.init('LPrFegF5QT1vgrlI2Li0b20zlJONhoLI');

// 로그인 버튼 클릭 이벤트 리스너
document.getElementById('login-btn').addEventListener('click', function () {
  window.location.href = '/Frontend/pages/Signup.html';
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
