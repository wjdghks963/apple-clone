# 배운 css 속성

- [overflow-x : hidden, visible, scroll, auto MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x)

- [rem MDN] ()
  em단위는 상위 요소 기준
  html{font-size:16px}
  body{font-size:1.5em}
  .a {font-size:2.0em}

a는 16 x 1.5 x 2.0 = 48px

rem단위는 html 요소 기준
html{font-size:16px}
body{font-size:1.5em}
.a {font-size:2.0rem}

a는 16 x 2.0 = 32px
height는 em, font-size는 rem 로 두는 이유는 font-size의 비율을 이용할 수 있기 떄문이다.

ex) height는 2.5rem의 0.2배
html의 font-size: 14px
height : 0.2em; // 8.4
font-size : 3rem; // 42px

# 배운 html

- lorem숫자 숫자만큼의 글자를 가진 가짜 txt

# 배운 js

- window.innerHeight를 이용해 section들이 다 일정한 높이를 갖게 해준다.

# 타임라인(스크롤) 설계

0 3000 ... ... ...
| 0 | 1 | 2 | 3 |

0 : 컵을 회전시키며 txt 4단
