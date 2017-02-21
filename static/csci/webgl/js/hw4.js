//
//  Compile a shader
//
function CompileShader(gl,id)
{
	//  Get shader by id
	var src = document.getElementById(id);
	//  Create shader based on type setting
	var shader;
	if (src.type == "x-shader/x-fragment")
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	else if (src.type == "x-shader/x-vertex")
		shader = gl.createShader(gl.VERTEX_SHADER);
	else
		return null;
	//  Read source into str
	var str = "";
	var k = src.firstChild;
	while (k)
	{
		if (k.nodeType == 3) str += k.textContent;
			k = k.nextSibling;
	}
	gl.shaderSource(shader, str);
	//  Compile the shader
	gl.compileShader(shader);
	//  Check for errors
	if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) == 0)
		alert(gl.getShaderInfoLog(shader));
	//  Return shader
	return shader;
}

//
//  Compile shader program
//
function CompileShaderProg(gl,vert,frag)
{
	//  Compile the program
	var prog  = gl.createProgram();
	gl.attachShader(prog , CompileShader(gl,vert));
	gl.attachShader(prog , CompileShader(gl,frag));
	gl.linkProgram(prog);
	//  Check for errors
	if (gl.getProgramParameter(prog, gl.COMPILE_STATUS) == 0)
		alert(gl.getProgramInfoLog(prog));
	//  Return program
	return prog;
}

var gl,canvas;
function webGLStart()
{
	//  Set canvas
	canvas = document.getElementById("canvas");
	//  Select canvas size
	var size = Math.min(window.innerWidth,window.innerHeight)-10;
	canvas.width  = size;
	canvas.height = size;
	//  Start WebGL
	if (!window.WebGLRenderingContext)
	{
		alert("Your browser does not support WebGL. See http://get.webgl.org");
		return;
	}
	try
	{
		gl = canvas.getContext("experimental-webgl");
	}
	catch(e)
	{}
	if (!gl)
	{
		alert("Can't get WebGL");
		return;
	}

	//  Set viewport to entire canvas
	gl.viewport(0,0,size,size);

	//  Load Shader
	var prog = CompileShaderProg(gl,"shader-vs","shader-fs");

	//  Set program
	gl.useProgram(prog);

	//  Set projection
	var ProjectionMatrix = new CanvasMatrix4();
	ProjectionMatrix.ortho(-100,+100,-100,+100,-100,+100);

	//  Vertex array count
	var n = 258;
	//  Robot vertex coordinates
	var xyz = getVerts(n);
	var verts = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,verts);
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(xyz),gl.STATIC_DRAW);

	//  Robot colors
	var rgb = 
	[	
		// Head
		.8,.8,.8 , .2,.2,.2 , .2,.2,.2 , .2,.2,.2 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .2,.2,.2 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .2,.2,.2 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.2,.2,.2 , .2,.2,.2 , .2,.2,.2 , .2,.2,.2 , .2,.2,.2 , .2,.2,.2,
		
		// Body
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		
		// Right Arm
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		
		// Left Arm
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		
		// Right Leg
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		
		// Left Leg
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8,
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8, 
		.8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8 , .8,.8,.8,
		
		// Right Foot
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		
		// Left Foot
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4,
		.4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4 , .4,.4,.4
		
	];
	var color = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,color);
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(rgb),gl.STATIC_DRAW);

	//  Set state to draw scene
	gl.enable(gl.DEPTH_TEST);
	gl.clearColor(0,0,0,1);
	//  Mouse control variables
	var x0 = y0 = move  = 0;
	//  Rotation angles
	var th = ph = 15;
	//  Draw scene the first time
	Display();

	//
	//  Display the scene
	//
	function Display()
	{
		//  Clear the screen and Z buffer
		gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

		// Compute modelview matrix
		var ModelviewMatrix = new CanvasMatrix4();
		ModelviewMatrix.makeIdentity();
		ModelviewMatrix.rotate(ph,0,1,0);
		ModelviewMatrix.rotate(th,1,0,0);

		// Set shader
		gl.useProgram(prog);

		//  Set projection and modelview matrixes
		gl.uniformMatrix4fv(gl.getUniformLocation(prog,"ProjectionMatrix") , false , new Float32Array(ProjectionMatrix.getAsArray()));
		gl.uniformMatrix4fv(gl.getUniformLocation(prog,"ModelviewMatrix")  , false , new Float32Array(ModelviewMatrix.getAsArray()));

		//  Robot vertex coordinates
		xyz = getVerts(n);
		verts = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,verts);
		gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(xyz),gl.STATIC_DRAW);
		
		//  Set up 3D vertex array
		gl.bindBuffer(gl.ARRAY_BUFFER,verts);
		var XYZ = gl.getAttribLocation(prog,"XYZ");
		gl.enableVertexAttribArray(XYZ);
		gl.vertexAttribPointer(XYZ,3,gl.FLOAT,false,0,0);

		//  Set up 3D color array
		gl.bindBuffer(gl.ARRAY_BUFFER,color);
		var RGB = gl.getAttribLocation(prog,"RGB");
		gl.enableVertexAttribArray(RGB);
		gl.vertexAttribPointer(RGB,3,gl.FLOAT,false,0,0);

		//  Draw all vertexes
		gl.drawArrays(gl.TRIANGLES,0,n);

		//  Disable vertex arrays
		gl.disableVertexAttribArray(XYZ);
		gl.disableVertexAttribArray(RGB);

		//  Flush
		gl.flush ();
	}

	//
	//  Resize canvas
	//
	canvas.resize = function ()
	{
		var size = Math.min(window.innerWidth, window.innerHeight)-10;
		canvas.width  = size;
		canvas.height = size;
		gl.viewport(0,0,size,size);
		Display();
	}

	//
	//  Mouse button pressed
	//
	canvas.onmousedown = function (ev)
	{
		move  = 1;
		x0 = ev.clientX;
		y0 = ev.clientY;
	}

	//
	//  Mouse button released
	//
	canvas.onmouseup = function (ev)
	{
		move  = 0;
	}

	//
	//  Mouse movement
	//
	canvas.onmousemove = function (ev)
	{
		if (move==0) return;
		//  Update angles
		ph -= ev.clientX-x0;
		th += ev.clientY-y0;

		//  Store location
		x0 = ev.clientX;
		y0 = ev.clientY;
		//  Redisplay
		Display();
	}
}