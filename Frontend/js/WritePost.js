document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const boardType = params.get('boardType');
  const formTitle = document.getElementById('formTitle');
  const titleInput = document.getElementById('titleInput');
  const contentInput = document.getElementById('contentInput');
  // const nickname = localStorage.getItem('nickname');

  if (boardType === 'freeBoard') {
      formTitle.textContent = '자유 글쓰기';
  } else if (boardType === 'jobBoard') {
      formTitle.textContent = '채용 글쓰기';
  }

  const handleCancel = () => {
      window.history.back();
  };

  const handleSubmit = (event) => {
      event.preventDefault();

      const title = titleInput.value;
      const content = contentInput.value;

      // let postData = {};
      // let url = '';

      // if (boardType === 'freeBoard') {
      //     url = '/freeboard/post/';
      //     postData = {
      //       free_post_title: title,
      //       free_post_content: content,
      //       free_post_nickname: nickname
      //     };
      // } else if (boardType === 'jobBoard') {
      //     url = '/recruitboard/';
      //     postData = {
      //       recruit_post_title: title,
      //       recruit_post_content: content,
      //       nickname: nickname
      //     };
      // }

      // try {
      //     const response = await axios.post('http://your-backend-url.com/'+url, postData);
      //     if (response.status === 200) {
      //         window.location.href = '/Frontend/pages/Community.html';
      //     } else {
      //         console.error('Failed to submit post');
      //     }
      // } catch (error) {
      //     console.error('Error:', error);
      // }

      window.location.href = '/Frontend/pages/Community.html';
  };

  // 전역에서 접근 가능하도록 설정
  window.handleCancel = handleCancel;
  window.handleSubmit = handleSubmit;
});
