# Stray-Animal-Map-Server

from: https://github.com/nan-noo/Stray-Animal-Map  
stray animal map + community  
you can register lost or found animals on the map

<p>
<img src="https://img.shields.io/badge/React.js-61DAFB?style=flat-square&logo=react&logoColor=black">&nbsp;
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/GoogleMapsAPI-4285f4?style=flat-square&logo=Google Maps&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white"/>&nbsp;
</p>

---

## Start

0. git clone or download project
1. install node_modules in root folder

```
    npm install [--only=prod]
```

2. create .env file in root folder

```
    MODE=<dev or prod>

    PORT=<YOUR_PORT>

    COOKIE_SECRET=<YOUR_COOKIE_SECRET>

    JWT_SECRET=<YOUR_SECRET>

    MONGO_URI=<YOUR_MONGO_URI>

    S3_BUCKET=<YOUR_S3_BUCKET_NAME>
    
    AWS_ACCESS_KEY_ID=<YOUR_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_KEY>
```

3. run server in root folder

```
    node src/index.js
    // or
    npm run backend
```

---

## Screen

![잃어버린 동물 지도 (2)](https://user-images.githubusercontent.com/54002105/143589099-12932b20-1efe-490a-bc19-aec3b21f4e84.gif)

---

## Modules

| server                    | description          |
| ------------------------- | -------------------- |
| "bcrypt": "^5.0.1"        | hash encryption      |
| "cookie-parser": "^1.4.5" | use cookie           |
| "express": "^4.17.1"      | server framework     |
| "jsonwebtoken": "^8.5.1"  | handle auth user     |
| "mongoose": "^5.13.3"     | use mongoDB          |
| "multer": "^1.4.3"        | save image           |
| "multer-s3": "^2.10.0"    | save image to aws s3 |
| "aws-sdk": "^2.1039.0"    | use aws              |
| "morgan": "^1.10.0"       | handle log           |
| "cors": "^2.8.5"          | handle cors          |

---

## Service Flow

![그림1](https://user-images.githubusercontent.com/54002105/144595017-8f2086b3-4150-4d05-9e36-7a4c0dfa2246.png)

---

- more detail  
  <a href="https://first-daisy-ddd.notion.site/Stray-Animal-Map-209a68fa7d974e60bf814b9282bd2ca1">LINK</a>

---

## Trouble-shooting

항상 cors가 문제다!!! 단순 동일 출처가 아니어서 요청이 안되는 경우는 cors 모듈 호출만 하면 해결되었지만, 프론트의 쿠키가 서버에 전송이 안 됐다. cookie를 보낼 수 있기 위해 프론트와 백 모두 설정을 더 해야 했다.

- 프론트: 인증, 로그아웃 관련 action 함수에서 axios 요청을 보낼 때 config option으로 {withCredentials: true} 추가
- 백: cors({origin: true, credentials: true}) 옵션 필요

이렇게 하고 나서 로컬에서는 오류가 안 났는데, ec2 정책 상 allow-origin이 항상 '\*'이라 쿠키와 같은 credential을 허용하지 않는다고 한다.. 쿠키 대신 localstorage로 바꿔봐야 겠다.. -> 성공!!!!! cors 에러가 사라졌다.
