<h1 align="center">
    SIMPLE-DASHBOARD-NEXT-14
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/damartripamungkas/simple-dashboard-next-14?color=04D361&labelColor=000000">
  
  <a href="#">
    <img alt="Made by" src="https://img.shields.io/static/v1?label=made%20by&message=damartripamungkas&color=04D361&labelColor=000000">
  </a>
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/damartripamungkas/simple-dashboard-next-14?color=04D361&labelColor=000000">
  
  <a href="#">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/damartripamungkas/simple-dashboard-next-14?color=04D361&labelColor=000000">
  </a>
</p>

<br>

![Home](/public/home.png)

### 📖 Description :

This application demonstrates a basic dashboard implementation built with Next.js 14 (Typescript), leveraging its fullstack capabilities. The frontend utilizes TailwindCSS for flexible styling augmented by the DaisyUI component library. Data persistence is handled by a MariaDb database, abstracted by the Sequelize object-relational mapper to integrate smoothly with Next.js. Overall, this project aims to showcase a modular, scalable dashboard structure using robust and modern web technologies.

### 🗃️ Migrations and seeder :

```shell
curl -X POST \
  'http://localhost:3000/api' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "method": "initDb",
    "params": {}
  }'
```

### 💻 Step to install :

1. clone repository
2. setting configuration in file .env.local.example
3. change name .env.local.example to .env.local
4. npm install
5. npm run dev

### 🧾 Pre-Requisistes :

```
node.js == 20.9.0
```

### 📝 License :

Licensed under the [MIT License](./LICENSE).
