
// General
function verifyUnique(elem, elemstatus, endpoint, success, failure) {
   elem='#'+elem; elemstatus='#'+elemstatus;
   var dataString = 'val=' + $(elem).val();
   $.ajax({
     	type: "POST",
		url: endpoint,
		data: dataString,
		success: function(res) {
		  growl('flaggreen', res, 3000);
		  $(elem).css({'background': '#fff', 'color':'#000'});
		  $(elemstatus).addClass('icon');
		  $(elemstatus).addClass('icon_flag_green');
		  $(elemstatus).removeClass('icon_flag_red');
          $(elemstatus).show();
		},
		error: function (xhr, ajaxOptions, thrownError) {
		  growl('flagred', xhr.responseText);
		  $(elem).css({'color': '#9c3333'});
		  $(elemstatus).addClass('icon');
		  $(elemstatus).addClass('icon_flag_red');
		  $(elemstatus).removeClass('icon_flag_green');
          $(elemstatus).show();
		}
	});
}

// Dialog support
$(function() {
    $('<div id="confirmationdialog" title="">'+
      '<p id="confirmationcontent">&nbsp;</p>'+
      '<div class="buttons">'+
	  '	  <button type="submit" id="confirmaccept" class="modal_close button icon icon_accept" onClick="confirmAction()">Accept</button>'+
      '   <a id="confirmcancel" onClick="$(\'#confirmationdialog\').dialog(\'close\');" class="modal_close button icon icon_cancel">Cancel</a>'+    
      '</div>'+
      '</div>').appendTo(document.body);

	$("#confirmationdialog").dialog({
		bgiframe: true,
		resizable: false,
		modal: true,
		autoOpen: false,
		width: 400,
		overlay: {
			backgroundColor: '#000',
			opacity: 0.5
		}
	});
});

function wasConfirmed(title, msg, accept, cancel) {
	$("#confirmationtitle").html(title);
	$("#confirmationcontent").html(msg); 
	$("#confirmaccept").html(accept);
	$("#confirmcancel").html(cancel);
	
	$("#confirmationdialog").dialog('option', 'title', title);
	$("#confirmationdialog").dialog('open');		
}

function changeLogin(ident) {
  $(".flash").hide();
  $(".loginselector").removeClass("current");
  $(".loginmethod").hide();
  $("#" + ident).show("highlight");
}

function enableFacebookContinue() {
  $("#loginfacebookcontinue").show();
  $("#loginfacebookenable").hide();
}

function disableFacebookContinue() {
  $("#loginfacebookcontinue").hide();
}

// Session Termination
$(function() {
	$("#sessionterminateddialog").dialog({
		bgiframe: true,
		resizable: false,
		modal: true,
		autoOpen: false,
		title: 'Session Terminated',
		overlay: {
			backgroundColor: '#000',
			opacity: 0.5
		}
	});

	$().ajaxError(function (event, xhr, ajaxOptions, thrownError) {
	  if ((xhr.status == 403) && (xhr.getResponseHeader("X-Nim-Session-Invalid") != null)) {
	    $("#sessionterminateddialog").dialog('open');
	  }
	});
});

function createTip(id,tle,msg) {
    $("#"+id).after(
            '<div id="'+id+'_tip">'+
                '<div class="ui-dialog ui-widget">'+
                '<div class="ui-dialog-titlebar ui-widget-header ui-corner-all"><strong>'+tle+'</strong></div>'+
                '<div class="ui-dialog-content ui-widget-content">'+msg+'</div>'+
            '</div></div>');
    $("#"+id+"_tip").hide();
    $("#"+id).bt({contentSelector: $("#"+id+"_tip"), width: '350px', closeWhenOthersOpen: true, shrinkToFit: 'true', positions: ['right', 'top', 'left'], margin: 0, padding: 6, fill: '#fff', strokeWidth: 1, strokeStyle: '#c2c2c2', spikeGirth: 12, spikeLength:9, hoverIntentOpts: {interval: 100, timeout: 1000}});
}

function createTabs(id) {
    $(function() {
        $('#'+id).tabs();
    });
}



