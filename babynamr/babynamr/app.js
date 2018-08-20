var showStats = true;
var statusUri = 'api/status/Get';
var searchUri = 'api/babyname/Get';

$(document).ready(function () {
    if (showStats) {
        $.getJSON(statusUri)
            .done(function (data) {
                $('#statusBox').html("<h5>Status: " + data.StatusCode + " | # of Items: " + data.DocumentCount + " | Storage Size: " + data.storageSize + "</h5>");
                $('#statusBox').addClass("alert alert-success");
            })
            .error(function (jqXHR, textStatus, errorThrown) {
                $('#statusBox').html(errorThrown);
                $('#statusBox').addClass("alert alert-danger");
            });
    }
    $('#txtSearch').keydown(function (event) {
        if (event.keyCode == 13) {
            search($('txtSearch').val());
            return false;
        }
    });
});

function search() {
    var isBoyChecked = $('#chkBoys').is(':checked');
    var isGirlChecked = $('chkGirls').is(':checked');
    var query = searchUri + '?q=' + name;

    if (isBoyChecked && isGirlChecked) {
        query = searchUri + '?q=' + name;
    }
    if (isBoyChecked == true && isGirlChecked == false) {
        query = searchUri + '?q=' + name + '&gender=Male';
    }
    if (isBoyChecked == false && isGirlChecked == true) {
        query = searchUri + '?q=' + name + '&gender=Female';
    }
    $.getJSON(query)
        .done(function (data) {
            $('#dataName').empty();
            $('#resultsFound').html("Results found: " + data.length);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Document.gender == 'Male') {
                    $('#dataName').append("<div class='row rowboy'><div class='col-md-12'><h3>" + data[i].Document.name + "<br /><small>" + data[i].Document.origin + "<br>" + data[i].Document.gender + "</br></small></h3>" + data[i].Document.meaning + "</div></div>");
                }
                if (data[i].Document.gender == 'Female') {
                    $('#dataName').append("div class='row rowgirl'><div class='col-md-12'><h3>" + data[i].Document.name + "<br /><small>" + data[i].Document.origin + "<br>" + data[i].Document.gender + "</br></small></h3>" + data[i].Document.meaning + "</div></div>");
                }
                if (data[i].Document.gender == 'Both') {
                    $('#dataName').append("<div class='row rowboth'><div class='col-md-12'><h3>" + data[i].Document.name + "<br /><small>" + data[i].Document.origin + "<br>" + data[i].Document.gender + "</br></small></h3>" + data[i].Document.meaning + "</div></div>");
                }
            }
        })
        .error(function (jqXHR, textStatus, errorThrown) {
            $('resultsFound').html("Results Found: 0");
            $('#statusBox').html(errorThrown);
            $('#statusBox').addClass("alert alert-danger");
        });
}