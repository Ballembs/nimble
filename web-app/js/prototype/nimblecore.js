// Admins
function listAdministrators() {
    new Ajax.Request(adminListEndpoint,{
        method: "POST",
        onSuccess: function(xhr) {
            $("admins").clear().insert( xhr.responseText);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function searchAdministrators() {
    var dataString = "q=" + $('q').getValue();
    new Ajax.Request(adminSearchEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("searchresponse").clear().insert(xhr.responseText);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function deleteAdministrator(userID, username) {
    var dataString = 'id=' + userID;
    new Ajax.Request(adminDeleteEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            growl('success', xhr.responseText);
            listAdministrators();
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function grantAdministrator(userID, username) {
    var dataString = 'id=' + userID;
    new Ajax.Request(adminGrantEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            searchAdministrators();
            listAdministrators();
            growl('success', xhr.responseText);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

// Users
function enableUser(id) {
    var dataString = "id=" + id;
    new Ajax.Request(enableUserEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("enableuser").hide();
            $("enableduser").hide();
            $("disableuser").show();
            $("disableduser").show();
            growl('success', xhr.responseText);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function disableUser(id) {
    var dataString = "id=" + id;
    new Ajax.Request(disableUserEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("disableuser").hide();
            $("disableduser").hide();
            $("enableuser").show();
            $("enableduser").show();
            growl('success', xhr.responseText);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function enableAPI(id) {
    var dataString = "id=" + id;
    new Ajax.Request(enableAPIEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("disabledapi").hide();
            $("enabledapi").show();
            $("disableuserapi").show();
            $("enableuserapi").hide();
            growl('success', xhr.responseText);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function disableAPI(id) {
    var dataString = "id=" + id;
    new Ajax.Request(disableAPIEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("disabledapi").show();
            $("enabledapi").hide();
            $("disableuserapi").hide();
            $("enableuserapi").show();
            growl('success', xhr.responseText);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function listLogins(userID) {
    var dataString = 'id=' + userID;
    new Ajax.Request(userLoginsEndpoint,{
        method: "GET",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("loginhistory").clear().insert(xhr.responseText).show();
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

// Permissions
function listPermissions(ownerID) {
    var dataString = 'id=' + ownerID;
    new Ajax.Request(permissionListEndpoint,{
        method: "GET",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("currentpermission").clear().insert(xhr.responseText).show();
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function createPermission(ownerID) {
    var dataString = 'id=' + ownerID + '&first=' + $('first_p').getValue() + '&second=' + $('second_p').getValue() + '&third=' + $('third_p').getValue() + '&fourth=' + $('fourth_p').getValue();
    new Ajax.Request(permissionCreateEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("addpermissionserror").clear();
            $('first_p').setValue('');
            $('second_p').setValue('');
            $('third_p').setValue('');
            $('fourth_p').setValue('');
            listPermissions(ownerID);
            growl('success', xhr.responseText);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function removePermission(ownerID, permID) {
    var dataString = 'id=' + ownerID + '&permID=' + permID;
    new Ajax.Request(permissionRemoveEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            listPermissions(ownerID);
            growl('success', xhr.responseText);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

// Roles
function searchRoles(ownerID) {
    var dataString = "id=" + ownerID + "&q=" + $('qroles').getValue();
    new Ajax.Request(roleSearchEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("rolesearchresponse").clear().hide().insert(xhr.responseText).show();
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function listRoles(ownerID) {
    var dataString = 'id=' + ownerID;
    new Ajax.Request(roleListEndpoint,{
        method: "GET",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("assignedroles").clear().insert(xhr.responseText).show();
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function grantRole(ownerID, roleID) {
    var dataString = 'id=' + ownerID + '&roleID=' + roleID;
    new Ajax.Request(roleGrantEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            listRoles(ownerID);
            searchRoles(ownerID);
            growl('success', xhr.responseText);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function removeRole(ownerID, roleID) {
    var dataString = 'id=' + ownerID + '&roleID=' + roleID;
    new Ajax.Request(roleRemoveEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            listRoles(ownerID);
            growl('success', xhr.responseText);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

// Groups
function searchGroups(parentID) {
    var dataString = "id=" + parentID + "&q=" + $('qgroups').getValue();
    new Ajax.Request(groupSearchEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("groupsearchresponse").clear().hide().insert(xhr.responseText).show();
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function listGroups(parentID) {
    var dataString = 'id=' + parentID;
    new Ajax.Request(groupListEndpoint,{
        method: "GET",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("assignedgroups").clear().insert(xhr.responseText).show();
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function grantGroup(parentID, groupID) {
    var dataString = 'id=' + parentID + '&groupID=' + groupID;
    new Ajax.Request(groupGrantEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            listGroups(parentID);
            searchGroups(parentID);
            growl('success', xhr.responseText);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function removeGroup(parentID, groupID) {
    var dataString = 'id=' + parentID + '&groupID=' + groupID;
    new Ajax.Request(groupRemoveEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            listGroups(parentID);
            growl('success', xhr.responseText);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

// Members
function searchMembers(ownerID) {
    var dataString = "id=" + ownerID + "&q=" + $('qmembers').getValue();
    new Ajax.Request(memberSearchEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("membersearchresponse").clear().insert(xhr.responseText).show();
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function searchGroupMembers(ownerID) {
    var dataString = "id=" + ownerID + "&q=" + $('qmembersgroup').getValue();
    new Ajax.Request(memberGroupSearchEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("membergroupsearchresponse").clear().insert(xhr.responseText).show();
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function addMember(ownerID, userID, username) {
    var dataString = 'id=' + ownerID + '&userID=' + userID;
    new Ajax.Request(memberAddEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            growl("success", xhr.responseText);
            listMembers(ownerID);
            searchMembers(ownerID);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function removeMember(ownerID, userID, username) {
    var dataString = 'id=' + ownerID + '&userID=' + userID;
    new Ajax.Request(memberRemoveEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            growl("success", xhr.responseText);
            listMembers(ownerID);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function addGroupMember(ownerID, groupID, groupName) {
    var dataString = 'id=' + ownerID + '&groupID=' + groupID;
    new Ajax.Request(memberAddGroupEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            growl("success", xhr.responseText);
            listMembers(ownerID);
            searchGroupMembers(ownerID);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function removeGroupMember(ownerID, groupID, groupName) {
    var dataString = 'id=' + ownerID + '&groupID=' + groupID;
    new Ajax.Request(memberRemoveGroupEndpoint,{
        method: "POST",
        parameters: dataString,
        onSuccess: function(xhr) {
            growl("success", xhr.responseText);
            listMembers(ownerID);
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

function listMembers(ownerID) {
    var dataString = 'id=' + ownerID;
    new Ajax.Request(memberListEndpoint,{
        method: "GET",
        parameters: dataString,
        onSuccess: function(xhr) {
            $("currentmembers").clear().hide();
            $("currentmembers").insert(xhr.responseText).show();
        },
        onFailure: function (xhr) {
            if(xhr.transport.status == 403) return;
            growl('error', xhr.transport.responseText);
        }
    });
}

Ajax.Responders.register({
    onComplete:function(xhr) {
        if ((xhr.transport.status == 403) && (xhr.transport.getResponseHeader("X-Nim-Session-Invalid") != null)) {
            var title=$('sessionterminatedtitle').getValue();
            var msg=$('sessionterminatedmsg').getValue();
            var login=$('sessionterminatedlogin').getValue();
            var content=
              '<p id="sessionterminatedcontent">'+msg+'</p>'+
              '<div class="buttons">'+
              '   <a href="#" onClick="window.location.reload();return false;" id="sessionterminatedbtn" class="button icon icon_flag_blue">'+login+'</a>'+
              '</div>';
            new SimpleDialog({'id':'confirmationdialog','title':title,'content':content}).show();
        }
    }
});
