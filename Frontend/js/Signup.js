document.addEventListener('DOMContentLoaded', () => {
  const nicknameInput = document.getElementById('nickname');
  const nicknameWarning = document.getElementById('nickname-warning');
  let nickname = '';

  window.goBack = function() {
      window.location.href = '/';
  };

  window.handleSubmit = function() {
    if (nickname.length === 0) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    
    window.location.href = '/Frontend/pages/Mypage.html';
      
      // axios.post('http://your-backend-url.com/account/signup', {
      //       nickname: nickname
      //     }, {
      //       headers: {
      //         Authorization: `Bearer ${jwtToken}` // JWT 토큰을 헤더에 추가
      //       }
      //     })
      //     .then(response => {
      //         if (response.status === 200) {
      //             window.location.href = '/Frontend/pages/Mypage.html';
      //         } else {
      //             console.error('Failed to submit nickname');
      //         }
      //     })
      //     .catch(error => console.error('Error:', error));
  };

  window.handleNicknameChange = function(e) {
      const value = e.target.value;
      if (value.length <= 10) {
          nickname = value;
          nicknameInput.classList.remove('warning');
          nicknameWarning.style.display = 'none';
      } else {
          nicknameInput.classList.add('warning');
          nicknameWarning.style.display = 'block';
      }
  };
});
