(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(pageYOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true

  const sceneInfo = [
    // 0
    {
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity: [0, 1], // messageA의 투명도를 담음 내릴때 0~1
      },
    },
    // 1
    {
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    // 2
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    // 3
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  const setLayout = () => {
    //각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight; // total에 씬의 높이 더하기
      if (totalScrollHeight >= yOffset) {
        currentScene = i; // 만약 토탈값이 현재 윈도우의 높이 값과 같거나 높다면 씬은 그 값(윗 섹션)으로
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  };

  function calcValues(values, currentYOffset) {
    let rv;
    // 현재씬 (스코롤섹션)에서 스크롤된 범위를 비율로 구하기
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
    rv = scrollRatio * (values[1] - values[0]) + values[0];
    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    switch (currentScene) {
      case 0:
        let messageA_opacity_in = calcValues(
          values.messageA_opacity,
          currentYOffset
        );
        objs.messageA.style.opacity = messageA_opacity_in;
        console.log(currentYOffset);
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
    }

    // 만약 위치가 현재씬에서 다음씬으로 내려갈때
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }
    // 만약 위치가 현재씬보다 올라갈때
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return; // 브라우저 바운스 효과로 마이너스가 되는 것을 방지
      enterNewScene = true;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return; // 새로운 씬이 된다면 리턴 = 종료

    playAnimation();
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener("resize", setLayout); //윈도우 창의 사이즈가 변할때마다 setLayout실행해서 높이 바꿈
  window.addEventListener("load", setLayout); // 윈도우 창이 로드 됐을때
  // window.addEventListener("DOMContentLoaded", setLayout); // dom구조가 로드 완료시
})();
