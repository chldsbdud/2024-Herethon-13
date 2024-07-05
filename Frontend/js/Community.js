document.addEventListener('DOMContentLoaded', () => {
    const communityContent = document.getElementById('communityContent');
    const freeBoardTab = document.getElementById('freeBoardTab');
    const jobBoardTab = document.getElementById('jobBoardTab');

    let activeTab = 'freeBoard';
    let freeBoardPosts = [];
    let jobBoardPosts = [];

    const navigateToHome = () => {
        window.location.href = '/';
    };

    const setActiveTab = (tab) => {
        activeTab = tab;
        renderPosts();
    };

    const renderPosts = () => {
        freeBoardTab.classList.remove('active');
        jobBoardTab.classList.remove('active');
        communityContent.innerHTML = '';

        let posts = [];
        if (activeTab === 'freeBoard') {
            freeBoardTab.classList.add('active');
            posts = freeBoardPosts;
        } else if (activeTab === 'jobBoard') {
            jobBoardTab.classList.add('active');
            posts = jobBoardPosts;
        }

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const postTitle = document.createElement('div');
            postTitle.classList.add('post-title');
            postTitle.textContent = post.title;

            const postContent = document.createElement('div');
            postContent.classList.add('post-content');
            postContent.textContent = post.content;

            const postFooter = document.createElement('div');
            postFooter.classList.add('post-footer');

            const likeElement = document.createElement('span');
            const likeIcon = document.createElement('img');
            likeIcon.src = '/Frontend/img/heart.png';
            likeIcon.classList.add('icon');
            likeElement.appendChild(likeIcon);
            likeElement.appendChild(document.createTextNode(post.likes));

            const commentElement = document.createElement('span');
            const commentIcon = document.createElement('img');
            commentIcon.src = '/Frontend/img/comment.png';
            commentIcon.classList.add('icon');
            commentElement.appendChild(commentIcon);
            commentElement.appendChild(document.createTextNode(post.comments));

            const timeElement = document.createElement('span');
            timeElement.classList.add('time');
            timeElement.textContent = `| ${post.time}`;

            postFooter.appendChild(likeElement);
            postFooter.appendChild(commentElement);
            postFooter.appendChild(timeElement);

            postElement.appendChild(postTitle);
            postElement.appendChild(postContent);
            postElement.appendChild(postFooter);

            communityContent.appendChild(postElement);
        });

        const writeButton = document.createElement('button');
        writeButton.classList.add('write-button');
        writeButton.textContent = '+ 글쓰기';
        writeButton.onclick = () => {
            window.location.href = `/Frontend/pages/WritePost.html?boardType=${activeTab}`;
        };
        communityContent.appendChild(writeButton);
    };

    // 초기 데이터 설정
    const dummyFreeBoardPosts = [
        {
            id: 1,
            title: '이번 주 장마래',
            content: '비가 많이 오니까 다들 우산 챙겨서 다녀! 나는 우산 안 가지고 와서 편의점에서 샀어~',
            likes: 5,
            comments: 2,
            time: '3:46'
        },
        {
            id: 2,
            title: '좋은 카페 추천',
            content: '최근에 발견한 카페가 너무 좋아서 공유합니다~',
            likes: 8,
            comments: 4,
            time: '10:22'
        }
    ];

    const dummyJobBoardPosts = [
        {
            id: 1,
            title: '프론트엔드 개발자 모집',
            content: '저희 회사에서 프론트엔드 개발자를 모집합니다. 많은 지원 바랍니다.',
            likes: 10,
            comments: 5,
            time: '12:30'
        },
        {
            id: 2,
            title: '백엔드 개발자 구인',
            content: '백엔드 개발자 구인합니다. 경력자 우대합니다.',
            likes: 7,
            comments: 3,
            time: '14:15'
        },
        {
            id: 3,
            title: '프론트엔드 개발자 모집',
            content: '저희 회사에서 프론트엔드 개발자를 모집합니다. 많은 지원 바랍니다.',
            likes: 10,
            comments: 5,
            time: '12:30'
        },
        {
            id: 2,
            title: '백엔드 개발자 구인',
            content: '백엔드 개발자 구인합니다. 경력자 우대합니다.',
            likes: 7,
            comments: 3,
            time: '14:15'
        },
        {
            id: 2,
            title: '백엔드 개발자 구인',
            content: '백엔드 개발자 구인합니다. 경력자 우대합니다.',
            likes: 7,
            comments: 3,
            time: '14:15'
        },
    ];

    freeBoardPosts = dummyFreeBoardPosts;
    jobBoardPosts = dummyJobBoardPosts;

    // 초기 렌더링
    renderPosts();

    window.setActiveTab = setActiveTab;
    window.navigateToHome = navigateToHome;

    // 주석 처리된 코드
    //   if (activeTab === 'freeBoard') {
    //     axios.get('/freeboard/post/')
    //       .then(response => {
    //         setFreeBoardPosts(response.data);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching freeboard posts:', error);
    //       });
    //   } else if (activeTab === 'jobBoard') {
    //     axios.get('/recruitboard/')
    //       .then(response => {
    //         setJobBoardPosts(response.data);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching recruitboard posts:', error);
    //       });
    //   }
    // }, [activeTab]);
});
