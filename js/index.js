function rotate(e){e.classList.toggle("change"),$("#phonenavlinks").slideToggle()}var canvas,gl,shaderScript,shaderSource,vertexShader,fragmentShader,buffer,locationOfTime,locationOfResolution;slideAnim=(()=>{const e=.9*$(window).height(),t=(t,r)=>{t.offset().top<=$(window).scrollTop()+e&&(t.attr("class").includes("delay1")?$(function(){setInterval(r,300)}):t.attr("class").includes("delay2")?$(function(){setInterval(r,600)}):t.attr("class").includes("delay3")?$(function(){setInterval(r,900)}):r())};$(".slideanim").each(function(){t($(this),()=>$(this).addClass("slideup"))}),$(".slideanim2").each(function(){t($(this),()=>$(this).addClass("slideleft"))}),$(".slidescale").each(function(){t($(this),()=>$(this).addClass("scaler"))})}),$(document).ready(function(){slideAnim(),$("#programs").mouseenter(function(e){$("#programdropdown").slideDown("fast"),$("#programs .navig-link .fa-angle-down").css("transform","rotate(180deg)")}),$("#programs").mouseleave(function(e){$("#programdropdown").slideUp("fast"),$("#programs .navig-link .fa-angle-down").css("transform","rotate(0deg)")}),setTimeout("$(\".title strong\").css('text-shadow', '4px 2px 0px #62ea6d')",500),setTimeout("$(\"#phhead h1 strong\").css('text-shadow', '4px 2px 0px #ee5c51')",500)}),$(window).scroll(function(){$(window).width()>768&&($("#floatingsquare3").css({"margin-top":$(this).scrollTop()/6}),$("#floatingsquare2").css({"margin-top":-$(this).scrollTop()/8}),$("#floatingsquare1").css({"margin-top":$(this).scrollTop()/6})),$("#topo").css({"margin-top":$(this).scrollTop()/15}),$("#regimage").css({"margin-top":$(this).scrollTop()/10}),$("#facultyimg").css({"margin-top":$(this).scrollTop()/10}),slideAnim()});var startTime=(new Date).getTime(),currentTime=0;function init(){canvas=document.getElementById("glscreen"),gl=canvas.getContext("webgl")||canvas.getContext("experimental-webgl"),canvas.width=window.innerWidth,canvas.height=window.innerHeight,gl.viewport(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight),buffer=gl.createBuffer(),gl.bindBuffer(gl.ARRAY_BUFFER,buffer),gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW),shaderScript=document.getElementById("2d-vertex-shader"),shaderSource=shaderScript.text,vertexShader=gl.createShader(gl.VERTEX_SHADER),gl.shaderSource(vertexShader,shaderSource),gl.compileShader(vertexShader),shaderScript=document.getElementById("2d-fragment-shader"),shaderSource=shaderScript.text,fragmentShader=gl.createShader(gl.FRAGMENT_SHADER),gl.shaderSource(fragmentShader,shaderSource),gl.compileShader(fragmentShader),program=gl.createProgram(),gl.attachShader(program,vertexShader),gl.attachShader(program,fragmentShader),gl.linkProgram(program),gl.useProgram(program),locationOfResolution=gl.getUniformLocation(program,"u_resolution"),locationOfTime=gl.getUniformLocation(program,"u_time"),gl.uniform2f(locationOfResolution,canvas.width,canvas.height),gl.uniform1f(locationOfTime,currentTime),render()}function render(){var e=(new Date).getTime();currentTime=(e-startTime)/1e3,gl.uniform1f(locationOfTime,currentTime),window.requestAnimationFrame(render,canvas),positionLocation=gl.getAttribLocation(program,"a_position"),gl.enableVertexAttribArray(positionLocation),gl.vertexAttribPointer(positionLocation,2,gl.FLOAT,!1,0,0),gl.drawArrays(gl.TRIANGLES,0,6)}function toggleProg(){$("#programdropdown2").slideToggle("fast"),$("#programs2 .navig-link2 .fa-angle-down").toggleClass("rotate180")}window.addEventListener("load",function(e){init()}),window.addEventListener("resize",function(e){canvas.width=window.innerWidth,canvas.height=window.innerHeight,gl.viewport(0,0,window.innerWidth,window.innerHeight),locationOfResolution=gl.getUniformLocation(program,"u_resolution"),resize()});const url="https://script.google.com/macros/s/AKfycbzr5pWKH-IoJKRQ4NlCw9eAh5josncR3Nof6xyvHiLOKfVyHQ/exec";$("#submit-message").on("click",function(e){e.preventDefault();const t=$("#message_name").val(),r=$("#message_email").val(),a=$("#message_topic").val(),o=$("#message_msg").val();let n=[];if(0==t.length&&n.push("name"),/^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/.test(r)||n.push("valid email address"),"Select"===a&&n.push("your topic"),0==n.length){const e={name:t,email:r,topic:a,message:o};$.ajax({url:url,method:"GET",dataType:"json",data:e}).then(()=>{$("#form-errors").html("Thank you for your message! We will get back to you as soon as possible."),$("#form-errors").css("color","lightgreen"),$("#message_name").val(""),$("#message_email").val(""),$("#message_msg").val(""),console.log("success!")}).catch(e=>console.log(e))}else $("#form-errors").html("Error: please enter the following: "+n.join(", ")),$("#form-errors").css("color","red")});