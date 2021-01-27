function infoCursor(){
	return '\x1B[2m';
}
function lightGrayCursor(){
	return "\x1B[37m";
}

function lightGreenCursor(){
	return "\x1B[92m";
}
function greenCursor(){
	return "\x1B[32m";
}

function lightCyanCursor(){
	return "\x1B[96m";
}
function lightBlueCursor(){
	return "\x1B[94m";
}
function cyanCursor(){
	return "\x1B[36m";
}
function blueCursor(){
	return "\x1B[34m";
}
function magenta(){
	return "\x1B[35m";
}
function red(){
	return "\x1B[31m";
}
function yellow(){
	return "\x1B[33m";
}
function closeCursor(){
	return "\x1B[0m";
}

Java.perform(function(){
    
    //var q = "dalvik.system.DexFile!openDexFile"; 
    var q = "Dex";
    hook_classes2(q);
 //    console.log('[+] '+lightGrayCursor()+"========"+closeCursor());
 //    console.log('[+] '+lightGreenCursor()+"========"+closeCursor());
 //    console.log('[+] '+greenCursor()+"========"+closeCursor());
 //    console.log('[+] '+lightCyanCursor()+"========"+closeCursor());
 //    console.log('[+] '+lightBlueCursor()+"========"+closeCursor());
 //    console.log('[+] '+cyanCursor()+"========"+closeCursor());
 //    console.log('[+] '+blueCursor()+"========"+closeCursor());
 //    console.log('[+] '+magenta()+"========"+closeCursor());
	// console.log('[+] '+red()+"========"+closeCursor());
	// console.log('[+] '+yellow()+"========"+closeCursor());


});

//hook specify class
function hook_class(cls_name)
{
	var cls = Java.use(cls_name);
	var methods = cls.class.getDeclaredMethods();
	cls.$dispose;

	//hook all method of the class
	methods.forEach(function(method){
		
		var method_name = method.getName(); //get method name
		var overloads = cls[method_name].overloads;
		var ilog = "";
		overloads.forEach(function(ol){
			ol.implementation = function() {
				ilog = '[+] ' +lightCyanCursor() + cls_name + closeCursor() + ' > '+ magenta() + method_name + '('+arguments.length+')';
				// for(var i=0; i < arguments.length; i++)
				// {
				// 	ilog += "\n\t--- " + arguments[i];
				// }
				// try {
				// 	var ret = this[method_name].apply(this, arguments);
				// } catch {
				// 	console.log('[ERROR] ' + cls_name + ' > ' + method_name);
				// }
				// ilog += "\n\tRET " + ret);
				console.log(ilog+closeCursor());
				return this[method_name].apply(this, arguments);
			}
		});
	});
}
// hook all classes matched query
function hook_classes(q)
{
	var all = Java.enumerateMethods(q);

	var cls_list = all[0]["classes"];

	cls_list.forEach(function(cls){
		hook_class(cls["name"]);
	});
}

function hook_classes2(q)
{
	var cls_list = [];
	if (q == null)
	{
		cls_list = Java.enumerateLoadedClassesSync();
	}
	else
	{
		Java.enumerateLoadedClasses({
			onMatch(name){
				if (name.indexOf(q) != -1)
				{
					cls_list.push(name);
					console.log("[+] hook "+ cyanCursor()+name+closeCursor());
				}
			},
			onComplete(){
				console.log("=== EnumerateLoadedClasses finished.");
			}
		});
	}
	//cls_list = Java.enumerateLoadedClassesSync();
	cls_list.forEach(function(cls){
		hook_class(cls);
	});

}
// hook query array
function hook_a_classes(a)
{
	a.forEach(function(query){
		hook_classes(query);
	});
}
