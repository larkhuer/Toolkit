Java.perform(function(){
    
    var q = "com.game*!*"; 
    hook_classes(q);

});

//hook specify class
function hook_class(cls_name)
{
    var cls = Java.use(cls_name);
    var methods = cls.class.getDeclaredMethods();

    //hook all method of the class
    methods.forEach(function(method){
		
		var method_name = method.getName(); //get method name
		var overloads = cls[method_name].overloads;

        overloads.forEach(function(ol){
        	ol.implementation = function() {
        		console.log('[+] ' + cls_name + ' > ' + method_name + '('+arguments.length+')');
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
	for (var i=0; i < cls_list.length; i++)
	cls_list.forEach(function(cls){
		hook_class(cls["name"]);
	});
}
// hook query array
function hook_a_classes(a)
{
	a.forEach(function(query){
		hook_classes(query);
	});
}
