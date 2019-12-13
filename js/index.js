slideAnim = () => {
    //working slide animation with DELAYS controlled
    const scrollTop = $(window).height()*0.9
    const slideThis = (object, func) => {
        let pos = object.offset().top, winTop = $(window).scrollTop()
        if (pos <= winTop + scrollTop) {
            if(object.attr('class').includes('delay1')) 
                $(function() {setInterval(func, 300)})
            else if(object.attr('class').includes('delay2')) 
                $(function() {setInterval(func, 600)})
            else if(object.attr('class').includes('delay3')) 
                $(function() {setInterval(func, 900)})
            else
                func()
        }
    }
    $(".slideanim").each(function() {
        const slide = () => $(this).addClass("slideup")
        slideThis($(this), slide)
    })
    $(".slideanim2").each(function() {
        const slide = () => $(this).addClass("slideleft")
        slideThis($(this), slide)
    })
    $(".slidescale").each(function() {
        const slide = () => $(this).addClass("scaler")
        slideThis($(this), slide)
    })
}

$(document).ready(function() { 
    slideAnim()
    $("#programs").mouseenter(function(event) {
        $("#programdropdown").slideDown("fast");
        $("#programs .navig-link .fa-angle-down").css('transform', 'rotate(180deg)');
    })
    $("#programs").mouseleave(function(event) {
        $("#programdropdown").slideUp("fast");
        $("#programs .navig-link .fa-angle-down").css('transform', 'rotate(0deg)');
    })

    setTimeout("$(\".title strong\").css(\'text-shadow\', \'4px 2px 0px #62ea6d\')", 500);
    setTimeout("$(\"#phhead h1 strong\").css(\'text-shadow\', \'4px 2px 0px #ee5c51\')", 500);
})

function rotate(x) {
    x.classList.toggle("change");
    $("#phonenavlinks").slideToggle();
}

$(window).scroll(function() {
    if($(window).width() > 768) {
        $("#floatingsquare3").css({
            'margin-top': $(this).scrollTop()/6
        })

        $("#floatingsquare2").css({
            'margin-top': -$(this).scrollTop()/8
        })
        $("#floatingsquare1").css({
            'margin-top': $(this).scrollTop()/6
        })
    }
    $("#topo").css({
        'margin-top': $(this).scrollTop()/15
    })
    $("#regimage").css({
        'margin-top': $(this).scrollTop()/10
    })

    $("#facultyimg").css({
        'margin-top': $(this).scrollTop()/10
    })

    slideAnim()
});

var canvas, gl; // canvas and webgl context

var shaderScript;
var shaderSource;
var vertexShader; // Vertex shader.  Not much happens in that shader, it just creates the vertex's to be drawn on
var fragmentShader; // this shader is where the magic happens. Fragment = pixel.  Vertex = kind of like "faces" on a 3d model.  
var buffer;

var locationOfTime;
var locationOfResolution;

var startTime = new Date().getTime(); // Get start time for animating
var currentTime = 0;

function init() {
    // standard canvas setup here, except get webgl context
    canvas = document.getElementById('glscreen');
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // give WebGL it's viewport
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    // kind of back-end stuff
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER, 
        new Float32Array([
            -1.0, -1.0, 
            1.0, -1.0, 
            -1.0,  1.0, 
            -1.0,  1.0, 
            1.0, -1.0, 
            1.0,  1.0]), 
        gl.STATIC_DRAW
    ); // ^^ That up there sets up the vertex's used to draw onto. I think at least, I haven't payed much attention to vertex's yet, for all I know I'm wrong.

    shaderScript = document.getElementById("2d-vertex-shader");
    shaderSource = shaderScript.text;
    vertexShader = gl.createShader(gl.VERTEX_SHADER); //create the vertex shader from script
    gl.shaderSource(vertexShader, shaderSource);
    gl.compileShader(vertexShader);

    shaderScript   = document.getElementById("2d-fragment-shader");
    shaderSource   = shaderScript.text;
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); //create the fragment from script
    gl.shaderSource(fragmentShader, shaderSource);
    gl.compileShader(fragmentShader);

    program = gl.createProgram(); // create the WebGL program.  This variable will be used to inject our javascript variables into the program.
    gl.attachShader(program, vertexShader); // add the shaders to the program
    gl.attachShader(program, fragmentShader); // ^^
    gl.linkProgram(program);     // Tell our WebGL application to use the program
    gl.useProgram(program); // ^^ yep, but now literally use it.
    
    locationOfResolution = gl.getUniformLocation(program, "u_resolution");
    locationOfTime = gl.getUniformLocation(program, "u_time");
    
    
    gl.uniform2f(locationOfResolution, canvas.width, canvas.height);
    gl.uniform1f(locationOfTime, currentTime);

    render();
}

function render() {
    var now = new Date().getTime();
    currentTime = (now - startTime) / 1000; // update the current time for animations
    
    
    gl.uniform1f(locationOfTime, currentTime); // update the time uniform in our shader

    window.requestAnimationFrame(render, canvas); // request the next frame

    positionLocation = gl.getAttribLocation(program, "a_position"); // do stuff for those vertex's
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

window.addEventListener('load', function(event){
    init();
});

window.addEventListener('resize', function(event){
    // just re-doing some stuff in the init here, to enable resizing.
    
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    locationOfResolution = gl.getUniformLocation(program, "u_resolution");
    resize()
});

function toggleProg() {
    $("#programdropdown2").slideToggle("fast");
    $("#programs2 .navig-link2 .fa-angle-down").toggleClass('rotate180');
}

const url = 'https://script.google.com/macros/s/AKfycbzr5pWKH-IoJKRQ4NlCw9eAh5josncR3Nof6xyvHiLOKfVyHQ/exec'

$('#submit-message').on('click', function(e) {
    e.preventDefault()
    const name = $("#message_name").val()
    const email = $("#message_email").val()
    const topic = $("#message_topic").val()
    const message = $("#message_msg").val()
    let errors = []
    if(name.length == 0) 
        errors.push('name')
    if(!/^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/.test(email))
        errors.push("valid email address")
    if(topic === 'Select')
        errors.push('your topic')
    if(errors.length == 0) {
        const formData = {
            "name": name,
            "email": email,
            "topic": topic,
            "message": message,
        }
    
        var jqxhr = $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: formData
        }).then(() => {
                $("#form-errors").html('Thank you for your message! We will get back to you as soon as possible.')
                $("#form-errors").css('color', 'lightgreen')
                $("#message_name").val('')
                $("#message_email").val('')
                $("#message_msg").val('')
                console.log('success!')
            }
        ).catch(err =>
            console.log(err)
        )
    } else {
        $("#form-errors").html('Error: please enter the following: ' + errors.join(', '))
        $("#form-errors").css('color', 'red')
    }
})



