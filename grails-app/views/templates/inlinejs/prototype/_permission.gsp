var permissionListEndpoint = "${createLink(action:'listpermissions')}";
var permissionCreateEndpoint = "${createLink(action:'createpermission')}";
var permissionRemoveEndpoint = "${createLink(action:'removepermission')}";

document.observe("dom:loaded", function() {
	listPermissions(${parent.id});
	$("addpermissions").hide();

	$("showaddpermissionsbtn").addEvent('click',function () {
	  $("showaddpermissions").hide();
	  $("addpermissions").show("blind");
	});

	$("closepermissionsaddbtn").addEvent('click',function () {
	  $("addpermissions").hide();
	  $("showaddpermissions").show();
	});
});