<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>حساب رقيم</title>

<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">

<style>

body{
margin:0;
background:#f5f5f7;
font-family:"Noto Sans Arabic",sans-serif;
color:#1d1d1f;
}

.box{

width:min(420px,90%);
margin:80px auto;

background:rgba(255,255,255,.7);
backdrop-filter:blur(25px);

padding:35px;

border-radius:25px;

box-shadow:0 20px 60px rgba(0,0,0,.08);

}

h1{
text-align:center;
margin-bottom:30px;
}


input{

width:100%;
padding:15px;
margin-bottom:15px;

border:1px solid #ddd;
border-radius:15px;

font-family:inherit;
font-size:15px;

}


button{

width:100%;
padding:15px;

border:0;
border-radius:15px;

background:#007aff;
color:white;

font-size:16px;

cursor:pointer;

}


.switch{

text-align:center;

margin-top:20px;

color:#007aff;

cursor:pointer;

}


.message{

text-align:center;

color:#777;

margin-top:15px;

}


.hidden{

display:none;

}

</style>

</head>


<body>


<div class="box">


<h1 id="title">
إنشاء حساب
</h1>



<div id="register">


<input id="name" placeholder="الاسم">

<input id="email" type="email" placeholder="البريد الإلكتروني">

<input id="password" type="password" placeholder="كلمة المرور">


<button id="registerBtn">
إنشاء حساب
</button>


</div>



<div id="login" class="hidden">


<input id="loginEmail" type="email" placeholder="البريد الإلكتروني">


<input id="loginPassword" type="password" placeholder="كلمة المرور">


<button id="loginBtn">
تسجيل الدخول
</button>


</div>



<p class="switch" id="switch">
لديك حساب؟ تسجيل الدخول
</p>


<p class="message" id="message"></p>


</div>



<script type="module" src="./auth.js"></script>


</body>

</html>
