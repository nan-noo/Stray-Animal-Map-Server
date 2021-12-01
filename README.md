# Stray-Animal-Map-Server

from: https://github.com/nan-noo/Stray-Animal-Map  
stray animal map + community  
you can register lost or found animals on the map

<p>
<img src="https://img.shields.io/badge/React.js-61DAFB?style=flat-square&logo=react&logoColor=black">&nbsp;
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/GoogleMapsAPI-4285f4?style=flat-square&logo=Google Maps&logoColor=white"/>&nbsp;
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

    JWT_SECRET=<YOUR_SECRET>

    MONGO_URI=<YOUR_MONGO_URI>

    S3_BUCKET=<YOUR_S3_BUCKET_NAME>
```

3. create awsconfig.json in ./src/config/

```JSON
{
    "accessKeyId": "<YOUR_KEY_ID>",
    "secretAccessKey": "<YOUR_KEY_SECRET>",
    "region": "<YOUR_BUCKET_REGION>"
}
```

4. run server in root folder

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

- more detail  
  <a href="https://first-daisy-ddd.notion.site/Stray-Animal-Map-209a68fa7d974e60bf814b9282bd2ca1">LINK</a>
